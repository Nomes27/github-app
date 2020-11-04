import React from "react";

const QuizFriendsAndScores = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScore] = useState(0);


const setPlayers = () => {
  // add the usernames of the participating users from the db
}

const setScores = () => {
 // we need to update the running scores after each question 
}

useEffect(() => {
    // update the component when player names have been got from db
}, [players])

useEffect(() => {
    // update the scores in component after every question 
}, [scores])

    return (
        <div className="players">
            <h3>Running Scores</h3>

            {players.map((player) => {
            <div className='players--playercard'>
            <img className='players--img' src=''></img>
            <p className='players--name'>Username</p>
            <p>score value</p>
        </div>

        })}

        </div>
    )
}




export default QuizFriendsAndScores;
