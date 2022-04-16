import React from "react";

const GifBox = (props) => {
    
    return (
        <img
         src={props.src}
         className={props.className}
         id={props.id}
         onClick={props.onClick}
         ></img>
    )
}

export default GifBox;