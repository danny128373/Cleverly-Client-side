import React from 'react'

export default function Searchbar(props) {
    return (
        <>
            <form>
                <fieldset>
                    <label htmlFor='search'>Search for Communities!</label>
                    <input type='text' id='search' name='search' ref={props.search} placeholder='Search communities'/>
                    <button type='submit' onClick={props.handleSearchSubmit}>Search</button>
                </fieldset>
            </form>
        </>
    )
}