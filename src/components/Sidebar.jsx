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
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <FaBars onClick={toggleSidebar} />
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/Home">
                        <FaHome className="icon" /> 
                        {isOpen && <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/Dashboard">
                        <FaCog className="icon" /> 
                        {isOpen && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/messages">
                        <FaEnvelope className="icon" /> 
                        {isOpen && <span>Chats</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/Notifications">
                        <FaBell className="icon" /> 
                        {isOpen && <span>Notifications</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/Browser">
                        <FaSearch className="icon" /> 
                        {isOpen && <span>Browse</span>}
                    </Link>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/Settings">
                            <FaCog className="icon" /> 
                            {isOpen && <span>Settings</span>}
                        </Link>
                    </li>
                    <li>
                        <button className="logout-button" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/signin'; 
                        }}>
                            <FaSignOutAlt className="icon" /> 
                            {isOpen && <span>Logout</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
