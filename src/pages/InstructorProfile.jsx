import React from 'react';
import './profile.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

const courses = [
  {
    title: 'Course 1',
    category: 'Category 1',
    image: 'https://imgs.search.brave.com/5Rc3UevLfb-e_JEKqMPLWOshj7QduHcHAtpEJnoBxo8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NzI3MDk1Ni9waG90/by9zcGFnaGV0dGkt/cGFzdGEtYW5kLW1l/YXRiYWxscy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UTdf/ZDhUd0ZBckMwMVVH/ZmRmeFg1OTAyQmpB/UGZGYk1ESmE3YXdy/VnNvQT0',
    rating: 5,
    ratingCount: 23235,
    price: '10$',
  },
  {
    title: 'Course 2',
    category: 'Category 2',
    image: 'https://imgs.search.brave.com/3iaRO5msqfyivbQ3GkaVOSZ3L1yfdahnh32JfaorD2s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vMDcvMTQ1NDA3/LTA1MC04REJENzdF/OS9iZWx0cy5qcGc_/dz00MDAmaD0zMDAm/Yz1jcm9w',
    rating: 5,
    ratingCount: 23235,
    price: '10$',
  },
  {
    title: 'Course 3',
    category: 'Category 3',
    image: 'https://imgs.search.brave.com/Nj6FDr21a7Bl-ALHnn3z-R5DtuLnoptXnpqzm635RQ0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzcyLzU5LzEz/LzM2MF9GXzE3MjU5/MTM5MF9GWTU5TXU2/blMzQ3lud0ZUVEgw/eHRUT09IZlQ5dmJt/MC5qcGc',
    rating: 5,
    ratingCount: 23235,
    price: '10$',
  },
  {
    title: 'Course 4',
    category: 'Category 4',
    image: 'https://imgs.search.brave.com/eCfGiE9p6xigbpGzK5PgNs1HhyJJdlf3UwST_nWq21I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzkwLzk5LzEz/LzM2MF9GXzkwOTkx/Mzg4X1BVWU0xaTVR/YXF4b2Y5eEtvTWVZ/MEZLeHc4T2tSc3Bn/LmpwZw',
    rating: 5,
    ratingCount: 23235,
    price: '10$',
  },
];

const Profile = () => {
  return (

    <div className="container">
      <Container style={{borderBottom:'1px solid black'}}>
        <Row>
          <Col>

          <div className="profile">
        <img src="data:image/jpeg;base64,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" alt="Profile" />
        <div className="details">
          </div>
          </div>
          </Col>
          <Col style={{paddingLeft:'1080px'}}>
          <FontAwesomeIcon icon={faUserPen}/>
          </Col>
        
        </Row>

          <Row>
          <h1>Bill Kiprop</h1>
          </Row>
          
          <p>i am a certified martial arts instructor. Buy my course</p>
       

      
    </Container>
        

      <div className="courses">
        <h2>COURSES:</h2>
        <div className="course-list">

          {courses.map((course, index) => (
           
            <div className="course-card">
              <img src={course.image} alt="Course" />
              <div className="info">
                <h3>{course.title}</h3>
                <p>{course.category}</p>
                <div className="rating">
                  <span className="stars" style={{color:'#FFD700'}}>{'★'.repeat(course.rating)}</span>
                  <span className="count">({course.ratingCount})</span>
                </div>
                <div><button style={{backgroundColor:'#040D12', color:'white', borderRadius:'5px'}}>{course.price}</button></div>
              </div>
            </div>
        
          ))}

        </div>
      </div>
      
    
    </div>
  );
};

export default Profile;
