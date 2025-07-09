import '../styles/ServicesSection.css';

const services = [
    {
        id: 1,
        title: "Web Development",
        description: "Custom website development tailored to your business needs with modern technologies.",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
    },
    {
        id: 2,
        title: "Mobile Apps",
        description: "iOS and Android app development to help you reach your customers anywhere.",
        imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Beautiful and intuitive interfaces that enhance user experience and engagement.",
        imageUrl: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 4,
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategies to grow your online presence.",
        imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 5,
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure to support your business growth and operations.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    },
    {
        id: 6,
        title: "Consulting",
        description: "Expert advice to help you make the right technology decisions for your business.",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <span className="services-subtitle">Our Services</span>
                    <h2 className="services-title">What We Offer</h2>
                    <div className="services-divider"></div>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-image-container">
                                <img
                                    src={service.imageUrl}
                                    alt={service.title}
                                    className="service-image"
                                />
                                <div className="service-image-overlay"></div>
                            </div>
                            <div className="service-card-content">
                                <h3 className="service-card-title">{service.title}</h3>
                                <p className="service-card-description">{service.description}</p>
                                <a href="#" className="service-card-link">Learn More →</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="services-button-container">
                    <button className="services-button">View All Services</button>
                </div>
            </div>
        </section>
    );
}