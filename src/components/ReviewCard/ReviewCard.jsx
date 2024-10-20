import "./ReviewCard.css";

export default function ReviewCard({ userName, review, rating, title }) {
  return (
    <div className="reviewer-card">
      <h5>{title}</h5>
      <p>
        <strong>{userName}</strong>
      </p>
      <p>{review}</p>
      <p>Rating: {rating} ★</p>
    </div>
  );
}
