import React from 'react';

const Home = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#e0e0e0', backgroundColor: '#121212', minHeight: '80vh' }}>
            {/* Navigation Bar */}
            {/* <nav style={{ backgroundColor: '#1f1f1f', padding: '10px', position: 'fixed', width: '100%', top: '30px', zIndex: 1, borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)', marginTop: '30px' }}>
                <a href="#home" style={linkStyle}>Home</a>
                <a href="#about" style={linkStyle}>About</a>
                <a href="#services" style={linkStyle}>Services</a>
                <a href="#contact" style={linkStyle}>Contact</a>
            </nav> */}

            {/* Home Section */}
            <section id="home" style={{ ...sectionStyle, marginTop: '10px', backgroundColor: '#1e1e1e' }}>
                <h1 style={headingStyle}>
                    <span style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#f9a825' }}>Welcome to </span>
                    <span style={{ fontSize: '4.5em', fontWeight: 'bold', color: '#e91e63' }}>DevConnect</span>
                </h1>
                <p style={paragraphStyle}>Your platform for developer collaboration and project management</p>
            </section>

            {/* About Section */}
            <section id="about" style={{ ...sectionStyle, backgroundColor: '#2c2c2c' }}>
                <h3 style={headingStyle}>About Us</h3>
                <p style={paragraphStyle}>
                    DevConnect is a platform designed to help developers collaborate, share knowledge, and manage projects efficiently.
                    Whether you're working on a team project, learning new technologies, or seeking advice, DevConnect offers a seamless space to connect with other developers.
                    Our goal is to create an open, collaborative environment where developers can grow and succeed together.
                </p>
            </section>

            {/* Services Section */}
            <section id="services" style={{ ...sectionStyle, backgroundColor: '#3a3a3a' }}>
                <h3 style={headingStyle}>Our Services</h3>
                <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px' }}>
                    <li>Project Collaboration</li>
                    <li>Knowledge Sharing</li>
                    <li>Profile Management</li>
                    <li>Real-time Chat</li>
                </ul>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ ...sectionStyle, backgroundColor: '#444444' }}>
                <h3 style={headingStyle}>Contact Us</h3>
                <p style={paragraphStyle}>Email: <a href="mailto:arnavpanchal@gmail.com" style={linkText}>devconnect@gmail.com</a></p>
                <p style={paragraphStyle}>Phone: <a href="tel:1234567890" style={linkText}>1234567890</a></p>
                <p style={paragraphStyle}>Address: SKNSITS, Lonavala</p>
            </section>
        </div>
    );
};

// Styles
const linkStyle = {
    color: '#e0e0e0',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
};

const sectionStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    borderRadius: '10px',
    margin: '20px',
    color: '#e0e0e0'
};

const headingStyle = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#f9a825',
};

const paragraphStyle = {
    fontSize: '1.2em',
    color: '#e0e0e0',
};

const linkText = {
    color: '#80cbc4',
    textDecoration: 'none',
};

export default Home;
