import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {

    const [movie, setMovie] = useState({})
    const id = props.match.params.id;

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data)
                setMovie(res.data);
            })
            .catch(err => console.log(err.response));
    }, [])

    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log('axios put: ', res);
                props.history.push(`/movies/${id}`)
            })
            .catch(err => console.log(err.response))
    }

    return(
        <>
            <p>Update movie</p>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="title"
                        value={movie.title}
                        />
                </label><br />
                <label>Director:
                    <input
                        type="text"
                        name="director"
                        onChange={handleChange}
                        placeholder="director"
                        value={movie.director}
                    />
                </label><br />
                <label>Metascore: 
                    <input
                        type="string"
                        name="metascore"
                        onChange={handleChange}
                        placeholder="metascore"
                        value={movie.metascore}
                    />
                </label><br />
                <button className="md-button form-button">Update</button>
            </form>
        </>
    )
}

export default UpdateForm;