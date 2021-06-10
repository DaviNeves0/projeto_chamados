import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadAuth, setLoadAuth] = useState(false);
    const [load, setLoad] = useState(true);



    useEffect(() => {

        function loadStorage() {
            const storeUser = localStorage.getItem('SistemaUser');

            if (storeUser) {

                setUser(JSON.parse(storeUser));
                setLoad(false);
            }
            setLoad(false);
        }

        loadStorage();

    }, [])

    //fazendo login
    async function signIn(email, password) {
        setLoadAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadAuth(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadAuth(false);
            })
    }

    //cadastrando um usuário 
    async function signUp(email, password, nome) {
        setLoadAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadAuth(false);
                    })
            })
            .catch((error) => {
                console.log(error);
                setLoadAuth(false);
            })
    }

    //armazenar no localStore    
    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //sair da aplicação 
    async function singOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                load,
                signUp,
                singOut,
                signIn,
                loadAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;