import './ReviewCard.css'

export default function ReviewCard({userName,rating,comment}){
    return(
        <div className="reviewer-card">
            <p>{userName}</p>
            <p>{rating}</p>
            <p>{comment}</p>
        </div>
    )
}