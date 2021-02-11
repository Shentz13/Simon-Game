import React, { useState } from 'react';
import Game from '../../components/Game/Game';
import './home.css';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import GameContext from '../../components/Game/GameContext/GameContext';

function Home() {

    // Hook & context pour gérer le lancement du jeu
    const [gameStatus, setGameStatus] = useState(0);
    const contextValue = {gameStatus, setGameStatus};

    // Paramètres du jeu. On pourrait imaginer un formulaire pour que l'utilisateur puisse les définir
    const minCasesFirstSequence = 3;
    const nbSequency = 5;
    const nbCases = 9;

    // Randomization séquence de jeu
    function Shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    let baseSequence = [0,1,2,3,4,5,6,7,8];
    Shuffle(baseSequence);

    let intermediaireArray = [];
    for(let a = 0; a < (nbSequency + minCasesFirstSequence - 1); a++){
        intermediaireArray[a] = baseSequence[a];
    }

    const sequency = intermediaireArray;

    const launch = () => {
        setGameStatus(1);
    }

    return (
        <GameContext.Provider value={contextValue}>
        <section>
            <div id="menu">
                <h1 className="text-green">SIMON</h1>
                <Button variant="contained" className="bg-green" onClick={launch}>PLAY</Button>
            </div>
            {gameStatus ? <Game status={gameStatus} sequency={sequency} nbsequency={nbSequency} nbcases={nbCases} /> : <div id="feedBack">
                <h1>Pour commencer, cliquez sur Play</h1></div>}
        </section>
        </GameContext.Provider>
    );
}

export default Home;