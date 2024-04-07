import React, { useEffect, useState } from "react";
import Contest from "./Contest";
import { Accordion } from "react-bootstrap";

const AttendedContests = ({ contests, setWhereToPlace, bgWidth }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedMonth === "") {
        setWhereToPlace(false);
      } else {
        setWhereToPlace(true);
      }
    }, 300);
  
    // Clear the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [selectedMonth]);
  

  const attendedContests = contests.filter(
    (contest) => contest.attended === true
  );

  const uniqueYears = [
    ...new Set(
      attendedContests.map((contest) =>
        new Date(contest.contest.startTime * 1000).getFullYear()
      )
    ),
  ];

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

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    const uniqueMonths = getUniqueMonths(year);
    setMonths(uniqueMonths);
    setSelectedMonth("");
  };

  const handleAccordionItemClick = (month) => {
    setSelectedMonth((prevMonth) => (prevMonth === month ? "" : month));

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

  return (
    <div style={{ width: bgWidth }}>
      <h4>Participated Contests</h4>
      <hr />
      {attendedContests.length > 0 &&
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
      }
      {attendedContests.length == 0 &&
        <p>No Participated Contests Available</p>
      }

      {selectedYear && (
        <Accordion
          activeKey={selectedMonth}
          className="accordion"
          id="monthsAccordion"
        >
          {months.map((month, index) => (
            <Accordion.Item key={index} eventKey={month}>
              <Accordion.Header
                onClick={() => handleAccordionItemClick(month)}
                style={{ cursor: "pointer" }} // Add pointer cursor
              >
                {nameMonth[month]}
              </Accordion.Header>
              <Accordion.Body
                className={`accordion-collapse collapse${
                  selectedMonth === month ? " rounded-2 show p-0" : ""
                }`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#monthsAccordion"
                style={{
                  transition: "all 1s ease-in-out",
                  overflow: "hidden", // Hide overflow when accordion is collapsed
                }}
              >
                <div className="accordion-body d-flex justify-content-center flex-wrap">
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default AttendedContests;
