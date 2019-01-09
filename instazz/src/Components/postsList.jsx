import React, { Component } from 'react';
import axios from 'axios';

export default class PostsList extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log("testDebut");
        axios.get('http://localhost:5000/api/v1/posts/')
            .then((res) => {
                console.log("testDebutThen");
                const posts = res.data;
                this.setState({ posts });
                console.log(res);
                console.log(res.data);
                console.log("test");
            })
    }

    render() {
        return (
            <ul>
                {this.state.posts.map(
                    post =>
                        <li>{post.texte}</li>
                )}
            </ul>
        )
    }
}


