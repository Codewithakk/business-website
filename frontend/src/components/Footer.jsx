import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const styles = {
        footer: {
            backgroundColor: '#1f2937',
            color: '#fff',
            padding: '2rem 0',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
        },
        gridMd: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
        },
        heading: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
        },
        paragraph: {
            color: '#d1d5db',
            lineHeight: '1.6',
        },
        list: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        listItem: {
            marginBottom: '0.5rem',
        },
        link: {
            color: '#d1d5db',
            textDecoration: 'none',
        },
        linkHover: {
            color: '#fff',
        },
        socials: {
            display: 'flex',
            gap: '1rem',
        },
        iconLink: {
            color: '#d1d5db',
            textDecoration: 'none',
        },
        borderTop: {
            borderTop: '1px solid #374151',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: '#ef4444',
        },
    }


    const isMd = window.innerWidth >= 768

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={isMd ? styles.gridMd : styles.grid}>
                    <div>
                        <h3 style={styles.heading}>About Us</h3>
                        <p style={styles.paragraph}>
                            Professional business solutions tailored to your needs.
                        </p>
                    </div>

                    <div>
                        <h3 style={styles.heading}>Quick Links</h3>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>
                                <a href="#about" style={styles.link}>About</a>
                            </li>
                            <li style={styles.listItem}>
                                <a href="#services" style={styles.link}>Services</a>
                            </li>
                            <li style={styles.listItem}>
                                <a href="#testimonials" style={styles.link}>Testimonials</a>
                            </li>
                            <li style={styles.listItem}>
                                <a href="#contact" style={styles.link}>Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 style={styles.heading}>Connect With Us</h3>
                        <div style={styles.socials}>
                            <a href="#" style={styles.iconLink}><FaFacebook size={24} /></a>
                            <a href="#" style={styles.iconLink}><FaTwitter size={24} /></a>
                            <a href="#" style={styles.iconLink}><FaLinkedin size={24} /></a>
                            <a href="#" style={styles.iconLink}><FaInstagram size={24} /></a>
                        </div>
                    </div>
                </div>

                <div style={styles.borderTop}>
                    <p>&copy; {currentYear} Aayan Infotech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
