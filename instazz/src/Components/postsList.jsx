import React, { Component } from 'react';
import axios from 'axios';

export default class PostsList extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/posts/')
            .then((res) => {
                const posts = res.data;
                this.setState({ posts });
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                {this.state.posts.map(
                    post =>
                        <p key={post._id}>{post.texte}</p>
                )}
                </div>
        )
    }
}


