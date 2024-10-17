import React, { useState } from 'react';

const ProjectPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [skills, setSkills] = useState([]);
    const [teamSize, setTeamSize] = useState('');
    const [customTeamSize, setCustomTeamSize] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation check
        if (!title || !description || !technologies.length || !skills.length || (!teamSize && !customTeamSize) || !responsibilities || !startDate || !endDate) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Handle form submission logic here
        console.log({
            title,
            description,
            technologies,
            skills,
            teamSize: customTeamSize || teamSize,
            responsibilities,
            startDate,
            endDate,
        });

        // Reset form fields after submission
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTechnologies([]);
        setSkills([]);
        setTeamSize('');
        setCustomTeamSize('');
        setResponsibilities('');
        setStartDate('');
        setEndDate('');
        setErrorMessage(null);
    };

    const addTechnology = (e) => {
        const value = e.target.value.trim();
        if (e.key === 'Enter' && value && !technologies.includes(value)) {
            setTechnologies([...technologies, value]);
            e.target.value = '';
        }
    };

    const removeTechnology = (tech) => {
        setTechnologies(technologies.filter((t) => t !== tech));
    };

    const addSkill = (e) => {
        const value = e.target.value.trim();
        if (e.key === 'Enter' && value && !skills.includes(value)) {
            setSkills([...skills, value]);
            e.target.value = '';
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    return (
        <div className="project-post m-6 max-w-md mx-auto p-4 w-full border border-gray-300 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Create a New Project Posting</h2>
            {errorMessage && <div className="alert alert-danger mb-2 text-red-600 font-semibold">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="block mb-1 text-sm">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="block mb-1 text-sm">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 h-20 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-1 text-sm">Technologies Needed:</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {technologies.map((tech) => (
                            <span key={tech} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs flex items-center">
                                {tech}
                                <button type="button" onClick={() => removeTechnology(tech)} className="ml-1 text-red-600 text-xs">&times;</button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Add technology and press Enter"
                        onKeyDown={addTechnology}
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-1 text-sm">Skills Required:</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {skills.map((skill) => (
                            <span key={skill} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs flex items-center">
                                {skill}
                                <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-red-600 text-xs">&times;</button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Add skill and press Enter"
                        onKeyDown={addSkill}
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="teamSize" className="block mb-1 text-sm">Team Size:</label>
                    <select
                        id="teamSize"
                        value={teamSize}
                        onChange={(e) => {
                            setTeamSize(e.target.value);
                            setCustomTeamSize('');
                        }}
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Team Size</option>
                        {[1, 2, 3, 4, 5].map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                        <option value="custom">Custom</option>
                    </select>
                    {teamSize === 'custom' && (
                        <input
                            type="number"
                            placeholder="Enter custom team size"
                            value={customTeamSize}
                            onChange={(e) => setCustomTeamSize(e.target.value)}
                            className="border border-gray-300 bg-gray-50 rounded-md p-1 mt-1 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="responsibilities" className="block mb-1 text-sm">Responsibilities:</label>
                    <textarea
                        id="responsibilities"
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        required
                        className="w-full border border-gray-300 bg-gray-50 rounded-md p-1 h-20 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-1 text-sm">Project Timeline:</label>
                    <div className="flex space-x-2">
                        <div className="w-full">
                            <label htmlFor="startDate" className="block mb-1 text-sm">Start Date:</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="endDate" className="block mb-1 text-sm">End Date:</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="border border-gray-300 bg-gray-50 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-1 text-sm hover:bg-blue-700">Post Project</button>
            </form>
        </div>
    );
};

export default ProjectPost;
