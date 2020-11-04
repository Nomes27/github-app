import { useEffect, useState } from 'react';

const SignIn = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*example of initialising empty array in state*/

    // const [arr, setArr] = useState([]);

    /*example of useEffect - this one will run if anything in props changes*/

    // useEffect(() => {
    //     console(log('hello'))
    // }, [props])

    // useEffect(() => {
    //     console.log('password updated');
    // }, [password])




    const updateUsername = (event) => {
        setUsername(event.target.value);
        // const newArr = [...arr, 'newvalue'];
        // setArr(newArr);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const submit = (event) => {
        event.preventDefault();
        console.log(username, password);
    }

    return (
        <div className="signin--wrapper">
            <form className="signin--form" action="">
                <input className="signin--input" type="text" placeholder="username..." onChange={updateUsername}/>
                <input className="signin--input" type="text" placeholder="password..." onChange={updatePassword}/>
                <button className="signin--btn" onClick={submit}>Login</button>
            </form>
        </div>
    )
}

export default SignIn;