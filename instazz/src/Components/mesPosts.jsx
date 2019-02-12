import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class MesPosts extends Component{
    state = {
        posts: []
    }

    componentDidMount() {
        var idAuteur = '5c361bc8f294d13124c2f950'
        var url = 'http://localhost:5000/api/v1/posts/getPostsOfAutor/' + idAuteur
        axios.get(url)
            .then((res) => {
                var posts = res.data;
                this.setState({ posts: posts.doc });
            })
    }

    render() {
        return (
            <div>
                <div className="App-ban">
                    <h1>Mes posts</h1>
                </div>
                <div className="App-corps-card">
                    <Paper className="App-paper" elevation={1}>
                        <div className="App-text-title">
                            {this.state.posts.map(
                                post =>
                                    <Post key={post._id} idPost={post._id}></Post>
                            )}
                        </div>

                    </Paper>
                </div>
            </div>
        );
    }
}


