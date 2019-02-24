import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

/**
 * Component to handle mesPosts page
 */
export default class MesPosts extends Component{
    state = {
        posts: [],
        loading: true
    }

    //recover all the post of the connected user
    getPosts = async () => {
        try {
            const access_token = localStorage.getItem("token");
            let idAuteur = localStorage.getItem("id")
            let url = 'http://localhost:5000/api/v1/posts/getPostsOfAutor/' + idAuteur
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            this.setState({ posts: res.data.doc });
            this.sortPostsBy('date');
            this.setState({ loading: false });
        } catch (err) {
            console.log(err)
        }
    };

    //update the post
    update = () => {
        this.getPosts();
    }

    componentDidMount() {
        this.getPosts();        
    }

    //compare two element by the key
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    //sort post by the key
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
                            <Post key={post._id} Post={post} delete={true} updateParent={this.update} ></Post>
                        </Grid>

                ))
        }
        return (

            <div>
                <div className="App-ban">
                    <h1>Mes posts</h1>
                </div>
                <div className="App-corps-diapo">
                    <Grid container className="App-grid-post">
                        {content}
                    </Grid>
                </div>
            </div>
        )
    }
}


