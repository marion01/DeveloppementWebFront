import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default class Actu extends Component {
    state = {
        posts: [],
        loading: true
    }

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

    componentDidMount() {
        this.getPosts();
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

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
        }
        return (

            <div>
                <div className="App-ban">
                    <h1>Fil d'actualité</h1>
                </div>
                <div className="App-corps-diapo">
                    <Grid container className="App-grid-post">
                    {content}
                    </Grid>
                </div>
            </div>
        );
    }
}


