import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import SearchBar from './searchbar';

const Browser = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);

        // Extract unique categories from the courses data
        const uniqueCategories = [...new Set(data.map((course) => course.category))];
        setCategories(uniqueCategories);

        // Initially, show all courses
        setFilteredCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = courses.filter((course) => course.category === category);
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    // <div style={{height:'3000px', backgroundColor:'white'}}>

   
    <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px', paddingBottom:'700px' }}>
      <Row style={{borderBottom:'1px solid black', marginBottom:'40px'}}>
        <Col>
        SKILLZ
        </Col>
        <Col>
        <div>
      <SearchBar onSearch={handleSearch} />
      </div>
        </Col>
     
      </Row>

      
      <Row>
        <Col md={3} style={{ backgroundColor: '#ffffff', padding: '10px' }}>
          <h4>CATEGORIES</h4>
          <ListGroup variant="flush">
            <ListGroup.Item
              key="all"
              onClick={() => handleCategoryClick('')}
              style={{
                backgroundColor: selectedCategory === '' ? '#E0E8E3' : 'transparent',
                cursor: 'pointer',
              }}
            >
              All Categories
            </ListGroup.Item>
            {categories.map((category, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleCategoryClick(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#E0E8E3' : 'transparent',
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
            {filteredCourses.map((course, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card style={{ borderRadius: '5px' }}>
                  <Card.Img
                    variant="top"
                    src={course.image_url || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body style={{ backgroundColor: '#1B3043', color: '#ffffff' }}>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.price} Shillings</Card.Text>
                    <Button variant="light">Enroll</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    // </div>
  );
};

export default Browser;
