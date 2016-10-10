import React, { Component } from 'react';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.props.onSearch;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.onSearch(event.target.value.trim());
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Search posts..." onChange={this.handleChange} />
        <button onClick={() => this.onSearch(this.state.value.trim())}>
          Search
        </button>
      </div>
    );
  }

}

export default SearchForm;
