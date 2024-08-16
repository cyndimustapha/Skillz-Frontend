// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { userId } = useParams(); // Get user ID from URL parameters
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/public-users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    {user.profile_picture ? (
                        <img src={user.profile_picture} alt={`${user.first_name} ${user.last_name}`} className="img-fluid" />
                    ) : (
                        <div className="placeholder-img">No Image</div>
                    )}
                </div>
                <div className="col-md-8">
                    <h1>{user.first_name} {user.last_name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Bio: {user.bio}</p>

                    {user.courses && user.courses.length > 0 && (
                        <div>
                            <h3>Courses:</h3>
                            <ul>
                                {user.courses.map(course => (
                                    <li key={course.id}>{course.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
