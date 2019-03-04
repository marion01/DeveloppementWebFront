import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/*
 * Component to handle mesPosts page
 */
export default class MesPosts extends Component {

    // Variables for the component
    state = {
        // List of posts
        posts: [],
        // If data are loading
        loading: true,
        // Number of posts per pages
        nbPerPage: 4,
        // Current page
        currentPage: 1,
        // Number of posts
        nbPost: 0
    }

    /*
     * Recover all the post of the connected user
     */
    getPosts = async () => {
        try {
            // Get token
            const access_token = localStorage.getItem("token");

            // Get Id author
            let idAuteur = localStorage.getItem("id")

            // Url of the call
            let url = 'http://localhost:5000/api/v1/posts/getPostsOfAutor/' + idAuteur

            // Options of the call
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
            this.setState({ posts: res.data.doc });
            this.sortPostsBy('date');
            this.setState({ loading: false });

        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Sort post by the key
     */
    sortPostsBy = (key) => {
        let arrayCopy = this.state.posts;
        arrayCopy.sort(this.compareBy(key));
        this.setState({ posts: arrayCopy });
    }

    /*
     * Compare two element by the key
     */
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    /*
     * Get a page of post
     */
    getPostsByPage = async () => {
        try {

            // Body for the call
            let body = {
                page: this.state.currentPage,
                per_page: this.state.nbPerPage
            }

            // Get token
            const access_token = localStorage.getItem("token");

            // Get id of the author
            let idAuteur = localStorage.getItem("id")

            // Url for the call
            let url = 'http://localhost:5000/api/v1/posts/page/' + idAuteur

            // Options for the call
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
            var posts = this.state.posts;

            // Set up posts pages
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

            // Get id of the author
            let idAuteur = localStorage.getItem("id")

            // Url for the call
            let url = 'http://localhost:5000/api/v1/posts/countForUser/' + idAuteur

            // Options for the call
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
            this.setState({
                nbPage: Math.ceil(res.data.count / this.state.nbPerPage),
                nbPost: res.data.count
            });
        } catch (err) {
            console.log(err)
        }
    }

    /*
     * Update the post
     */
    update = () => {
        this.getPosts();
    }

    /*
     * Set up parameters before displaying the component
     */
    componentDidMount() {
        this.getNumberPostsToDisplay();
        this.getPostsByPage();
    }

    /*
     * Display the component
     */
    render() {
        // Content variable
        var content;

        // If loading prevent the user
        if (this.state.loading) {
            content = <div>Loading...</div>;

            // Get all posts expected
        } else {
            if (this.state.nbPost === 0) {
                content = <div>Aucun posts enregistrés</div>;
            } else {
                content = (
                    this.state.posts.map(
                        post =>
                            <Grid item xs={12} sm={6} key={post._id}>
                                <Post key={post._id} Post={post} delete={true} updateParent={this.update} ></Post>
                            </Grid>
                    ))
                var displayMore;
                if (!this.state.loading && this.state.currentPage <= this.state.nbPage) {
                    displayMore = <Typography component="p">
                        <br></br>
                        <button onClick={this.getPostsByPage} type="button" className="App-button">Afficher plus</button>
                    </Typography>
                }
            }
        }

        // Return the displaying
        return (
            <div>
                <div className="App-ban">
                    <h1>Mes posts</h1>
                </div>
                <div className="App-corps-diapo">
                    <Grid container className="App-grid-post">
                        {content}
                        {displayMore}
                    </Grid>
                </div>
            </div>
        )
    }
}


