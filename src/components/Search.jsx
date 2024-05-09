import React from 'react';

class Search extends React.Component {
  state = {
    search: '',
    type: 'all',
  };

  handlekey = (e) => {
    if (e.key === 'Enter') {
      this.props.searchMovies(this.state.search, this.state.type);
    }
  };

  handleFilter = (e) => {
    this.setState(
      () => ({
        type: e.target.dataset.type,
      }),
      () => {
        this.props.searchMovies(this.state.type);
      },
    );
  };

  render() {
    return (
      <div className="row">
        <input
          placeholder="Search movies or series"
          type="search"
          className="validate"
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyDown={this.handlekey}
        />
        <button
          className="btn search-btn light-green darken-1"
          onClick={() =>
            this.props.searchMovies(this.state.search, this.state.type)
          }
        >
          Search
        </button>
        <div>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="all"
              checked={this.state.type === 'all'}
              onChange={this.handleFilter}
            />
            <span>All</span>
          </label>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="movie"
              checked={this.state.type === 'movie'}
              onChange={this.handleFilter}
            />
            <span>Movies only</span>
          </label>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="series"
              checked={this.state.type === 'series'}
              onChange={this.handleFilter}
            />
            <span>Series only</span>
          </label>
        </div>
      </div>
    );
  }
}

export { Search };
