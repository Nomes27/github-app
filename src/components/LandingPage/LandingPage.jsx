import {useState} from 'react';

const LandingPage = () => {
    const [signUp, setSignUp] = useState(false);

    const handleClick = (event) => {
        setSignUp(!signUp);
        event.target.innerText = signUp ? 'Back' : 'Sign Up';
        console.log(signUp);
    }
    
        return (
            <div>
                <div className="landing-page--graphic">
                    
                </div>
                <div className="landing-page--sign-in">

                </div>
                <div>
                    <button className="landing-page--modal-btn" onClick={handleClick}>Sign Up</button>
                </div>
            </div>
        )
    
}

export default LandingPage;