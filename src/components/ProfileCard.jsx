import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


const ProfileCard = ({ user }) => {
  console.log(user);
  return (
    <div style={{ width: '360px',}} >
      <h4>Profile</h4>
      <hr />
<Card style={{backgroundImage:'url(https://static.vecteezy.com/system/resources/previews/001/987/642/non_2x/abstract-diagonal-light-grey-silver-background-technology-concept-free-vector.jpg)', height: '194px'}} className="rounded-3 d-flex flex-column justify-content-center">
  <Card.Body className="d-flex flex-column">
    {/* Image and username */}
    <div className="d-flex align-items-center mb-4">
      <img
        src={user.profile.userAvatar}
        alt="Profile"
        className="rounded-5 me-4"
        style={{ width: "50px" }}
      />
      <h5 className="mb-0">
        <a target="_blank" href={`https://leetcode.com/${user.username}`}>
          {user.username}
        </a>
      </h5>
    </div>
      
    {/* Social media buttons */}
    <div className="d-flex justify-content-between">
      <a target="_blank" href={user.linkedinUrl}>
        <button disabled={!user.linkedinUrl} className="bg-primary rounded-3">
          <FontAwesomeIcon icon={faLinkedin} />
        </button>
      </a>

      <a target="_blank" href={user.githubUrl}>
        <button disabled={!user.githubUrl} className="rounded-3 shadow">
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </a>

      <a target="_blank" href={user.twitterUrl}>
        <button disabled={!user.twitterUrl} className="bg-info rounded-3 shadow">
          <FontAwesomeIcon icon={faTwitter} />
        </button>
      </a>
    </div>
  </Card.Body>
</Card>

    </div>
  );
};

export default ProfileCard;
