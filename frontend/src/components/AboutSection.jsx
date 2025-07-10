import '../styles/AboutSection.css';
import { useState, useEffect } from 'react';

export default function AboutSection() {
    const [aboutData, setAboutData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/about');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAboutData(data);
            } catch (error) {
                setFetchError(error.message || 'An unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (isLoading) {
        return <div className="about-loading">Loading...</div>;
    }

    if (fetchError) {
        return <div className="about-error">Error: {fetchError}</div>;
    }

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <header className="about-header">
                    <span className="about-subtitle">About Us</span>
                    <h2 className="about-title">Our Story</h2>
                    <div className="about-divider" />
                </header>

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
                        {aboutData?.content ? (
                            <div
                                className="about-text-content"
                                dangerouslySetInnerHTML={{ __html: aboutData.content }}
                            />
                        ) : (
                            <p>No content available.</p>
                        )}

                        <div className="about-buttons">
                            <button type="button" className="about-button about-button-primary">
                                Learn More
                            </button>
                            <button type="button" className="about-button about-button-secondary">
                                Our Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
