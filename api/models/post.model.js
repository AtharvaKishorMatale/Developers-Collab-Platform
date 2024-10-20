import mongoose from 'mongoose';
import slugify from 'slugify'; // Optional: Use if you want to generate slugs

const projectSchema = new mongoose.Schema({
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
        min: 1, // Optional: You can add validation to ensure team size is at least 1
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
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    ownerPic: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

// Automatically generate a slug from the title
projectSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

const Project = mongoose.model('Post', projectSchema);

// Ensure that you're using a default export
export default Project; // Use default export with ES6 syntax
