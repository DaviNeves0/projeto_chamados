
import { useState, useContext } from 'react'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'

function SignUp() {

    const [nome, setNome] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const {signUp, loadAuth} = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();
        signUp(email, password, nome);
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="logo Sistema" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar uma Conta</h1>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu Nome"/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@email.com"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                    <button type="submit">{loadAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>

                <Link to="/">Já tem uma conta ? Entre</Link>
            </div>

        </div>
    );
}

export default SignUp;