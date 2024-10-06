import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  email: { type: String, required: true },
  repoId: { type: Number, required: true, unique: true }, // GitHub repo ID to ensure uniqueness
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  language: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;

