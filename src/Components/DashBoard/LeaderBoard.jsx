import React from "react";

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
        <td>1</td>
        <td>ilikequizzes</td>
        <td>500</td>
    </tr>
    <tr>
        <td>2</td>
        <td>notacat</td>
        <td>450</td>
    </tr>
    <tr>
        <td>3</td>
        <td>coolbean</td>
        <td>420</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Quizmaster2020</td>
        <td>400</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Fredo</td>
        <td>380</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Sal10</td>
        <td>340</td>
    </tr>
    <tr>
        <td>7</td>
        <td>BillyBones</td>
        <td>340</td>
    </tr>
    <tr>
        <td>8</td>
        <td>smartypants</td>
        <td>300</td>
    </tr>
    <tr>
        <td>9</td>
        <td>jazzyapple</td>
        <td>280</td>
    </tr>
    <tr>
        <td>10</td>
        <td>poppinfresh</td>
        <td>200</td>
    </tr>
    </tbody>
</table>
  </div>;
}

export default LeaderBoard;
