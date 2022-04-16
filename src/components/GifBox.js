import React from "react";

const GifBox = (props) => {
    
    return (
        <video autoPlay="on" loop className={props.className} onClick={props.onClick}>
            <source src={props.src}></source>
        </video>
    )
}

export default GifBox;



{/* <img
         src={props.src}
         className={props.className}
         id={props.id}
         onClick={props.onClick}
         ></img> */}