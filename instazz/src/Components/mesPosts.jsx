import React, { Component } from 'react';
import Post from './post.jsx'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/**
 * Component to handle mesPosts page
 */
export default class MesPosts extends Component{
    state = {
        posts: [],
        loading: true,
        nbPerPage: 4,
        currentPage: 1,
        nbPost: 0
    }

    //recover all the post of the connected user
    //not used anymore
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

    //get a page of post
    getPostsByPage = async () => {
        try {
            console.log("currentPage" + this.state.currentPage)
            let body = {
                page: this.state.currentPage,
                per_page: this.state.nbPerPage
            }
            const access_token = localStorage.getItem("token");
            let idAuteur = localStorage.getItem("id")
            let url = 'http://localhost:5000/api/v1/posts/page/' + idAuteur
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                params: body
            };
            let res = await axios(options);
            var posts = this.state.posts;
            posts = posts.concat(res.data.result)
            this.setState({
                posts: posts,
                loading: false,
                currentPage: this.state.currentPage + 1
            });
        } catch (err) {
            console.log(err)
        }
    };

    //get the total number of posts
    getNumberPostsToDisplay = async () => {
        try {
            const access_token = localStorage.getItem("token");
            let idAuteur = localStorage.getItem("id")
            let url = 'http://localhost:5000/api/v1/posts/countForUser/' + idAuteur
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            this.setState({
                nbPage: Math.ceil(res.data.count / this.state.nbPerPage),
                nbPost: res.data.count
            });
        } catch (err) {
            console.log(err)
        }
    }

    //update the post
    update = () => {
        this.getPosts();
    }

    componentDidMount() {
        this.getNumberPostsToDisplay();
        this.getPostsByPage();      
    }

    //compare two element by the key
    //not used anymore
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    //sort post by the key
    //not used anymore
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
            if (this.state.nbPost === 0) {
                content = <div>Aucun posts enregistrés</div>;
            } else {
                content = (
                    this.state.posts.map(
                        post =>
                            <Grid item xs={12} sm={6} key={post._id}>
                                <Post key={post._id} Post={post} delete={true} updateParent={this.update} ></Post>
                            </Grid>

                    ))
                var displayMore;
                if (!this.state.loading && this.state.currentPage <= this.state.nbPage) {
                    displayMore = <Typography component="p">
                        <br></br>
                        <button onClick={this.getPostsByPage} type="button" className="App-button">Afficher plus</button>
                    </Typography>
                }
            }
        }           

        return (

            <div>
                <div className="App-ban">
                    <h1>Mes posts</h1>
                </div>
                <div className="App-corps-diapo">
                    <Grid container className="App-grid-post">
                        {content}
                        {displayMore}
                    </Grid>
                </div>
            </div>
        )
    }
}


