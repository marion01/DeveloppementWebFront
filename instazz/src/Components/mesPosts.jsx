import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

export default class MesPosts extends Component{
    state = {
        posts: []
    }

    getPosts = () => {
        let idAuteur = localStorage.getItem("id")
        let url = 'http://localhost:5000/api/v1/posts/getPostsOfAutor/' + idAuteur
        axios.get(url)
            .then((res) => {
                var posts = res.data;
                this.setState({ posts: posts.doc });
                this.sortPostsBy('date');
            })
    }

    componentDidMount() {
        this.getPosts();
        console.log(this.state.posts)
        
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortPostsBy(key) {
        let arrayCopy = this.state.posts;
        arrayCopy.sort(this.compareBy(key));
        this.setState({ posts: arrayCopy });
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


