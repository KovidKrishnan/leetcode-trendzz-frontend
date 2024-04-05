import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";


export default function MeetTheDev() {
  const openProfile = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ width: '360px' }}>
      <h4>Meet the Developer</h4>
      <hr />
      <div className=' text-dark p-4 rounded-3 d-flex flex-wrap justify-content-center align-items-center' style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
        <div>
          <h3 className='text-primary'>Kovid Krishnan </h3>
          Computer Science Student, Web Developer, Android Developer, Machine Learning Engineer, Aspiring SDE.
        </div>
        <Card.Text>
          <hr />
          <Button variant="link" onClick={() => openProfile('https://github.com/KovidKrishnan')}>
            <FaGithub size={24} />
          </Button>
          <Button variant="link" onClick={() => openProfile('https://leetcode.com/Kovid_krishnan_30')}>
          <SiLeetcode />
          </Button>
          <Button variant="link" onClick={() => openProfile('https://www.linkedin.com/in/kovidkrishnan')}>
            <FaLinkedin size={24} />
          </Button>
          <Button variant="link" onClick={() => openProfile('https://twitter.com/krishnan_kovid')}>
            <FaTwitter size={24} />
          </Button>
        </Card.Text>
      </div>
    </div>
  );
}
