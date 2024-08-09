/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaEnvelope, FaBell, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <FaBars onClick={toggleSidebar} />
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/Home">
                        <FaHome className="icon" /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/LearnersDashboard">
                        <FaCog className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/messages">
                        <FaEnvelope className="icon" /> Chats
                    </Link>
                </li>
                <li>
                    <Link to="/Notifications">
                        <FaBell className="icon" /> Notifications
                    </Link>
                </li>
                <li>
                    <Link to="/Browser">
                        <FaSearch className="icon" /> Browse
                    </Link>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/Settings">
                            <FaCog className="icon" /> Settings
                        </Link>
                    </li>
                    <li>
                        <button className="logout-button" onClick={() => {
                            // Handle logout logic
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/signin'; // Redirect to login page
                        }}>
                            <FaSignOutAlt className="icon" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
