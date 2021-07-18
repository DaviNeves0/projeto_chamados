
import './dashboard.css';
import Header from '../../components/Header'
import Title from '../../components/Title';
import Modal from '../../components/Modal';


import { FiMessageSquare,FiPlusCircle,FiSearch, FiEdit2 } from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {format} from 'date-fns';
import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';


const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    //modal
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState([]);

    useEffect(()=>{
        loadChamados();
        
        async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot);
        })
        .catch((error)=>{
            console.log(error);
            setLoadingMore(false);
        })
        setLoading(false);
    }
        return () =>{

        }
       
    }, []);


    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento

                })
            });

            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
            console.log(chamados)

        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

   async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot)
        })
    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal); //troca True para False
        setDetail(item);
    }

    if(loading){
        return(
           <div> 
            <Header/>
            <div className="content">
            <Title name="Dashboard">
                <FiMessageSquare size={25}/>
            </Title>
            <div className="container dashboard">
                <span>Buscando Chamados...</span>
            </div>
            </div>
            </div>
        )
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Dashboard">
                    <FiMessageSquare size={25}/>
                </Title>
                {chamados.length === 0 ? (
                    <div className='container dashboard'>
                        <span>Nenhuma chamado registrado...</span>
                        <Link to="/new" className="new">
                            <FiPlusCircle size={25} color={"#FFF"}/>
                            Novo Chamado
                        </Link>
                    </div>
                ): (
                    <>
                        <Link to="/new" className="new">
                            <FiPlusCircle size={25} color={"#FFF"}/>
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scape="col">Cliente</th>
                                    <th scape="col">Assunto</th>
                                    <th scape="col">Status</th>
                                    <th scape="col">Cadastrado em</th>
                                    <th scape="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                        <td data-label="Cliente">{item.cliente}</td>
                                        <td data-label="Assunto">{item.assunto}</td>
                                        <td data-label="Status">
                                            <span className="badge" style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                        </td>
                                        <td data-label="Cadastrado">{item.createdFormated}</td>
                                        <td data-label="#">
                                            <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => togglePostModal(item) }>
                                                <FiSearch color="#fff" size={17}/>
                                            </button>
                                            <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/new/${item.id}`}>
                                                <FiEdit2 color="#fff" size={17}/>
                                            </Link>
                                        </td>
                                    </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
                    </>
                )}
                
                
            </div>
            
            {showPostModal && (
                <Modal
                conteudo = {detail}
                close = {togglePostModal}
                />
            )}
           
        </div>
    )
}