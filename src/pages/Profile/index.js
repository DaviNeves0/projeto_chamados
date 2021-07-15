import './profile.css';
import { useState, useContext } from 'react'
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';
import { FiSettings, FiUpload } from 'react-icons/fi'

export default function Profile() {

    const { user, singOut, setUser,  storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imagemAvatar, setImageAvatar] = useState(null);

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`imagens/${currentUid}/${imagemAvatar.name}`)
        .put(imagemAvatar)
        .then(async ()=>{
            console.log('FOTO ENVIADA COM SUCESSO!');

            await firebase.storage().ref(`imagens/${currentUid}`)
            .child(imagemAvatar.name).getDownloadURL()
            .then(async(url)=>{
                let urlFoto = url;
                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl:urlFoto,
                    nome: nome
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome:nome
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    function handleFile(e){
        //console.log(e.target.files[0])
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'imagem/png'|| image.type === 'imagem/jpg' ){

                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))

            }else{
                alert('Envie uma imagem do tipo PNG ou JPEG');
                setAvatarUrl(null);
                return null;
            }
        }
    }

    async function handleSave(e){
       e.preventDefault();
        if (imagemAvatar === null && nome !== ''){
          await firebase.firestore().collection('users')
          .doc(user.uid)
          .update({
              nome:nome
          }) 
          .then(()=>{
            let data = {
                ...user, 
                nome: nome
            };
            setUser(data);
            storageUser(data);
          }) 
        }
        else if(nome !== '' && imagemAvatar !== null){
            handleUpload();
        }  
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>
                            <input type='file' accept="image/*" onChange={handleFile} /><br/>
                            {
                                avatarUrl === null ?
                                <img src={avatar} width='250' height='250' alt="foto de perfil do usuário"/>
                                :
                                <img src={avatarUrl} width='250' height='250' alt="foto de perfil do usuário"/>
                            }
                        </label>
                        
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        
                        <label>Email</label>
                        <input type="text" value={email} disabled={true}/>

                        <button type="submit">Salvar</button>            
                    </form>
                </div>
                <div className="container">
                            <button className="logout-btn" onClick={() => singOut()}>Sair</button>
                </div>
            </div>

        </div>
    );

}