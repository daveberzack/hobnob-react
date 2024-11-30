import "./Button.css";

export default function Button({label, icon, onClick, isPlaceholder}) {

    let classes = "";
    if (isPlaceholder) classes += "placeholder";
    if (!icon) classes += " centered";
    return (
        <button onClick={onClick} className={classes}>
            {icon &&
                <img className="icon" src={`${process.env.PUBLIC_URL}/img/button/${icon}.png`} alt={label}/>
            }
            <h3>{label}</h3>
        </button>
    );
}