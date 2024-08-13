import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const Browser = () => {
  const [courses, setCourses] = useState([]);
  const categories = Array(10).fill('Category 1'); // Dummy categories

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <Row>
        <Col md={3} style={{ backgroundColor: '#ffffff', padding: '10px' }}>
          <h4>CATEGORIES</h4>
          <ListGroup variant="flush">
            {categories.map((category, index) => (
              <ListGroup.Item
                key={index}
                style={{
                  backgroundColor: index === 1 ? '#E0E8E3' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9}>
          <Row>
            {courses.map((course, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card style={{borderRadius:'5px'}}>
                  <Card.Img
                    variant="top"
                    src={course.image_url || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body style={{ backgroundColor: '#1B3043', color: '#ffffff' }}>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.price} $</Card.Text>
                    <Button variant="light">Enroll</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Browser;
