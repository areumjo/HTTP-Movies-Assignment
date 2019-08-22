import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {this.setState({ movie: res.data })})
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deletMovie = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        console.log(this.state.movie)
        const deletedArr = this.state.movie;
        // console.log(deletedArst(deletedArr)
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response));
  }

  render() {
    console.log(this.props.saved)
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button" onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}>
          Update
        </div>
        <div className="delete-button" onClick={this.deletMovie}>
          Delete
        </div>
      </div>
    );
  }
}
