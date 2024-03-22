import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../users/usersSlice";
import {AppDispatch} from "../app/store";

// export async function action({request}: {request: Request}) {
//     const formData = await request.formData()
//     const userCredential = Object.fromEntries(formData)
    // let response = await fetch('localhost:3000/user', {
    //     method: 'POST',
    //     body: JSON.stringify({email: userCredential.login, password: userCredential.password})
    //     })
    //
    // let userData:{ok: true | false; errors?: string; token?: any | undefined}
    //
    //     if (response.ok) {
    //         let data = await response.json()
    //         userData = JSON.parse(data)
    //         if (userData.ok) {
    //             let userToken = userData.token
    //
    //             return console.log('here we got token')
    //         } else {
    //             throw new Error(userData.errors)
    //         }
    //     }
    //     throw new Error("login error")
// }
export const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const handleLoginEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let userCredential = {
            email, password
        }
        dispatch(loginUser(userCredential))
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
                            type='number'
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
                            minLength={5}
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
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}