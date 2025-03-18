// controllers/projectController.js

import Project from '../models/post.model.js';

export const createProject = async (req, res) => {
  console.log("Running Into Controller");

  const {
      title,
      description,
      technologies,
      skills,
      teamSize,
      responsibilities,
      startDate,
      endDate,
      ownerId, // Include ownerId from the request body
      ownerUsername,
      ownerPic,

  } = req.body;

  // Basic validation
  if (!title || !description || !technologies || !skills || !teamSize || !responsibilities || !startDate || !endDate || !ownerId) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  // Additional validation for teamSize to ensure it's a number
  if (isNaN(teamSize) || Number(teamSize) <= 0) {
      return res.status(400).json({ message: 'Team size must be a positive number.' });
  }

  // Ensure end date is after start date
  if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'End date must be after the start date.' });
  }

  try {
      // Create a new project
      const newProject = new Project({
          title,
          description,
          technologies,
          skills,
          teamSize,
          responsibilities,
          startDate,
          endDate,
          ownerId, // Save the ownerId with the project
          ownerUsername,
          ownerPic,
      });

      // Save the project to the database
      const savedProject = await newProject.save();

      // Respond with the created project data
      res.status(201).json(savedProject);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error while creating the project.' });
  }
};




// Function to get projects from the database and send them to the frontend
export const getProjects = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 projects per page
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Build the filter based on query parameters
    const filter = {
      ...(req.query.technology && { technologies: req.query.technology }),
      ...(req.query.skill && { skills: req.query.skill }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    // Fetch projects with required fields and populate owner details
    const posts = await Project.find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select("title description technologies skills teamSize responsibilities startDate endDate ownerId ownerUsername ownerPic slug")
      .populate("ownerId", "name avatar"); // Populate owner details

    // Get the total number of projects matching the filter
    const totalPosts = await Project.countDocuments(filter);

    // Debugging logs
    console.log("Fetched Projects:", posts);

    res.status(200).json({
      posts,
      totalPosts,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    next(error); // Pass error to error handling middleware
  }
};

