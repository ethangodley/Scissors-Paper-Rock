import "../App.css";
import { FaHandRock, FaHandPaper, FaHandScissors, FaHandLizard, FaHandSpock } from "react-icons/fa";
import { useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';

const actions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  // This should never really happen
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
    lizard: FaHandLizard,
    spock: FaHandSpock,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}

function ShowStreak({streak = 0}) {
  return <div>streak: {streak}</div>
}

function AddHighScore({highScore = 0}) {
  return (
    <div className="center">
      <h3 className="center">Would you like to add streak of {highScore} to high score?</h3>
      <Link to="/highScores" className="btn">Save</Link>
    </div>
  );
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState("");
  const [highScore, setHighScore] = useState("");

  
  let [Streak, setStreak] = useState(0);
  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
      setStreak(Streak + 1);
    } else if (newWinner === 1) {
      setHighScore(Streak);
      reactLocalStorage.set('Streak', Streak);
      setStreak(Streak = 0);
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div>
      <div className="center">
        <div className="right">
          <h2 className="streakText"><ShowStreak streak={Streak}/></h2>
        </div>
        <div className="container">
          <Player 
            name="Player" 
            score={playerScore} 
            action={playerAction} />
          <Player
            name="Computer"
            score={computerScore}
            action={computerAction}
          />
        </div>
        <ShowWinner winner={winner}/>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />
          <ActionButton action="lizard" onActionSelected={onActionSelected} />
          <ActionButton action="spock" onActionSelected={onActionSelected} />
        </div>
        <div>
          <AddHighScore highScore={highScore}/>
        </div>
      </div>
    </div>
  );
}

export default App;
