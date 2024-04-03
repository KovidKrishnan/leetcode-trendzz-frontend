import React from "react";
import { Link } from "react-router-dom";

export default function Contest({ contest }) {
  const contestUrl = `https://leetcode.com/contest/${contest.contest.title
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-")}`;

  return (
    <div
      className="d-flex flex-wrap justify-content-betwween border-bottom my-0 py-1"
      style={{ width: "330px" }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex mb-1 justify-content-between">
          <span>
            <a
              target="_blank"
              href={contestUrl}
              className={
                contest.contest.title.split(" ")[0] === "Biweekly"
                  ? "text-warning"
                  : "text-primary"
              }
            >
              <b>{contest.contest.title}</b>
            </a>
          </span>
          <span className="mx-4 text-secondary">
            {new Date(contest.contest.startTime * 1000).toLocaleDateString()}
          </span>
        </div>
        <span>
          Ranking: <b className="text-dark">{contest.ranking}</b>
        </span>
        <span
          style={{ fontSize: "12px", fondWeight: "bold" }}
          className={
            contest.trendDirection === "DOWN"
              ? "bg-danger text-light rounded-pill px-2 py-1"
              : "bg-info rounded-pill px-2 py-1 shadow"
          }
        >
          <b>{Math.fround(contest.rating).toFixed(2)}</b>
        </span>
      </div>
      <div className="d-flex justify-content-between flex-wrap align-items-center">
        <p>Problems Solved:&nbsp;</p>
        <p
          style={{
            color:
              contest.problemsSolved === 1 || contest.problemsSolved === 0
                ? "#ff0000"
                : contest.problemsSolved === 2
                ? "#ff9900"
                : contest.problemsSolved === 3
                ? "limegreen"
                : contest.problemsSolved === 4 
                ? "green "
                : "inherit", // Default color
          }}
        >
          <b>{contest.problemsSolved}</b>
        </p>
        <p><b>&nbsp;/&nbsp;{contest.totalProblems}</b></p>
      </div>
    </div>
  );
}
