import '../styles/ImageSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        title: 'Welcome to Our Business',
        subtitle: 'Quality services for all your needs'
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        title: 'Professional Solutions',
        subtitle: 'Trusted by thousands of clients'
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        title: 'Innovative Approach',
        subtitle: 'Cutting-edge technology for your business'
    }
];

export default function ImageSlider() {
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
                    <SwiperSlide key={slide.id} className="slider-slide">
                        <div className="slider-overlay"></div>
                        <img
                            src={slide.imageUrl}
                            alt="Slider image"
                            className="slider-image"
                        />
                        <div className="slider-content">
                            <h2 className="slider-title">{slide.title}</h2>
                            <p className="slider-subtitle">{slide.subtitle}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}