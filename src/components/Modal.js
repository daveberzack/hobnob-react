import "./Modal.css";
import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Button from "../components/Button";

export default function Modal() {

    const { modalData, setModalData } = useContext(GameContext);

    function handleClick(){
        if (modalData?.callback) modalData.callback();
        setModalData(null);
    }

    let classes = "modal-overlay";
    if (modalData?.isInactive) classes+=" inactive-modal-overlay";
    if (modalData?.isFullScreen) classes+=" full-modal-overlay";
    let styles = {};
    if (modalData?.verticalOffset) styles.top = modalData.verticalOffset;
    if (modalData) return (
        <div className={classes} style={styles}>
            <div className="modal">
                <h2>{modalData.title}</h2>
                {modalData.content}
                
                {modalData.buttonText && 
                    <div className="button-row">
                        <Button label={modalData.buttonText} onClick={handleClick} />
                    </div>
                }
                <img className="speech" src={`${process.env.PUBLIC_URL}/img/speech.gif`} alt={`speech bubble`} />
            </div>
            <img className="dave" src={`${process.env.PUBLIC_URL}/img/dave.png`} alt={`Dave`} />
        </div>
    );
}
