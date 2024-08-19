import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import BASE_URL from './UTILS';

const CourseContent = () => {
    const { courseId } = useParams(); // Get courseId from route parameters
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch course details
        fetch(`${BASE_URL}/courses/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course data:', error));

        // Fetch all contents associated with the course
        fetch(`${BASE_URL}/coursecontents?course_id=${courseId}`)
            .then(response => response.json())
            .then(data => {
                setContents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching course contents:', error);
                setLoading(false);
            });
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card>
                        {contents[0]?.content_type === 'video' && (
                            <ReactPlayer
                                url={contents[0].content_url}
                                controls
                                width="100%"
                                height="auto"
                                style={{ borderRadius: '10px 10px 0 0' }}
                            />
                        )}
                        {contents[0]?.content_type === 'text' && (
                            <Card.Body>
                                <Card.Text as="div">
                                    {contents[0].content_url}
                                </Card.Text>
                            </Card.Body>
                        )}
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Button
                                variant="success"
                                className="mb-3"
                                onClick={() => navigate(`/profile/${course.instructor_id}`)}
                            >
                                View Instructor
                            </Button>
                            <Card.Text as="div">
                                <strong>About</strong>
                                <div style={{ marginTop: '10px' }}>
                                    {course.description}
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    {contents.slice(1).map((content, index) => (
                        <Card key={index} className="mb-3">
                            {content.content_type === 'video' && (
                                <Card.Body>
                                    <ReactPlayer
                                        url={content.content_url}
                                        controls
                                        width="100%"
                                        height="auto"
                                    />
                                </Card.Body>
                            )}
                            {content.content_type === 'text' && (
                                <Card.Body>
                                    <Card.Text as="div">{content.content_url}</Card.Text>
                                </Card.Body>
                            )}
                            <Card.Body>
                                <Card.Title>{content.content_type}</Card.Title>
                                <Card.Text as="div">Part {index + 2}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            </Row>
        </Container>
    );
};

export default CourseContent;
