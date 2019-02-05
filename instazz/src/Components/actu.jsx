import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

export default class Actu extends Component{
    state = {
        posts: []
    }

    componentDidMount() {
        var url = 'http://localhost:5000/api/v1/posts';
        const access_token = localStorage.getItem("token");
        let headers= {
            Authorization: access_token,
            "Content-Type": "application/json"
        }
        axios.get(url, headers)
            .then((res) => {
                var posts = res.data;
                console.log(posts)
                this.setState({ posts: posts});
              //  this.sortBy('date');
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [this.state.posts];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ posts: arrayCopy });
    }

    render() {
        if (this.state.posts) {
            var posts = <div>
                {this.state.posts.map(
                    post =>
                        <Post key={post._id} Post={post}></Post>
                )}
            </div>
        }
        return (
            <div className="App-corps">
                <h1>Actu</h1>
                {posts}
            </div>
        )
    }
}


