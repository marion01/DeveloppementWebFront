import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

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
                console.log(res.data);
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


