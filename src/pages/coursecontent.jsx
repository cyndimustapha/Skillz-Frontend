import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BASE_URL from './UTILS';

const GuitarLessons = ({ courseId }) => {
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch course details
        fetch(`${BASE_URL}/courses/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course data:', error));

        // Fetch course contents
        fetch(`${BASE_URL}/courses/${courseId}`)
            .then(response => response.json())
            .then(courseData => {
                const contentPromises = courseData.contents.map(content =>
                    fetch(`${BASE_URL}/coursecontents/${content.id}`)
                        .then(response => response.json())
                );

                Promise.all(contentPromises)
                    .then(contentData => {
                        setContents(contentData);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching course contents:', error);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error fetching course data:', error);
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
                            <video
                                width="100%"
                                controls
                                style={{ borderRadius: '10px 10px 0 0' }}
                            >
                                <source src={contents[0].content_url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {contents[0]?.content_type === 'text' && (
                            <Card.Body>
                                <Card.Text>{contents[0].content_url}</Card.Text>
                            </Card.Body>
                        )}
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Button variant="success" className="mb-3">View Instructor</Button>
                            <Card.Text>
                                <strong>About</strong>
                                <p style={{ marginTop: '10px' }}>
                                    {course.description}
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    {contents.slice(1).map((content, index) => (
                        <Card key={index} className="mb-3">
                            {content.content_type === 'video' && (
                                <Card.Body>
                                    <video width="100%" controls>
                                        <source src={content.content_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </Card.Body>
                            )}
                            {content.content_type === 'text' && (
                                <Card.Body>
                                    <Card.Text>{content.content_url}</Card.Text>
                                </Card.Body>
                            )}
                            <Card.Body>
                                <Card.Title>{content.content_type}</Card.Title>
                                <Card.Text>Part {index + 2}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Button variant="secondary">Back</Button>
            </Row>
        </Container>
    );
};

export default GuitarLessons;
