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
    <Card style={{backgroundImage:'url(https://static.vecteezy.com/system/resources/previews/001/987/642/non_2x/abstract-diagonal-light-grey-silver-background-technology-concept-free-vector.jpg)', minWidth: '360px'}} className="rounded-3">
      <Card.Body className="d-flex flex-column">
        {/* Image on the left */}
        <div className="d-flex align-items-center">
          <img
            src={user.profile.userAvatar}
            alt="Profile"
            className="rounded-5 me-4 mb-1"
            style={{ width: "50px" }}
          />
          <h5>
            <a target="_blank" href={`https://leetcode.com/${user.username}`}>
              {user.username}
            </a>
          </h5>
        </div>
          <div className="d-flex justify-content-between mt-4 pb-1 flex-wrap">
            <a target="_blank"  href={user.linkedinUrl}>
              <button disabled={!user.linkedinUrl} className="bg-primary rounded-3">
                <FontAwesomeIcon icon={faLinkedin} />
              </button>
            </a>

            <a target="_blank" href={user.githubUrl}>
              <button disabled={!user.githubUrl} className="bg-primary rounded-3 shadow">
                <FontAwesomeIcon icon={faGithub} />
              </button>
            </a>

            <a target="_blank" href={user.twitterUrl}>
              <button disabled={!user.twitterUrl} className="bg-primary rounded-3 shadow">
                <FontAwesomeIcon icon={faTwitter} />
              </button>
            </a>
          </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
