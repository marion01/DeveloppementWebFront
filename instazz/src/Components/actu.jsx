import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/**
 * Component to handle actuality page
 */
export default class Actu extends Component {
    state = {
        posts: [],
        loading: true,
        nbPage: '',
        nbPerPage: 4,
        currentPage: 1
    }

    //recover all the posts of all the users and sort them
    //not used anymore
    getPosts = async () => {
        try {
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/posts'
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            this.setState({ posts: res.data });
            this.sortPostsBy('date');
            this.setState({ loading: false });
        } catch (err) {
            console.log(err)
        }
    };

    //get a page of post
    getPostsByPage = async () => {
        try {
            let body = {
                page: this.state.currentPage,
                per_page: this.state.nbPerPage
            }
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/posts/page/all'
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                params: body
            };
            let res = await axios(options);
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

    //get the total number of posts
    getNumberPostsToDisplay = async () => {
        try {
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/posts/count/all'
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            this.setState({ nbPage: Math.ceil(res.data.count / this.state.nbPerPage) });
        } catch (err) {
            console.log(err)
        }
    }
    
    componentDidMount() {
        this.getNumberPostsToDisplay();
        this.getPostsByPage();
    }

    //compare two key
    //not used anymore
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    //sort posts by key
    //not used anymore
    sortPostsBy = (key) => {
        let arrayCopy = this.state.posts;
        arrayCopy.sort(this.compareBy(key));
        this.setState({ posts: arrayCopy });
    }

    render() {
        var content;
        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else {
            content = (
                this.state.posts.map(
                        post =>
                            <Grid item xs={12} sm={6} key={post._id}>
                                <Post key={post._id} Post={post} delete={false}></Post>
                            </Grid> 
                                               
                ))

            var displayMore;
            if (this.state.currentPage <= this.state.nbPage) {
                displayMore = <Typography component="p">
                    <br></br>
                    <button onClick={this.getPostsByPage} type="button" className="App-button">Afficher plus</button>
                </Typography>
            } 
        }

       

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


