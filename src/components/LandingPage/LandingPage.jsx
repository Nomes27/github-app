import {useEffect, useState} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LandingPage = () => {
    const [signUp, setSignUp] = useState(false);

    const handleClick = (event) => {
        setSignUp(!signUp);
    }
    
    
    console.log(signUp);
    
        return (
            <div className="landing-page--wrapper">
                <div className="landing-page--graphic">
                    
                </div>
                <div className="landing-page--sign-in">
                    {signUp ? <SignUp /> : <SignIn />}
                    <button className="landing-page--sign-in--modal-btn" onClick={handleClick}>{signUp ? 'Back' : 'Sign Up'}</button>
                </div>
            </div>
        )
    
}

export default LandingPage;