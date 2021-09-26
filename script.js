class Joueur {
    nom;
    image;
    constructor(nom, image) {
        this.nom = nom;
        this.image = image;
    }
}


class Partie {
    joueurX = new Joueur("X", "images/imgx.png");
    joueurO = new Joueur("O", "images/imgo.png");

    //joueur actuel
    qui_joue;
    //nombre de cases joué
    casesJouer;
    //pour terminer la partie
    terminer;

    constructor() {
        this.qui_joue = this.joueurX;
        this.prochainJoueur(this.qui_joue);
        this.terminer = false;
        this.casesJouer = 0;
    }

    //changement de joueur
    changerJoueur(anciant_joueur) {
        if (anciant_joueur.nom === "X") {
            this.qui_joue = this.joueurO;
        } else {
            this.qui_joue = this.joueurX;
        }
        this.prochainJoueur(this.qui_joue);
    }

    //designe et contenu de la case du prochain joueur
    prochainJoueur(element) {
        document.getElementById("qui_joue").innerHTML = "Joueur " + element.nom;
        document.getElementsByTagName("img")[0].src = element.image;
        document.getElementById("qui_joue").className = element.nom;
    }

    //tester si il y a victoir du joueur courant
    testVictoir(element) {
        //verification des differentes possibilités de victoir
        if (this.verifierLignes(element)
            || this.verifierColonnes(element)
            || this.verifierDiagonals(element)) {
            //si victoir changement dans le DOM
            document.getElementById("gagnant").innerHTML = "Joueur " + element.nom + " à gagner";
            document.getElementById("gagnant").className = "gagnant";
            //pour terminer la partie
            this.terminer = true;
            return true;
        }
        return false;
    }
    //verification victoir par lignes
    verifierLignes(element) {
        for (let i = 1; i <= 3; i++) {
            let victoir = 0;
            for (let j = 1; j <= 3; j++) {
                if (document.getElementById("l" + i + "c" + j).innerHTML === element.nom) {
                    victoir++;
                }
            }
            if (victoir === 3) {
                for (let j = 1; j <= 3; j++) {
                    document.getElementById("l" + i + "c" + j).classList.add("effet_victoir");
                }

                document.getElementById("qui_joue").innerHTML = "";
                document.getElementById("qui_joue").className = "";

                return true;
            }
        }
        return false;
    }
    //verification victoir par colonnes
    verifierColonnes(element) {
        for (let i = 1; i <= 3; i++) {
            let victoir = 0;
            for (let j = 1; j <= 3; j++) {
                if (document.getElementById("l" + j + "c" + i).innerHTML === element.nom) {
                    victoir++;
                }
            }
            if (victoir === 3) {
                for (let j = 1; j <= 3; j++) {
                    document.getElementById("l" + j + "c" + i).classList.add("effet_victoir");
                }

                document.getElementById("qui_joue").innerHTML = "";
                document.getElementById("qui_joue").className = "";

                return true;
            }
        }
        return false;
    }
    //verification victoir par diagonales
    verifierDiagonals(element) {
        if (document.getElementById("l2c2").innerHTML === element.nom) {
            if ((document.getElementById("l1c1").innerHTML === element.nom)
                && (document.getElementById("l3c3").innerHTML === element.nom)) {

                document.getElementById("l2c2").classList.add("effet_victoir");
                document.getElementById("l1c1").classList.add("effet_victoir");
                document.getElementById("l3c3").classList.add("effet_victoir");

                document.getElementById("qui_joue").innerHTML = "";
                document.getElementById("qui_joue").className = "";

                return true;
            }

            if ((document.getElementById("l1c3").innerHTML === element.nom)
                && (document.getElementById("l3c1").innerHTML === element.nom)) {

                document.getElementById("l2c2").classList.add("effet_victoir");
                document.getElementById("l1c3").classList.add("effet_victoir");
                document.getElementById("l3c1").classList.add("effet_victoir");

                document.getElementById("qui_joue").innerHTML = "";
                document.getElementById("qui_joue").className = "";

                return true;
            }
        }
        return false;
    }

    //arreter la pertie si egalité, toutes les cases sont cocher
    arreterPartie() {
        document.getElementById("gagnant").innerHTML = "Partie nulle !!!";
        document.getElementsByTagName("img")[0].src = "images/imgnulle.png";
        document.getElementById("gagnant").className = "gagnant";
        this.terminer = true;
    }

}



let nouvellePartie = new Partie();


function jouer(element) {
    //verifier si la partie n'est pas deja terminer !!!!
    if (nouvellePartie.terminer === false) {

        //verifier si la case est vide !!!!
        if (element.innerHTML === "") {
            //remplissage de la case avec ajout de la class css correspondante
            element.innerHTML = nouvellePartie.qui_joue.nom;
            element.className = nouvellePartie.qui_joue.nom;

            nouvellePartie.casesJouer++;

            //test de victoir , sinon passer a l'autre joueur
            if (!nouvellePartie.testVictoir(nouvellePartie.qui_joue)) {
                //partie non gagner
                //changement de joueur
                nouvellePartie.changerJoueur(nouvellePartie.qui_joue);
            }

            //si une partie se termine par une egalité
            if (nouvellePartie.casesJouer === 9) {
                nouvellePartie.arreterPartie();
            }

            //si "case vide" enlever avertissement erreur
            siCaseVide(true);
        } else {
            //si "case NON vide" mettre avertissement erreur
            siCaseVide(false);
        }
    }
}

//Test des cas d'erreurs "case vide ou NON"
function siCaseVide(element) {
    if (element) {
        document.getElementById("erreur").innerHTML = "";
        document.getElementById("erreur").className = "";
    } else {
        document.getElementById("erreur").innerHTML = "Cochez une case vide !!";
        document.getElementById("erreur").className = "erreur";
    }
}
