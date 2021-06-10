import './signIn.css'
import {  useState, useContext } from 'react'
import logo from '../../assets/logo.png'
import {AuthContext} from '../../contexts/auth'
import {Link} from 'react-router-dom'
function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {signIn, loadAuth} = useContext(AuthContext)


    function handleSubmit(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email, password)
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="logo Sistema" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@email.com"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                    <button type="submit">{loadAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>

                <Link to="/register">Crie uma conta</Link>
            </div>

        </div>
    );
}

export default SignIn;