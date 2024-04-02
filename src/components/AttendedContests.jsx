import React, { useState } from "react";
import Contest from "./Contest";
import { Accordion, Card, Button } from "react-bootstrap";
import AccordionWithList from "./AccordionWithList";

const AttendedContests = ({ contests }) => {
  // Filter attended contests
  const attendedContests = contests.filter(
    (contest) => contest.attended === true
  );

  // Get unique years from attended contests
  const uniqueYears = [
    ...new Set(
      attendedContests.map((contest) =>
        new Date(contest.contest.startTime * 1000).getFullYear()
      )
    ),
  ];

  // State to store selected year and months
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  // Function to get unique months for the selected year
  const getUniqueMonths = (year) => {
    const monthsForYear = attendedContests.filter(
      (contest) =>
        new Date(contest.contest.startTime * 1000).getFullYear() === year
    );
    const uniqueMonths = [
      ...new Set(
        monthsForYear.map((contest) =>
          new Date(contest.contest.startTime * 1000).getMonth()
        )
      ),
    ];
    return uniqueMonths;
  };

  // Function to handle year change
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    const uniqueMonths = getUniqueMonths(year);
    console.log(uniqueMonths);
    setMonths(uniqueMonths);
    setSelectedMonth("");
  };

  const nameMonth = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  // Function to handle month change
  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
  };

  return (
    <div style={{width: '360px'}}>
      {/* Dropdown for selecting year */}
      <select
      
        className="form-select mb-3"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="" disabled>
          Select Year
        </option>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {selectedYear && (
        <div className="accordion " id="monthsAccordion">
          {months.map((month, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                  onClick={() => setSelectedMonth(month)}
                >
                  {nameMonth[month]}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse${
                  selectedMonth === month ? " show" : ""
                }`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#monthsAccordion"
              >
                <div className="accordion-body d-flex justify-content-center flex-wrap">
                  {/* List of contests for the selected month */}
                  {attendedContests
                    .filter(
                      (contest) =>
                        new Date(
                          contest.contest.startTime * 1000
                        ).getFullYear() === selectedYear &&
                        new Date(
                          contest.contest.startTime * 1000
                        ).getMonth() === month
                    )
                    .map((contest, contestIndex) => (
                      <div key={contestIndex}>
                        <Contest contest={contest}></Contest>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendedContests;
