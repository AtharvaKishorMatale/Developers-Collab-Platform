// models/Project.js

import mongoose from 'mongoose';
console.log("Running in the Model")

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    teamSize: {
        type: Number,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

// Automatically generate a slug from the title
ProjectSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = this.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();
    }
    next();
});

const Project = mongoose.model('post', ProjectSchema);
export default Project;
