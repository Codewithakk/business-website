import '../styles/Testimonials.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Marketing Director",
        message: "Working with this team transformed our online presence. Their expertise and attention to detail made all the difference in our digital strategy.",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "CEO, TechStart",
        message: "The mobile app they developed for us exceeded all expectations. User engagement has increased by 300% since launch.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Product Manager",
        message: "Their UI/UX design services helped us create an intuitive interface that our customers love. Highly recommended!",
        rating: 4
    },
    {
        id: 4,
        name: "David Wilson",
        role: "CTO",
        message: "The cloud solutions they implemented have made our operations more efficient and scalable. Great team to work with.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-subtitle">Testimonials</span>
                    <h2 className="testimonials-title">What Our Clients Say</h2>
                    <div className="testimonials-divider"></div>
                </div>

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
            </div>
        </section>
    );
}