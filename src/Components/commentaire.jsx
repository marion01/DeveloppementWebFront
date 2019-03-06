import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';

/*
 * Component to handle commentary element
 */
export default class Commentaire extends Component {

    // Variables for this component
    state = {
        // The commentary message
        commentaire: '',
        // The commentary creation date
        nomDate: '',
        // The first letter of the author of the commentary
        firstLetterPseudo: ''
    };

    /*
     * Make the right format to display a date
     */
    displayDate = (dateISO) => {

        // Set up months name
        var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Sptembre", "Octobre", "Novembre", "Décembre"]

        // Split date parts
        let date = dateISO.split("T")[0].split("-")

        // Get hour of date and create the right format
        let dateHeure = dateISO.split("T")[1]
        if (dateHeure != null) {
            dateHeure = dateHeure.split(".")[0].split(":")
            dateHeure = " à " + dateHeure[0] + "h" + dateHeure[1] + ":" + dateHeure[2]
        }

        // Return the date sentence to display
        return "Le " + date[2] + " " + mois[parseInt(date[1])] + " " + date[0] + dateHeure
    }

    /*
     * Set up parameters usefull for this component before display it
     */
    componentDidMount() {
        // Get commentary infos
        let commentaire = this.props.Commentaire
        let date = this.displayDate(commentaire.date)
        let pseudo = commentaire.auteur.pseudo
        var nd = pseudo + " - " + date

        // Get it to component context
        this.setState({
            commentaire: commentaire,
            nomDate: nd,
            firstLetterPseudo: pseudo.charAt(0).toUpperCase()
        })
    }

    /*
     * Display the component
     */
    render() {
        return (
            <ListItem>
                <div className="App-Avatar-xl" ><div>{this.state.firstLetterPseudo}</div></div>
                <div className="App-div-comment">
                    <label className="App-title-date">{this.state.nomDate}</label>
                    <div className="App-comment"><p>{this.state.commentaire.commentaire}</p></div>
                </div>
            </ListItem>
        );
    }
}