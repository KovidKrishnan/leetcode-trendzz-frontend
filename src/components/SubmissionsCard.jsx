import React, { useState, useEffect } from "react";
import { ProgressBar, Tooltip } from "react-bootstrap";

export default function SubmissionsCard({ data, bgWidth }) {
  const totalQuestions = data.allQuestionsCount;
  const acSubmissions = data.matchedUser.submitStatsGlobal.acSubmissionNum;

  const [submitted, setSubmitted] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const [total, setTotal] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const [animation, setAnimation] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  useEffect(() => {
    const submittedCount = {};
    const totalCount = {};

    acSubmissions.forEach((item) => {
      submittedCount[item.difficulty.toLowerCase()] = item.count;
    });

    totalQuestions.forEach((item) => {
      totalCount[item.difficulty.toLowerCase()] = item.count;
    });

    setSubmitted(submittedCount);
    setTotal(totalCount);
  }, [acSubmissions, totalQuestions]);

  useEffect(() => {
    const animateProgress = () => {
      const animationDurations = {
        easy: 100,
        medium: 400,
        hard: 800,
      };

      const animateProgressBar = (type) => {
        const progress = Math.min(
          (submitted[type] / total[type]) * 100,
          100 // Ensure progress doesn't exceed 100%
        );

        setAnimation((prevAnimation) => ({
          ...prevAnimation,
          [type]: progress,
        }));
      };

      const easyInterval = setInterval(() => {
        animateProgressBar("easy");
      }, animationDurations.easy / (((submitted.easy / total.easy) * 100) / 2));

      const mediumInterval = setInterval(() => {
        animateProgressBar("medium");
      }, animationDurations.medium / (((submitted.medium / total.medium) * 100) / 2));

      const hardInterval = setInterval(() => {
        animateProgressBar("hard");
      }, animationDurations.hard / (((submitted.hard / total.hard) * 100) / 2));

      setTimeout(() => {
        clearInterval(easyInterval);
        clearInterval(mediumInterval);
        clearInterval(hardInterval);
      }, Math.max(...Object.values(animationDurations)));
    };

    const delay = setTimeout(() => {
      animateProgress();
    }, 100);

    return () => clearTimeout(delay);
  }, [submitted, total]);

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">
      {text}
    </Tooltip>
  );

  return (
    <div style={{ width: bgWidth }}>
      <h4>Submission Count</h4>
      <hr />
      <div className="d-flex flex-wrap flex-column justify-content-between p-3 rounded-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', height: '194px'}}>
        <div className="mb-2">
          <span style={{ fontSize: "12px" }} className="text-success">
            <b>Easy</b>
          </span>
          {((submitted.easy / total.easy) * 100).toFixed(2) <= 50 && (
            <span style={{ fontSize: "12px" }} className="text-success">
              <b>: AC {submitted.easy}/{total.easy}</b>
            </span>
          )}
          <ProgressBar
            now={animation.easy}
            variant="success"
            label={
              ((submitted.easy / total.easy) * 100).toFixed(2) > 50
                ? `AC: ${submitted.easy}/${total.easy}`
                : null
            }
            style={{ backgroundColor: "#294d35", border: "none" }}
            animated
          />
          
        </div>
        <div className="mb-2">
          <span style={{ fontSize: "12px" }} className="text-warning">
            <b>Medium</b>
          </span>
          {((submitted.medium / total.medium) * 100).toFixed(2) <= 50 && (
            <span style={{ fontSize: "12px" }} className="text-warning">
              <b>: AC {submitted.medium}/{total.medium}</b>
            </span>
          )}
          <ProgressBar
            now={animation.medium}
            variant="warning"
            label={
              ((submitted.medium / total.medium) * 100).toFixed(2) > 50
                ? `AC: ${submitted.medium}/${total.medium}`
                : null
            }
            style={{ backgroundColor: "#5e4e26", border: "none" }}
            animated
          />
          
        </div>

        <div className="mb-2">
          <span style={{ fontSize: "12px" }} className="text-danger">
            <b>Hard</b>
          </span>
          {((submitted.hard / total.hard) * 100).toFixed(2) <= 50 && (
            <span style={{ fontSize: "12px" }} className="text-danger">
              <b>: AC {submitted.hard}/{total.hard}</b>
            </span>
          )}
          <ProgressBar
            now={animation.hard}
            variant="danger"
            label={
              ((submitted.hard / total.hard) * 100).toFixed(2) > 50
                ? `AC: ${submitted.hard}/${total.hard}`
                : null
            }
            style={{ backgroundColor: "#5a302f" }}
            animated
          />
          
        </div>
      </div>
    </div>
  );
}
