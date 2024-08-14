import React, { useState, useEffect } from 'react';
import './home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
// import { useNavigate } from 'react-router-dom';
import './home.css';
import BASE_URL from './UTILS';
import Sidebar from '../components/Sidebar';

const images = [
  {
    name: 'Cooking',
    image: 'https://cdn.dribbble.com/users/1728164/screenshots/7691121/media/427794bd98ce50efc9c2118637c0ff62.jpg',
  },
  {
    name: 'Self-Defence',
    image: 'https://cdn.dribbble.com/users/508588/screenshots/14286526/media/5811455e1c1a346eb1b2af639ee3f6e9.jpg?resize=840x630&vertical=center',
  },
  {
    name: 'Photography',
    image: 'https://petapixel.com/assets/uploads/2022/02/types-of-photography-genres-you-should-know.jpg',
  },
  {
    name: 'Art',
    image: 'https://img.freepik.com/premium-vector/world-art-day-flat-style-vector-illustration_825692-323.jpg',
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch user profile picture if logged in
    if (token) {
      const fetchProfilePicture = async () => {
        try {
          const response = await fetch(`${BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setProfilePicture(data?.profile_picture || 'data:image/png;base64,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'); // Replace with default if not found
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };

      fetchProfilePicture();
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/browser');
    } else {
      navigate('/signin');
    }
  };

  const handleProfilePictureClick = () => {
    navigate('/profile');
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLoginClick = () => {
    navigate('/signin'); // Navigate to login page
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to signup page
  };

  const faqs = [
    {
      question: "What is Skillz?",
      answer: "Skillz is an online learning platform that offers thousands of creative classes taught by experts in various fields."
    },
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll in a course by signing up for an account, browsing through the available courses, and clicking 'Enroll' on the course of your choice."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes, you can download courses to access them offline through our mobile app."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, you will receive an accolade of completion for each course you successfully finish."
    },
    {
      question: "What if I have technical issues or need support?",
      answer: "We offer 24/7 support through our help center. You can reach out to us anytime for assistance."
    }
  ];

  return (
    <div>
        <div >
        <Sidebar/>
        </div>
        <div style={{paddingLeft:'300px'}}>
      <Container className='navbarDiv'>
        <Row>
          <Col xs={8}>
            <h2><b>SKILLZ</b></h2>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="header-col">
            <div className="header-content">
              <h2><b>Become a Pro with thousands of creative classes</b></h2>
              <Button className="get-started-btn" onClick={handleGetStarted} >Get Started</Button>
              <NavLink to={'/dashboard'}><Button className='get-started-btn' style={{marginLeft:'20px'}}>My dashboard</Button></NavLink>
              
            </div>
          </Col>
        </Row>
      </Container>
      <Container className='image-container'>
        <Row>
          {images.map((obj, index) => (
            <Col key={index} xs={3}>
              <img src={obj.image} alt='showcase' className="showcase-img" />
              <h2 className='names'><i>{obj.name}</i></h2>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row>
          <div className='desc'>
            <Col xs={6}>
              <div className="creative-learning">
                <h1>Creative Learning at your convenience</h1>
              </div>
            </Col>
            <Col xs={6} className="checklist">
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h3 className="white-text"><i>Sign up</i></h3>
              </div>
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h2 className="white-text"><i>Enroll in a course and start learning</i></h2>
              </div>
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h2 className="white-text"><i>Accolades to celebrate your accomplishments</i></h2>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <Col xs={3}>
            <div className="info-box" style={{ marginLeft: '30px' }}>1K+ COURSES</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">1K+ LEARNERS</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">1K+ INSTRUCTORS</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">4.5   ★★★★☆<br />APP STORE RATING</div>
          </Col>
        </Row>
      </Container>
      <Container style={{ height: '900px', transform: 'translateY(-100px)' }}>
        <h1>Why Skillz?</h1>
        <Row>
          <Col xs={6} style={{ width: '480px', paddingTop: '40px', textAlign: 'center', paddingLeft: '80px' }}>
            <h2>
              “This platform has transformed
              the way I learn new skills!
              The courses are practical and
              engaging.“
            </h2><br />
            <h2><b>~Billy Butcher</b></h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ width: '1200px', paddingTop: '40px', textAlign: 'center', paddingLeft: '780px' }}>
            <h2 style={{ fontWeight: "lighter" }}>
              "This app makes it so easy to learn
              at my own pace and the
              instructors are top-notch!"
            </h2><br />
            <h2>~Joel Ochieng</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ width: '480px', paddingTop: '40px', textAlign: 'center', paddingLeft: '80px' }}>
            <h2>
              "The photography courses on this
              app are amazing!! I've learned new
              techniques that have taken my
              work to the next level."
            </h2><br />
            <h2>
              ~Louis du Lac
            </h2>
          </Col>
        </Row>
      </Container>
      <Container style={{ height: '550px', backgroundColor: '#183D3D', color: 'white', textAlign: 'center', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
        <div style={{ paddingTop: '50px', fontSize: 'large' }}>
          <h2>Frequently Asked Questions (FAQs)</h2>
        </div>
        <Row>
          <Col style={{ paddingLeft: '220px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ margin: '20px 0', cursor: 'pointer', borderBottom: '1px solid white', width: "900px", paddingBottom: '20px' }} onClick={() => toggleFAQ(index)}>
                <h4>{faq.question}</h4>
                {activeIndex === index && (
                  <p style={{ marginTop: '10px', fontSize: 'medium' }}>
                    <i>{faq.answer}</i>
                  </p>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <div className='help' style={{ backgroundColor: 'black', height: '300px' }}></div>
      </div>
    </div>
  );
}

export default Home;