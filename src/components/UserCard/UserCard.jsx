import "./UserCard.scss";
import Vector from "../../assets/Vector.png";

// TRUNCATE TEXT TO USER CARD IF STRING HAS LENGTH MORE THAN 30
const truncateText = (text, max = 30) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img
        src={user.photo || Vector}
        alt={user.name || Vector}
        loading="lazy"
        className="user-photo"
      />
      <h3 title={user.name}>{truncateText(user.name, 25)}</h3>
      <p title={user.position}>{truncateText(user.position, 25)}</p>
      <p className="email-wrapper">
        {truncateText(user.email, 25)}
        <span className="email-tooltip">{user.email}</span>
      </p>
      <p>{user.phone}</p>
    </div>
  );
};

export default UserCard;
