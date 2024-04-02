import React from "react";
import { Accordion } from "react-bootstrap";



export default function ParticipatedContests({ contests }) {
  const attendedContests = contests.filter((contest) => contest.attended);

  return <div></div>;
}
