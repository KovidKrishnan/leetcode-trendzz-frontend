import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import UserContestPage from "./UserContestPage";
import { Stack } from "react-bootstrap";

const DashBoard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [username, setUsername] = useState(params.get("username"));

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data: null });
  const [contestData, setContestData] = useState({ contestData: null });

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
      const temp = await response.json();
      console.log(temp);
      stateUpdater(temp);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataAndUpdateState(userProfileQuery, setData);
  }, [username, userProfileQuery]); // Run effect only when username changes

  useEffect(() => {
    fetchDataAndUpdateState(userContestQuery, setContestData);
  }, [username, userContestQuery]);

  if (loading) {
    return (
      <div>
        <Skeleton height={50} />
        <Skeleton height={200} count={10} />
      </div>
    );
  }

  // Check if data and matchedUser are not null or undefined
  if (!data || !data.data) {
    return (
      <div>
        <p>User not found.</p>
        <Link to="/">Go to home</Link>
      </div>
    );
  }

  // Render the fetched data
  return (
    <Stack direction="horizontal" className="pt-5">
      <Stack direction="vertical" className="">
        <div className="mb-3">
          <ProfileCard user={data.data.matchedUser}></ProfileCard>
        </div>
        <div className="mb-3">
          <ProfileCard user={data.data.matchedUser}></ProfileCard>
        </div>
      </Stack>
      <Stack direction="vertical" className="mx-4">
        <div className="col mb-3">
          {contestData &&
            contestData.data &&
            contestData.data.userContestRankingHistory && (
              <UserContestPage
                contests={contestData.data.userContestRankingHistory}
              />
            )}
        </div>
      </Stack>
    </Stack>
  );
};

export default DashBoard;
