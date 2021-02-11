import React, { useState, useEffect, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import './game.css';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert';
import gameContext from './GameContext/GameContext'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const Game = ({ status, sequency, nbsequency, nbcases }) => {

    const context = useContext(gameContext);
    console.log(sequency)

    const board = new Array(nbcases).fill('');
    const [responseCount, setResponseCount] = useState(0);

    const[caseC, setCaseC] = useState(new Array(nbcases).fill(''));

    const [compteur, setCompteur] = useState(0);

    const [chrono, setChrono] = useState(null);

    const [feedBack, setFeedBack] = useState(null);

    const [scores, setScores] = useState(null);

    const [dataPseudo, setDataPseudo] = useState(null);

    const getPseudo = (event) => {
        setDataPseudo(event.target.value);
    }

    const validResults = () => {

        console.log("test");
          const newScores = async () => {
            let result = await axios
              .post("https://localhost:8000/hall/of/fame/new", { pseudo: dataPseudo, score: 'vide' }
              );
            // return the result
            return result;
          };
        newScores();

        setFeedBack(
            <Alert variant="success">
                <p className="bold">Gagné, félicitations ! Voulez-vous rejouer?</p>
                <div className="buttonsContainer">
                    <Button onClick={reload}>OUI</Button>
                    <Button variant="contained">NON MERCI</Button>
                </div>
            </Alert>
        )
    }

    const reload = () => {

        context.setGameStatus(0);
    }

    const checkResponse = (event) => {

        if(compteur === sequency.length){
            console.log("id:",event.target.id);
            if(responseCount < sequency.length-1) {
                if(parseInt(event.target.id) !== sequency[responseCount]){
                    console.log(sequency[responseCount])
                    setFeedBack(                      
                            <Alert variant="danger">
                                <p className="bold">Perdu ! Voulez-vous retenter votre chance?</p>
                                <div className="buttonsContainer">
                                    <Button variant="contained" onClick={reload}>OUI</Button>
                                    <Button variant="contained">NON MERCI</Button>
                                </div>
                            </Alert>
                    );
                } else {
                    setResponseCount(previousCount => previousCount +1);
                }
            } else if (responseCount === sequency.length-1){
                if(parseInt(event.target.id) === sequency[responseCount]){
                    setFeedBack(
                        <Alert variant="success">
                            <p className="bold">Félicitations, vous avez gagné avec un temps de <span className="bold"></span></p>
                                <p>Saisissez votre pseudo pour entrer dans la légende :</p>
                                <form>
                                    <TextField required id="standard-required" label="Pseudo" defaultValue="invité" onChange={getPseudo} />
                                    <div className="buttonsContainer">
                                        <Button onClick={validResults} variant="contained">ENREGISTRER</Button>
                                    </div>
                                </form>
                        </Alert>    
                    );
                }
            }
        } else {
            setFeedBack(<Alert variant="danger">Attendez la fin de la séquence pour jouer, petit tricheur !</Alert>);
        }
        
    }

    const [buttonsState, setButtonsState] = useState(true);

        React.useEffect(() => {
            setTimeout(() => {
                if(compteur === sequency.length) {
                    return;
                } else {
                    setCaseC({...caseC, [sequency[compteur]] :'bg-animated'})
                    console.log("changement couleur sur case ",sequency[compteur]);
                    setCompteur(oldcount => oldcount +1);
                }      
            }, 1000)
        }, [compteur])

        

    function initGame() {
        if (status !== 0) {
            return (
                <div id="gameContainer">
                    <div className="feedBackCont">
                        {feedBack}
                        </div>
                        {chrono}
                    <div id="fadeCont">
                    <Fade left>
                        <div className="casesContainer" id="autoBoard">
                            {board.map((element, index) => {
                                return <div key={index} className={`case ${caseC[index]/*classnameColor[index].classColor*/}`}></div> 
                            })}
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="casesContainer" id="playerBoard">
                            {board.map((element, index) => {
                                return <Button key={index} id={index} className="case" onClick={checkResponse}></Button> 
                            })}
                        </div>
                    </Fade>
                    </div>
                </div>
            );
        } else {
            return <div id="feedBack">
                <h1>Pour commencer, cliquez sur Play</h1>
            </div>
        }

    }

    return (
        initGame()
    );
}

export default Game;