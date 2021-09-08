import "../../styles/Card.scss";

import React from "react";

interface CardProps {
    name: string
}

export const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
    return (
        <div className="card">
            <span>Hello {props.name}</span>
        </div>
    );
}
