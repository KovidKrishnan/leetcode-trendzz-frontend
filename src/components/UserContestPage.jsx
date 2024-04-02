import React from 'react'
import { Card } from 'react-bootstrap';

function findBestSolvedContest(attendedContests) {
    if (!attendedContests || attendedContests.length === 0) {
      return "No attended contests found.";
    }
  
    let bestContest = null;
  
    attendedContests.forEach(contest => {
      if (!bestContest || contest.rating > bestContest.rating || (contest.rating === bestContest.rating && contest.contest.startTime > bestContest.contest.startTime)) {
        bestContest = contest;
      }
    });

    const monthMap = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
      };
      
  
    if (bestContest) {
      const startTime = new Date(bestContest.contest.startTime * 1000);
      const contestDate = startTime.getDate();
      const contestMonth = startTime.getMonth() + 1;
      const contestYear = startTime.getFullYear();
      const contestMonthConduct = monthMap[contestMonth]
  
      return {
        contestDate: `${contestDate} ${contestMonthConduct} ${contestYear}`,
        contestName: bestContest.contest.title,
        rating: bestContest.rating,
        ranking: bestContest.ranking,
        problemsSolved: bestContest.problemsSolved
      };
    } else {
      return "No contest found with problems solved.";
    }
  }

export default function UserContestPage({contests}) {
    const attendedContests = contests.filter(contest => contest.attended === true);
    const report = findBestSolvedContest(attendedContests);
  return (
    <div>
        <Card style={{minWidth: '300px', height: '255px'}}>
            <Card.Title>Best Rated Contest &#x1F525;</Card.Title>
            <Card.Body>
                <p>Name: <b className='text-warning'>{report.contestName}</b> </p>
                <p >Date: <b className='text-primary'>{report.contestDate}</b></p>
                <p>Rating:<b className='text-danger'> {Math.fround(report.rating).toFixed(2)}</b></p>
                <p>Rank: <b className='text-success'>{report.ranking}</b></p>
            </Card.Body>
        </Card>
    </div>
  )
}
