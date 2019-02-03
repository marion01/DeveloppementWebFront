import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

export default class MesPosts extends Component{
    state = {
        posts: []
    }

    componentDidMount() {
        let idAuteur = localStorage.getItem("id")
        let url = 'http://localhost:5000/api/v1/posts/getPostsOfAutor/' + idAuteur
        axios.get(url)
            .then((res) => {
                var posts = res.data;
                this.setState({ posts: posts.doc });
            })
    }

    render() {
        return (
            <div className="App-corps">
                <h1>Mes posts</h1>
                <div>
                    {this.state.posts.map(
                        post =>
                            <Post key={post._id} idPost={post._id}></Post>
                    )}
                </div>
            </div>
        )
    }
}


