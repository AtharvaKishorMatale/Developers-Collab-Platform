// controllers/projectController.js

import Project from '../models/post.model.js';

export const createProject = async (req, res) => {

    console.log("Running Into Controller")
    const {
        title,
        description,
        technologies,
        skills,
        teamSize,
        responsibilities,
        startDate,
        endDate
    } = req.body;

    // Basic validation
    if (!title || !description || !technologies || !skills || !teamSize || !responsibilities || !startDate || !endDate) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
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
