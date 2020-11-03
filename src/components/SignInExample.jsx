

// class SignInExample extends React.Component () {
//     state = {
//         username: '',
//         password: '',
//         arr: [],
//     }

//     componentDidMount () {
//         console(log('hello'))
//     }

//     componentDidUpdate (prevProps, prevState) {
//         console.log('it updated')
//     }

//     updateUsername = (event) => {
//         this.setState({username: event.target.value});
//     }

//     updatePassword = (event) => {
//         this.setState({password: event.target.value});
//     }

//     submit = (event) => {
//         event.preventDefault();
//         console.log(this.state.username, this.state.password);
//     }

//     render () {
//         return (
//             <div className="signin--wrapper">
//             <form action="">
//                 <input type="text" placeholder="username..." onChange={this.updateUsername}/>
//                 <input type="text" placeholder="password..." onChange={this.updatePassword}/>
//                 <button onClick={this.submit}>Login</button>
//             </form>
//         </div>
//         )
//     }
// }