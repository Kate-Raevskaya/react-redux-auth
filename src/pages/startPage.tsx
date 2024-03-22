import {useNavigate} from "react-router-dom";
import React from "react";
export const StartPage = () : React.ReactElement => {
    let navigate = useNavigate()

    return (
        <div>
            <header>Выберите действие</header>
            <button
                id='login-button'
                onClick={() => navigate('login')}
            >
                Login
            </button>
            <button
                id='registration-button'
                onClick={() => navigate('registration')}
            >
                Registration
            </button>
        </div>
    )
}