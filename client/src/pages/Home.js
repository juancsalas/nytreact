import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Home extends Component {
  state = {
    articles: [],
    title: "",
    date: "",
    url: "",
    searchTerm: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data.response.docs, title: "", date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//   Does the NYTimes API seatch
  handleFormSubmit = event => {
    event.preventDefault();
    API.getArticles(this.state.searchTerm)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  //Add button handleSaveArticle to each article in order to save it
  handleSaveArticle = event => {
    event.preventDefault();
    if (this.state.title && this.state.date) {
      API.saveArticle({
        title: this.state.title,
        date: this.state.date,
        url: this.state.url
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
        <Container fluid>
        <Row>
        <Jumbotron>
            <h1>What Books Should I Read?</h1>
        </Jumbotron>
        <form>
            <Input
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            name="searchTerm"
            placeholder="Search Term (required)"
            />
            <Input
            value={this.state.startYear}
            onChange={this.handleInputChange}
            name="startYear"
            placeholder="Start Year (Optional):"
            />
            <TextArea
            value={this.state.endYear}
            onChange={this.handleInputChange}
            name="endYear"
            placeholder="End Year (Optional):"
            />
            <FormBtn
            disabled={!(this.state.searchTerm)}
            onClick={this.handleFormSubmit}
            >
            Search
            </FormBtn>
        </form>
        {this.state.articles.length ? (
            <List>
            {this.state.articles.map(articles => (
              <ListItem key={articles._id}>
                  <h1>{articles.headline.print_headline}</h1>
                  <p>{articles.lead_paragraph}</p>
                  <p>Publication Date: {articles.pub_date}</p>
                  <a href={articles.web_url}>Link</a>
                </ListItem>
            ))}
            </List>
        ) : (
            <h3>No Results to Display</h3>
        )}
        </Row>
        </Container>
    );
  }
}

export default Home;
