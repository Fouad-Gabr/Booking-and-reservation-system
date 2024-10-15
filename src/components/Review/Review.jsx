import './Review.css'

export default function Review({userName,rating,comment}){
    return(
        <div className="reviewer-card">
            <p>{userName}</p>
            <p>{rating}</p>
            <p>{comment}</p>
        </div>
    )
}