import React from "react";

const SearchBox = (props) => {
    return (
        <input type='search'
        className='search-box'
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onKeyPress={props.onKeyPress}
        />
    )
}

export default SearchBox;