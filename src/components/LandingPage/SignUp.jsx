import { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.taget.value);
    }

    const submit = (event) => {
        event.preventDefault();
        console.log(username, email, password);
    }


    return (
        <div className="signup--wrapper">
            <form className="signup--form" action="">
                <input className="signin--input" type="text" placeholder="Username..." />
                <input className="signin--input" type="text" placeholder="Email..." />
                <input className="signin--input" type="text" placeholder="Password..." />
                <button className="signin--btn">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;