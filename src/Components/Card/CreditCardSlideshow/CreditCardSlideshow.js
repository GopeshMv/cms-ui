import React, { useState, useRef, useEffect } from "react";
import "./CreditCardSlideshow.css";
import LeftSquareArrow from "../../../utils/svg/left_square_arrow.svg";
import RightSquareArrow from "../../../utils/svg/right_square_arrow.svg";

function CreditCardSlideshow({ children, passCardToParent }) {
    const scrollableDivRef = useRef(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState(children[0]?.props);
    
    useEffect(() => {
        setCurrentCard(children[currentCardIndex]?.props);
        // console.log(currentCard);
    }, [currentCardIndex]);

    
    var totalCards = 0;

    children.map(child => totalCards++);

    const scrollToCard = (direction) => {
        const cardViewportWidth = 426;
        if (direction == "left") {
            scrollableDivRef.current.scrollLeft = Math.ceil(scrollableDivRef.current.scrollLeft - cardViewportWidth);
            if (currentCardIndex != 0) {
                setCurrentCardIndex(currentCardIndex - 1);
            }
        } else if (direction == "right") {
            scrollableDivRef.current.scrollLeft = Math.ceil(scrollableDivRef.current.scrollLeft + cardViewportWidth);
            if (currentCardIndex != totalCards - 1) {
                setCurrentCardIndex(currentCardIndex + 1);
            }
        }
        // setCurrentCard(children[currentCardIndex]?.props);
        // passCardToParent(currentCard);
    };


    return (
        <div className="card-slideshow" onLoad={passCardToParent(currentCard)}>
            <div className="slide-prev" onClick={() => scrollToCard("left")}>
                <img src={LeftSquareArrow}></img>
            </div>
            <div className="slide-container" ref={scrollableDivRef} style={{}}>
                <div className="dummy-card"></div>
                {children}
                <div className="dummy-card"></div>
            </div>
            <div className="slide-next" onClick={() => scrollToCard("right")}>
                <img src={RightSquareArrow}></img>
            </div>
        </div>
    );
}

export default CreditCardSlideshow;