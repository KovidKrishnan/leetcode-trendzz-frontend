import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import UserContestPage from "./UserContestPage";
import AttendedContests from "./AttendedContests";
import SkillsCard from "./SkillsCard";
import MeetTheDev from "./MeetTheDev";
import SubmissionsCard from "./SubmissionsCard";
import SubmissionsRatingProgress from "./SubmissionsRatingProgress";

const DashBoard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [username, setUsername] = useState(params.get("username"));

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data: null });
  const [contestData, setContestData] = useState({ contestData: null });
  const [submissionData, setSubmissionData] = useState({
    submissionData: null,
  });
  const [whereToPlace, setWhereToPlace] = useState(false);
  const [backgroundWidth, setBackgroundWidth] = useState(360); // Default width

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

  const userSubmissionQuery = `query userProblemsSolved($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }`;

  // Function to fetch data from GraphQL API
  const fetchDataAndUpdateState = async (query, stateUpdater) => {
    try {
      const variables = { username };
      const response = await fetch(
        "https://leetcode.com/graphql",
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

  

  useEffect(() => {
      function handleResize() {
          if (window.innerWidth <= 330) {
              setBackgroundWidth(330);
          } else {
              setBackgroundWidth(360);
          }
      }

      // Initial call
      handleResize();

      // Event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup on component unmount
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchDataAndUpdateState(userProfileQuery, setData);
  }, [username]);

  // Fetch user contest data on component mount
  useEffect(() => {
    fetchDataAndUpdateState(userContestQuery, setContestData);
  }, [username]);

  // Fetch user submission data on component mount
  useEffect(() => {
    fetchDataAndUpdateState(userSubmissionQuery, setSubmissionData);
    console.log(submissionData);
  }, [username]);


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
    <div className="d-flex flex-wrap mt-2 w-md-100 w-lg-100 w-xl-100" style={{justifyContent: 'space-around', }}>
      <div className='d-flex flex-column p-md-2 p-lg-2 p-xl-2 mx-lg-2'>
        <div className="mb-3">
          <ProfileCard bgWidth={backgroundWidth} user={data.data.matchedUser} />
        </div>
        <div className="mb-3">
          <SubmissionsRatingProgress  bgWidth={backgroundWidth}
            submissionData={submissionData}
          ></SubmissionsRatingProgress>
        </div>
        <div className="mb-3">
          <SkillsCard  bgWidth={backgroundWidth} skills={data.data.matchedUser.profile.skillTags} />
        </div>
      </div>

      <div className="d-flex flex-column  p-md-2 p-lg-2 p-xl-2 mx-lg-4">
      <div className="mb-3">
          {submissionData && submissionData.data && (
              <SubmissionsCard bgWidth={backgroundWidth} data={submissionData.data}></SubmissionsCard>
            )}
        </div>
        <div className=" mb-3">
              {contestData &&
                contestData.data &&
                contestData.data.userContestRankingHistory && (
                  <UserContestPage bgWidth={backgroundWidth}
                    contests={contestData.data.userContestRankingHistory}
                  />
                )}
          </div>
      </div>
      <div className="d-flex flex-column flex-wrap p-md-2 p-lg-2 p-xl-2 mx-lg-1">
            
          <div className="mb-3">
          {contestData &&
            contestData.data &&
            contestData.data.userContestRankingHistory && (
              <AttendedContests bgWidth={backgroundWidth}
                contests={contestData.data.userContestRankingHistory}
                setWhereToPlace={setWhereToPlace}
              />
            )}
        </div>
        <div className="mb-3">
              <MeetTheDev bgWidth={backgroundWidth}></MeetTheDev>
            </div>
      </div>
      
    </div>
  );
};

export default DashBoard;
