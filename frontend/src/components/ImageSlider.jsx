import '../styles/ImageSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useState, useEffect } from 'react';

export default function ImageSlider() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/slider');
                if (!response.ok) {
                    throw new Error('Failed to fetch slider data');
                }
                const data = await response.json();
                // Filter only active slides and sort by order
                const activeSlides = data
                    .filter(slide => slide.isActive)
                    .sort((a, b) => a.order - b.order);
                setSlides(activeSlides);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSliderData();
    }, []);

    if (loading) return <div className="slider-loading">Loading slider...</div>;
    if (error) return <div className="slider-error">Error: {error}</div>;
    if (slides.length === 0) return <div className="slider-empty">No slides available</div>;

    return (
        <section className="slider-section">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                loop={true}
                className="slider-container"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide._id} className="slider-slide">
                        <div className="slider-overlay"></div>
                        <img
                            src={slide.imageUrl}
                            alt={slide.altText || 'Slider image'}
                            className="slider-image"
                        />
                        <div className="slider-content">
                            {slide.title && <h2 className="slider-title">{slide.title}</h2>}
                            {slide.subtitle && <p className="slider-subtitle">{slide.subtitle}</p>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}