import React, {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registrationUser} from "../users/usersSlice";
import {AppDispatch} from "../app/store";
import {IRootState} from "./loginPage";

export const RegistrationPage = () : React.ReactElement => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    let dispatch = useDispatch<AppDispatch>()
    const {loading, error} = useSelector((state: IRootState) => state.users)
    let navigate = useNavigate()


    const handleRegistrationEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== checkPassword) {
            setErrorPassword("Passwords don't match")
            console.log("don't match")
            return
        }
        let userCredential = {email, password}
        dispatch(registrationUser(userCredential)).then((result) => {
            if(result.payload) {
                setEmail('')
                setPassword('')
                setCheckPassword('')
                navigate('/account/image')
            }
        })
    }

    return (
        <div id='registration-page'>
            <div id='registration-card'>
                <h1>регистрация</h1>
                <form onSubmit={handleRegistrationEvent}>
                    <label>
                        Ваш телефон
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                            placeholder='+7...'
                            name='login'
                        />
                    </label>
                    <label>
                        Пароль
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='text'
                            name='password'
                            placeholder='5 and more symbols'
                            // minLength={5}
                        />
                    </label>
                    <label>
                        Повторите пароль
                        <input
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            type='text'
                            name='check-password'
                            placeholder='5 and more symbols'
                            // minLength={5}
                        />
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <p>
                            Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь с
                            <Link to={'/'}> Условиями соглашения! </Link>
                            Правилами и политикой конфиденциальности компании
                        </p>
                    </label>
                    <button
                        id='login-button'
                        type='submit'
                    >
                        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                    {error && <div>{error}</div>}
                </form>
                {errorPassword && <div>{errorPassword}</div>}
            </div>
        </div>
    )
}