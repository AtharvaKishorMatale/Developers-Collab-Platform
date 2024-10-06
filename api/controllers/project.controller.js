import Project from'../models/projectModel.js'; // Assuming you have a Mongoose model for projects

// Controller function to handle project uploads
export const uploadProject = async (req, res) => {
  try {
    // Extract data from request body
    const { email, repository } = req.body;

    // Ensure the email and repository data are provided
    if (!email || !repository) {
      return res.status(400).json({ error: 'Email and repository data are required.' });
    }

    // Check if the project already exists in the database
    const existingProject = await Project.findOne({ repoId: repository.id });
    if (existingProject) {
      return res.status(400).json({ error: 'This project is already uploaded.' });
    }

    // Create a new project entry in your database (assuming you're using MongoDB with Mongoose)
    const newProject = new Project({
      email,
      repoId: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description || 'No description provided',
      url: repository.html_url,
      language: repository.language,
      createdAt: repository.created_at,
      updatedAt: repository.updated_at,
    });

    // Save the new project to the database
    await newProject.save();

    // Respond to the frontend with success message
    res.status(201).json({ message: 'Project uploaded successfully!', project: newProject });
  } catch (error) {
    console.error('Error uploading project:', error);
    res.status(500).json({ error: 'Failed to upload project' });
  }
};

