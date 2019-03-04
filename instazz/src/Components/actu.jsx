import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/*
 * Component to handle actuality page
 */
export default class Actu extends Component {

    // Variables for this component
    state = {
        // List of Posts
        posts: [],
        // If system is loading posts
        loading: true,
        // Number of posts page to show
        nbPage: '',
        // Number of posts per page
        nbPerPage: 8,
        // The current page
        currentPage: 1
    }

    /*
     * Get pages of posts
     */
    getPostsByPage = async () => {
        try {

            // The body request
            let body = {
                page: this.state.currentPage,
                per_page: this.state.nbPerPage
            }

            // Get the token
            const access_token = localStorage.getItem("token");

            // The url to call
            let url = 'http://localhost:5000/api/v1/posts/page/all'

            // The options of the call
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                params: body
            };

            // Call API and get results
            let res = await axios(options);

            // Get posts and display posts pages
            var posts = this.state.posts;
            posts = posts.concat(res.data.result)
            this.setState({
                posts: posts,
                loading: false,
                currentPage: this.state.currentPage + 1
            });

        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Get the total number of posts
     */
    getNumberPostsToDisplay = async () => {
        try {
            // Get token
            const access_token = localStorage.getItem("token");

            // The url of the call
            let url = 'http://localhost:5000/api/v1/posts/count/all'

            // The options of the call
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };

            // Call API and get results
            let res = await axios(options);
            this.setState({ nbPage: Math.ceil(res.data.count / this.state.nbPerPage) });

        } catch (err) {
            console.log(err)
        }
    }

    /*
     * Prepare component parameters before displaying it
     */
    componentDidMount() {
        this.getNumberPostsToDisplay();
        this.getPostsByPage();
    }

    /*
     * Display component
     */
    render() {

        // The content to render
        var content;

        // Display message when the data are loading to prevent user
        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else {

            // Set up a list of Grid corresponding to the posts
            content = (
                this.state.posts.map(
                    post =>
                        <Grid item xs={12} sm={6} key={post._id}>
                            <Post key={post._id} Post={post} delete={false}></Post>
                        </Grid>
                ))

            // Set up the button to get more posts
            var displayMore;

            if (this.state.currentPage <= this.state.nbPage) {
                displayMore = <Typography component="p">
                    <br></br>
                    <button onClick={this.getPostsByPage} type="button" className="App-button">Afficher plus</button>
                </Typography>
            }
        }

        // Return the result withs the posts and the button
        return (
            <div>
                <div className="App-ban">
                    <h1>Fil d'actualité</h1>
                </div>
                <div className="App-corps-diapo">
                    <Grid container className="App-grid-post">
                        {content}
                        {displayMore}
                    </Grid>
                </div>
            </div>
        );
    }
}


