import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {

    console.log('props:', props)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const id = props.match.params.id;
    }, [props.savedList])

    const handleChange = e => {
        e.preventDefault()
    }

    const handleSubmit = e => {
        e.preventDefault()

    }

    

    return(
        <>
            <p>Update movie</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                    />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="string"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <button className="md-button form-button">Update</button>
            </form>
        </>
    )
}

export default UpdateForm;