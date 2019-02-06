import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';

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
            console.log("res data: "+res.data)
            this.setState({ posts: res.data });
            console.log("posts: "+this.state.posts)
            this.sortPostsBy('date');
            this.setState({ loading: false });
        } catch (err) {
            alert("erreur");
            console.log(err)
        }
    };

    componentDidMount() {
        this.getPosts();
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
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
            content = <div>
                {this.state.posts.map(
                    post =>
                        <Post key={post._id} Post={post}></Post>
                )}
            </div>
        }
        return (
            <div className="App-corps">
                <h1>Mes posts</h1>
                {content}
            </div>
        )
    }
}


