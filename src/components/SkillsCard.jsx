import React from 'react';

const SkillsCard = ({ skills, bgWidth }) => {
  // Check if skills is undefined, null, or empty array, then return null
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className='p-3 rounded-3 d-flex flex-wrap justify-content-center align-items-center border' style={{width: bgWidth}}>
      {skills.map((skill, index) => (
          <span key={index} className='rounded-pill bg-secondary text-light py-1 px-3 m-1'>{skill}&nbsp;</span>
      ))}
    </div>
  );
};

// Set default prop value for skills
SkillsCard.defaultProps = {
  skills: [] // Default value is an empty array
};

export default SkillsCard;
