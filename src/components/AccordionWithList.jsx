import React from 'react';

const AccordionWithList = ({ listItems }) => {
  return (
    <div className="container">
      <h2>Accordion with List Items</h2>
      <div id="accordion">
        {listItems.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-header" id={`heading${index}`}>
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  {item}
                </button>
              </h5>
            </div>
            <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordion">
              <div className="card-body">
                {/* Content of the accordion item goes here */}
                {/* You can add any content you want */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, explicabo?
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionWithList;
