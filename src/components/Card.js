import "./Card.css";
export default function Card({id}) {

    return (
      <div className="card">
        <img src={"./img/cards/"+id+".jpg"} />
      </div>
    );
}