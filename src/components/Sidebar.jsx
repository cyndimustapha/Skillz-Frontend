import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaEnvelope, FaBell, FaSearch, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import BASE_URL from '../pages/UTILS';
import './sidebar.css'; // Import the CSS file

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [profile, setProfile] = useState({ name: '', profilePicture: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch(`${BASE_URL}/users`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setProfile({
                        name: data.name || 'Profile',
                        profilePicture: data.profile_picture || 'default_profile_picture_url'
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <div className="sidebar-header-content">
                    {isOpen && <h1 className="sidebar-title">Skillz</h1>}
                    <button onClick={toggleSidebar} className="sidebar-button">
                        <FaBars />
                    </button>
                </div>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-menu-item">
                    <Link to="/" className="sidebar-menu-item-link">
                        <FaHome className="sidebar-menu-item-icon" />
                        {isOpen && <span className="sidebar-menu-item-text">Home</span>}
                    </Link>
                </li>
                <li className="sidebar-menu-item">
                    <Link to="/Dashboard" className="sidebar-menu-item-link">
                        <FaTachometerAlt className="sidebar-menu-item-icon" />
                        {isOpen && <span className="sidebar-menu-item-text">Dashboard</span>}
                    </Link>
                </li>
                <li className="sidebar-menu-item">
                    <Link to="/messages" className="sidebar-menu-item-link">
                        <FaEnvelope className="sidebar-menu-item-icon" />
                        {isOpen && <span className="sidebar-menu-item-text">Chats</span>}
                    </Link>
                </li>
                <li className="sidebar-menu-item">
                    <Link to="/Notifications" className="sidebar-menu-item-link">
                        <FaBell className="sidebar-menu-item-icon" />
                        {isOpen && <span className="sidebar-menu-item-text">Notifications</span>}
                    </Link>
                </li>
                <li className="sidebar-menu-item">
                    <Link to="/Browser" className="sidebar-menu-item-link">
                        <FaSearch className="sidebar-menu-item-icon" />
                        {isOpen && <span className="sidebar-menu-item-text">Browse</span>}
                    </Link>
                </li>
            </ul>
            <div className="profile-section">
                <Link to="/profile" className="profile-link">
                    <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className={`profile-img ${isOpen ? 'open' : 'closed'}`}
                    />
                    {isOpen && <span className="profile-name">{profile.name}</span>}
                </Link>
                <ul className="list-none p-0 m-0 mt-4">
                    <li className="sidebar-menu-item">
                        <Link to="/Settings" className="sidebar-menu-item-link">
                            <FaCog className="sidebar-menu-item-icon" />
                            {isOpen && <span className="sidebar-menu-item-text">Settings</span>}
                        </Link>
                    </li>
                    <li className="sidebar-menu-item">
                        <button
                            className="logout-button"
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                window.location.href = '/signin';
                            }}
                        >
                            <FaSignOutAlt className="logout-button-icon" />
                            {isOpen && <span className="logout-button-text">Logout</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
