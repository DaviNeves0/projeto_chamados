import './modal.css'

import {FiX, FiTrash} from 'react-icons/fi'


export default function Moldal({conteudo, close, excluir}){

   
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={23} color="#FFF"/>
                    Voltar
                </button>
                
                <div>
                  <h2>Detalhes do Chamado</h2>
                  <div className="row">
                      <span>
                          Cliente: <a>{conteudo.cliente}</a>
                      </span>
                  </div>
                  <div className="row">
                      <span>
                          Assunto: <a>{conteudo.assunto}</a>
                      </span>
                      <span>
                          Cadastrado em: <a>{conteudo.createdFormated}</a>
                      </span>
                  </div>
                  <div className="row">
                      <span>
                          Status: <a style={{color:'#FFF', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</a>
                      </span>
                  </div>

                  {conteudo.complemento !== '' && (
                      <>
                        <h3>Complemento: </h3>
                        <p>{conteudo.complemento}</p>
                      </>
                  )}

                  <button className="btn-thrash" onClick={excluir}>
                    <FiTrash size={25} color="#FFF"/>
                    Excluir
                  </button>

                </div>
            </div>
        </div>
    )
}