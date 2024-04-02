import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import UserContestPage from "./UserContestPage";
import AttendedContests from "./AttendedContests";

const DashBoard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [username, setUsername] = useState(params.get("username"));

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data: null });
  const [contestData, setContestData] = useState({ contestData: null });

  // GraphQL queries
  const userProfileQuery = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        contestBadge {
          name
          expired
          hoverText
          icon
        }
        username
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
      }
    }
  `;

  const userContestQuery = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }
  `;

  // Function to fetch data from GraphQL API
  const fetchDataAndUpdateState = async (query, stateUpdater) => {
    try {
      const variables = { username };
      const response = await fetch(
        "https://leetcode-trendzz.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        }
      );
      const jsonData = await response.json();
      stateUpdater(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchDataAndUpdateState(userProfileQuery, setData);
  }, [username, userProfileQuery]);

  // Fetch user contest data on component mount
  useEffect(() => {
    fetchDataAndUpdateState(userContestQuery, setContestData);
  }, [username, userContestQuery]);

  // If loading, display a spinner
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If user data is not found or errors occur, display an error message
  if (!data || !data.data || data.errors) {
    return (
      <div className="text-center my-5">
        <p>User not found.</p>
        <Link to="/">Go to home</Link>
      </div>
    );
  }

  // Render the fetched data
  return (
    <div className="row " style={{ maxHeight: "calc(100vh - 5rem)" }}>
      <div className="col mx-0">
        <div className="col mb-3">
          <ProfileCard user={data.data.matchedUser} />
        </div>
        <div className="col mb-3">
          {contestData &&
            contestData.data &&
            contestData.data.userContestRankingHistory && (
              <UserContestPage
                contests={contestData.data.userContestRankingHistory}
              />
            )}
        </div>
      </div>
      <div className="col">
        <div className="col mb-3">
          {contestData &&
            contestData.data &&
            contestData.data.userContestRankingHistory && (
              <AttendedContests
                contests={contestData.data.userContestRankingHistory}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
