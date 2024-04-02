import React from "react";

export default function Contest({ contest }) {
  return (
    <div
      className="d-flex flex-wrap justify-content-center border-bottom mb-2"
      style={{ width: "300px" }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <div className="d-flex mb-1 justify-content-between">
          <span
            className={
              contest.contest.title.split(" ")[0] === "Biweekly"
                ? "text-warning"
                : "text-primary"
            }
          >
            <b>{contest.contest.title}</b>
          </span>
          <span className="mx-4 text-secondary mb-0">
            {new Date(contest.contest.startTime * 1000).toLocaleDateString()}
          </span>
        </div>
        <span>
          Ranking: <b className="text-dark">{contest.ranking}</b>
        </span>
        <span style={{fontSize: '14px', fondWeight: 'bold'}}
            className={
              contest.trendDirection === "DOWN"
                ? "bg-danger text-light rounded-pill px-2 py-1"
                : "bg-info rounded-pill px-2 py-1"
            }>
            <b>{Math.fround(contest.rating).toFixed(2)}</b>
        </span>
      </div>
    </div>
  );
}
