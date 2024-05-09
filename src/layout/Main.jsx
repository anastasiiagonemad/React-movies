import React from 'react';
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

const API_KEY = process.env.REACT_APP_USER_TOKEN;

class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
    currentPage: 1,
    request: '',
  };

  componentDidMount() {
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=Harry Potter&page=1`,
    ).then((response) =>
      response
        .json()
        .then((data) => this.setState({ movies: data.Search, loading: false }))
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        }),
    );
  }

  searchMovies = (str, type = 'all') => {
    this.setState({ loading: true, request: str });
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== 'all' ? `&type=${type}` : ''
      }`,
    ).then((response) =>
      response
        .json()
        .then((data) => this.setState({ movies: data.Search, loading: false }))
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        }),
    );
  };

  loadMoreMovies = () => {
    const { request, currentPage } = this.state;
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${request}&page=${
        currentPage + 1
      }`,
    )
      .then((response) => response.json())
      .then((data) => {
        const newMovies = [...this.state.movies, ...data.Search];
        this.setState({
          movies: newMovies,
          loading: false,
          currentPage: currentPage + 1,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <main className="container content">
        <Search searchMovies={this.searchMovies} />
        {loading ? <Preloader /> : <Movies movies={movies} />}
        <a
          className="waves-effect light-green darken-1 btn btn-load"
          onClick={this.loadMoreMovies}
        >
          Load More
        </a>
      </main>
    );
  }
}

export { Main };
