import "./Card.css";
export default function Card({id}) {

    return (
      <div className="card">
        <img src={`${process.env.PUBLIC_URL}/img/cards/${id}.jpg`} alt="A colorful face"/>
      </div>
    );
}