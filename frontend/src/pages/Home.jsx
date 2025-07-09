import ImageSlider from '../components/ImageSlider';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function Home() {
    return (
        <main style={{ overflow: 'hidden' }}>
            <ImageSlider />
            <AboutSection />
            <ServicesSection />
            <Testimonials />
            <ContactForm />
        </main>
    );
}