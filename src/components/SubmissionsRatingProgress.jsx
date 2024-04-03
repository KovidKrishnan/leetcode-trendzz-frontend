import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];

  for (let i = 0; i < 12; i++) {
    const Rating = Math.floor(Math.random() * 5000) + 1000; // Generate a random value for Rating Rating
    const submissions = Math.floor(Math.random() * 5000) + 1000; // Generate a random value for Submissions

    data.push({
      name: months[i],
      Rating: Rating,
      Submissions: submissions
    });
  }

const SubmissionsRatingProgress = () => {
  return (
    <div style={{width: '360px'}}>
        <h4>Track your progress</h4>
        <hr />
        <div className='bg-light rounded-3 d-flex justify-content-center align-items-center p-1'>
      <LineChart
        width={360}
        height={216}
        data={data}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Submissions" stroke="#00b8a3" strokeWidth={2} /> {/* Increase stroke width */}
        <Line type="monotone" dataKey="Rating" stroke="#ef4743" strokeWidth={2} /> {/* Increase stroke width */}
      </LineChart>
    </div>
    </div>
  );
};

export default SubmissionsRatingProgress;

