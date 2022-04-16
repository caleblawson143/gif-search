import React from "react";

const Button = (props) => {
    return (
        <button
        type="input"
        className={props.className}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        >Search</button>
    )
}

export default Button;