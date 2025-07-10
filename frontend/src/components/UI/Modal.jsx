
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Modal.css'

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}
