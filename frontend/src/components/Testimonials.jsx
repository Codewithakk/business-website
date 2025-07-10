import '../styles/Testimonials.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/testimonials');
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                // Filter active testimonials and map to expected format
                const activeTestimonials = data
                    .filter(testimonial => testimonial.isActive)
                    .map(testimonial => ({
                        id: testimonial._id,
                        name: testimonial.name,
                        role: testimonial.position,
                        message: testimonial.message,
                        rating: testimonial.rating
                    }));
                setTestimonials(activeTestimonials);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) return <div className="testimonials-loading">Loading testimonials...</div>;
    if (error) return <div className="testimonials-error">Error: {error}</div>;

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">What Our Clients Say</h2>
                    <div className="testimonials-divider"></div>
                </div>

                {testimonials.length > 0 ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        className="swiper-container"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="testimonial-card">
                                    <div className="testimonial-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`star ${i < testimonial.rating ? 'filled' : 'empty'}`}
                                            />
                                        ))}
                                    </div>
                                    <FaQuoteLeft className="testimonial-quote" />
                                    <p className="testimonial-message">"{testimonial.message}"</p>
                                    <div>
                                        <p className="testimonial-author">{testimonial.name}</p>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="testimonials-empty">No testimonials available</div>
                )}
            </div>
        </section>
    );
}