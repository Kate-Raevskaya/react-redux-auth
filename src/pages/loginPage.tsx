import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../users/usersSlice";
import {AppDispatch} from "../app/store";

//for useSelector hook
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>


export const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {loading, error} = useSelector((state: IRootState) => state.users);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLoginEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let userCredential = {
            email, password
        }
        dispatch(loginUser(userCredential)).then((result) => {
            if(result.payload) {
                setEmail('')
                setPassword('')
                navigate('/')
            }
        })
    }

    return (
        <div id='login-page'>
            <div id ='login-card'>
                <h1>логин</h1>
                <form onSubmit={handleLoginEvent}>
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
                    <Link to={'/'}>Забыли пароль?</Link>
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
                        {loading? 'Загрузка...' : 'Войти'}
                    </button>
                    {error}
                </form>
            </div>
        </div>
    )
}