import React from 'react';
import { Card, CardSubtitle } from 'react-bootstrap';

const SkillsCard = ({ skills }) => {
  // Check if skills is undefined, null, or empty array, then return null
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className='bg-white p-3 rounded-3 d-flex flex-wrap justify-content-around align-items-center'>
      <Card.Text>{skills.map((skill, index) => (
        <span key={index}>
          <span className='rounded-pill shadow bg-secondary text-light py-1 px-3'>{skill}</span>&nbsp;
        </span>
      ))}
      </Card.Text>
    </div>
  );
};

// Set default prop value for skills
SkillsCard.defaultProps = {
  skills: [] // Default value is an empty array
};

export default SkillsCard;
