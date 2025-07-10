import '../styles/ServicesSection.css';
import { useState, useEffect } from 'react';

export default function ServicesSection() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services data');
                }
                const data = await response.json();
                // Filter only active services
                const activeServices = data.filter(service => service.isActive);
                setServices(activeServices);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServicesData();
    }, []);

    if (loading) return <div className="services-loading">Loading services...</div>;
    if (error) return <div className="services-error">Error: {error}</div>;

    return (
        <section id="services" className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <h2 className="services-title">What We Offer - Our Services</h2>
                    <div className="services-divider"></div>
                </div>

                {services.length > 0 ? (
                    <>
                        <div className="services-grid">
                            {services.map((service) => (
                                <div key={service._id} className="service-card">
                                    <div className="service-image-container">
                                        <img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="service-image"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Service+Image';
                                            }}
                                        />
                                        <div className="service-image-overlay"></div>
                                    </div>
                                    <div className="service-card-content">
                                        <h3 className="service-card-title">{service.title}</h3>
                                        <p className="service-card-description">{service.description}</p>
                                        <a
                                            href={service.serviceLink || "#"}
                                            className="service-card-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Learn More →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="services-button-container">
                            <button className="services-button">View All Services</button>
                        </div>
                    </>
                ) : (
                    <div className="services-empty">No services available at the moment</div>
                )}
            </div>
        </section>
    );
}