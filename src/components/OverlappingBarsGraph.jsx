import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const OverlappingBarsGraph = ({}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Problem Submission Stats"
    },
    subtitles: [{
      text: ``,
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      radius: '50px',
      innerRadius: '80%',
      showInLegend: false,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Medium", y: 31, color: '#ffc01e' },
        { name: "Hard", y: 40, color: '#ef4743' },
        { name: "Easy", y: 17, color: '#00b8a3' },
        {name: 'Unsolved',y: 23, color: '#444444' }
      ]
    }]
  };

  return (
    <div style={{width: '360px'}}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default OverlappingBarsGraph;
