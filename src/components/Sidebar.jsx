/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaEnvelope, FaBell, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed top-0 left-0 h-screen transition-transform duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-[#040d12] text-white flex flex-col justify-between`}>
            <div className="p-4 bg-[#040d12] text-right">
                <FaBars onClick={toggleSidebar} className="cursor-pointer" />
            </div>
            <ul className="flex-1 list-none p-0 m-0">
                <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                    <Link to="/Home" className="flex items-center text-white text-base no-underline">
                        <FaHome className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                        {isOpen && <span className="ml-2">Home</span>}
                    </Link>
                </li>
                <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                    <Link to="/Dashboard" className="flex items-center text-white text-base no-underline">
                        <FaCog className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                        {isOpen && <span className="ml-2">Dashboard</span>}
                    </Link>
                </li>
                <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                    <Link to="/messages" className="flex items-center text-white text-base no-underline">
                        <FaEnvelope className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                        {isOpen && <span className="ml-2">Chats</span>}
                    </Link>
                </li>
                <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                    <Link to="/Notifications" className="flex items-center text-white text-base no-underline">
                        <FaBell className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                        {isOpen && <span className="ml-2">Notifications</span>}
                    </Link>
                </li>
                <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                    <Link to="/Browser" className="flex items-center text-white text-base no-underline">
                        <FaSearch className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                        {isOpen && <span className="ml-2">Browse</span>}
                    </Link>
                </li>
            </ul>
            <div className="p-4">
                <ul className="list-none p-0 m-0">
                    <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                        <Link to="/Settings" className="flex items-center text-white text-base no-underline">
                            <FaCog className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                            {isOpen && <span className="ml-2">Settings</span>}
                        </Link>
                    </li>
                    <li className="p-4 flex items-center hover:bg-[#183d3d] rounded-md">
                        <button className="flex items-center text-white text-base no-underline bg-transparent border-none cursor-pointer" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/signin'; 
                        }}>
                            <FaSignOutAlt className={`text-2xl ${isOpen ? '' : 'bg-[#040d12]'}`} />
                            {isOpen && <span className="ml-2">Logout</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
