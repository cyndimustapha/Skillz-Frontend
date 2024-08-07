import React from 'react';
import './home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const images = [
    {
        name:'Cooking',
        image: 'https://cdn.dribbble.com/users/1728164/screenshots/7691121/media/427794bd98ce50efc9c2118637c0ff62.jpg'
    },
    {
        name:'Self-Defence',
        image: 'https://cdn.dribbble.com/users/508588/screenshots/14286526/media/5811455e1c1a346eb1b2af639ee3f6e9.jpg?resize=840x630&vertical=center'
    },
    {
        name:'Photography',
        image: 'https://petapixel.com/assets/uploads/2022/02/types-of-photography-genres-you-should-know.jpg'
    },
    {
        name:'Art',
        image: 'https://img.freepik.com/premium-vector/world-art-day-flat-style-vector-illustration_825692-323.jpg'
    },
];

function Home() {
  return (
    <div>
        <Container className='navbarDiv'>
            <Row>
                <Col xs={8}>
                    <h2><b>LOGO</b></h2>
                </Col>
                <Col>
                    <Button style={{backgroundColor: '#183D3D'}}>Login</Button>
                    <Button style={{backgroundColor: '#FFFFFF', color: 'black', border: '1px solid white'}}>Sign up</Button>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col style={{paddingLeft: '200px', paddingTop: '40px'}}>
                    <div style={{width: '300px' }}>
                        <h2><b>Become a Pro with thousands of creative classes</b></h2>
                        <Button style={{backgroundColor: '#014E10'}}>Get Started</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container style={{paddingTop:'40px'}}>
            <Row>
                {images.map((obj, index) => (
                    <Col key={index} xs={3} >
                        <img src={obj.image} alt='showcase' style={{width:'330px', height:'500px', objectFit:'cover'}} />
                        <h2 className='names'><i>{obj.name}</i></h2>
                    </Col>  
                ))}
            </Row>
        </Container>
        <Container>
            <Row>
                <div className='desc'>
                <Col xs={6}>
                    <div style={{color: 'white', paddingTop: '170px', paddingLeft: '200px' }}>
                        <h1> Creative Learning at your convenience</h1>
                    </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ height: '40px', backgroundColor: '#5C8374', borderRadius: '100%', marginBottom: '10px' }} />
                        <h3>Sign up</h3>
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ height: '40px', backgroundColor: '#5C8374', borderRadius: '50%', marginBottom: '10px' }} />
                        <p>Enroll in a course and start learning</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ height: '40px', backgroundColor: '#5C8374', borderRadius: '50%', marginBottom: '10px' }} />
                        <p>Accolades to celebrate your accomplishments</p>
                    </div>
                </Col>
                </div>
            </Row>
        </Container>
    </div>
  );
}

export default Home;
