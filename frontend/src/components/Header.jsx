import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/aayan-logo.png'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '#about' },
        { name: 'Services', path: '#services' },
        { name: 'Testimonials', path: '#testimonials' },
        { name: 'Contact', path: '#contact' },
    ]

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                localStorage.removeItem('accessToken')
                setIsLoggedIn(false)
                navigate('/') // redirect to home if needed
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    const styles = {
        header: {
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
        },
        logo: {
            height: '48px',
        },
        navDesktop: {
            display: 'none',
        },
        navLink: {
            color: '#333',
            textDecoration: 'none',
            marginLeft: '24px',
            fontWeight: 500,
            cursor: 'pointer',
        },
        navToggle: {
            background: 'none',
            border: 'none',
            color: '#333',
            cursor: 'pointer',
        },
        navMobile: {
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '16px',
        },
        navMobileMenu: {
            display: 'flex',
            flexDirection: 'column',
        },
        navMobileLink: {
            color: '#333',
            textDecoration: 'none',
            padding: '8px 0',
            fontWeight: 500,
            cursor: 'pointer',
        },
        mdNavDesktop: {
            display: 'flex',
            alignItems: 'center',
        },
    }

    const isDesktop = window.innerWidth >= 768

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Aayan Logo" style={styles.logo} />
                </Link>

                {/* Desktop Navigation */}
                {isDesktop && (
                    <nav style={styles.mdNavDesktop}>
                        {navLinks.map((link) =>
                            link.path.startsWith('#') ? (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    style={styles.navLink}
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={styles.navLink}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}
                        {isLoggedIn && (
                            <span
                                style={styles.navLink}
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        )}
                    </nav>
                )}

                {/* Mobile Toggle */}
                {!isDesktop && (
                    <button
                        style={styles.navToggle}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                )}

                {/* Mobile Menu */}
                {isOpen && !isDesktop && (
                    <div style={styles.navMobile}>
                        <nav style={styles.navMobileMenu}>
                            {navLinks.map((link) =>
                                link.path.startsWith('#') ? (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        style={styles.navMobileLink}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        style={styles.navMobileLink}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            )}
                            {isLoggedIn && (
                                <span
                                    style={styles.navMobileLink}
                                    onClick={() => {
                                        handleLogout()
                                        setIsOpen(false)
                                    }}
                                >
                                    Logout
                                </span>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
