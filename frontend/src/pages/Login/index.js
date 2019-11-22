import React, {useState} from 'react';
import api from '../../services/api'

import logo from '../../assets/logo.png'

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [passwordConfirm, setPasswordConfirm] = useState('');


    const [pageMode, setPageMode] = useState('login');

    async function handleSubmitLogin(e) {
        e.preventDefault();



        const response = await api.post('/login', {
        email
        });

        const { _id } = response.data;

        localStorage.setItem('user', _id);
        history.push('/dashboard');

    }

    async function handleSubmitRegister(e) {
        e.preventDefault();

        const response = await api.post('/register', {
        email
        });

        const { _id } = response.data;

        localStorage.setItem('user', _id);
        history.push('/dashboard');

    }

    return (
        <>
            <div className="logo">
                <img src={logo} alt="placeholder"/>
            </div>

            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong>
            </p>

            {pageMode == 'login'?
                (<>
                    <form onSubmit={handleSubmitLogin}>
                        <label htmlFor="email">E-MAIL *</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />

                        <label htmlFor="email">SENHA *</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <button className="btn" type="submit">Entrar</button>
                    </form>
                    <div className="loginMode" >
                        <a
                            href=""
                            onClick={event => {
                                event.preventDefault();
                                setPageMode('register');
                            }}
                        >Não possui uma conta? clique aqui para registrar.</a>
                    </div>
                </>)
                :
                (<>
                    <form onSubmit={handleSubmitRegister}>
                        <label htmlFor="email">E-MAIL *</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />

                        <label htmlFor="email">SENHA *</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <label htmlFor="email">CONFIRMAR SENHA *</label>
                        <input
                            id="password-confirm"
                            type="password"
                            placeholder="Confirme sua senha"
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                        />

                        <button className="btn" type="submit">Entrar</button>
                    </form>
                    <div className="loginMode" >
                        <a
                            href=""
                            onClick={event => {
                                event.preventDefault();
                                setPageMode('login');
                            }}
                        >Já possui uma conta? clique aqui para logar.</a>
                    </div>
                </>)
            }
        </>
    );
}