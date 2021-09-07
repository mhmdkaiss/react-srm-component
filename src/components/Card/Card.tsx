import "./Card.scss";

import React from "react";

interface CardProps {
    name: string
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
    return (
        <div className="card">
            <span>Hello {props.name}</span>
        </div>
    );
}

export default Card;
