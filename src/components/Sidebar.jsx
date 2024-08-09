/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Change default to true for testing

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
                    <Link to="/LearnersDashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/MessagesPage">Messages</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
