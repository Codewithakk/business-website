import '../styles/AboutSection.css';

export default function AboutSection() {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <span className="about-subtitle">About Us</span>
                    <h2 className="about-title">Our Story</h2>
                    <div className="about-divider"></div>
                </div>

                <div className="about-content">
                    <div className="about-image-container">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                            alt="Our Team"
                            className="about-image"
                        />
                        <div className="about-badge">
                            <span>10+</span>
                            <span>Years Experience</span>
                        </div>
                    </div>

                    <div className="about-text">
                        <p>
                            Founded in 2010, our company has been providing exceptional services to clients
                            across various industries. We pride ourselves on our commitment to excellence
                            and customer satisfaction.
                        </p>
                        <p>
                            Our team of dedicated professionals brings together diverse expertise to deliver
                            comprehensive solutions tailored to your specific needs. We believe in building
                            long-term relationships with our clients.
                        </p>
                        <ul className="about-list">
                            <li>
                                <span>✓</span>
                                Industry-leading expertise
                            </li>
                            <li>
                                <span>✓</span>
                                Proven track record
                            </li>
                            <li>
                                <span>✓</span>
                                Customer-focused approach
                            </li>
                            <li>
                                <span>✓</span>
                                Innovative solutions
                            </li>
                        </ul>
                        <div className="about-buttons">
                            <button className="about-button-primary">Learn More</button>
                            <button className="about-button-secondary">Our Team</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}