import React from "react";

//info from the db should fill the table
//examples are in there for now, but the username and score should corresponde to the first 10 items of the leaderboard collection on firestore

function LeaderBoard() {
  return <div className='leaderboard'>
  <h2 className='leaderboard--title'>Leaderboard</h2>
<table className='leaderboard--table'>
    <thead>
    <tr>
        <th>Position</th>
        <th>Username</th>
        <th>Score</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td className='leaderboard--position'>1</td>
        <td classname='leaderboard--username'>ilikequizzes</td>
        <td className='leaderboard--score'>500</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>2</td>
        <td classname='leaderboard--username'>notacat</td>
        <td className='leaderboard--score'>450</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>3</td>
        <td classname='leaderboard--username'>coolbean</td>
        <td className='leaderboard--score'>420</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>4</td>
        <td classname='leaderboard--username'>Quizmaster2020</td>
        <td className='leaderboard--score'>400</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>5</td>
        <td classname='leaderboard--username'>Fredo</td>
        <td className='leaderboard--score'>380</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>6</td>
        <td classname='leaderboard--username'>Sal10</td>
        <td className='leaderboard--score'>340</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>7</td>
        <td classname='leaderboard--username'>BillyBones</td>
        <td className='leaderboard--score'>340</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>8</td>
        <td classname='leaderboard--username'>smartypants</td>
        <td className='leaderboard--score'>300</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>9</td>
        <td classname='leaderboard--username'>jazzyapple</td>
        <td className='leaderboard--score'>280</td>
    </tr>
    <tr>
        <td className='leaderboard--position'>10</td>
        <td classname='leaderboard--username'>poppinfresh</td>
        <td className='leaderboard--score'>200</td>
    </tr>
    </tbody>
</table>
  </div>;


}

export default LeaderBoard;
