import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import {registerLocale} from "react-datepicker" ; 
import ptBR from 'date-fns/locale/pt-BR' ; 

import lixo from "../imgs/trash.png"

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Relatorio.css'

import api from "../services/api";


export default function Relatorio (){
    const [pix, setPix] = useState(0);
    const [din, setDin] = useState(0);
    const [credito, setCredito] = useState(0);
    const [debito, setDebito] = useState(0);

    const [allVendas, setAllVendas] = useState([])

    registerLocale ( 'ptBR' ,  ptBR )


    async function getAllVendas(){
        const response = await api.get('/vendas');
        
        setAllVendas(response.data)
        if(response.data){
            getPag(response.data)
        }
    }   

    useEffect(()=>{
        getAllVendas()
    }, [])

    function getPag(vendas){
        vendas.map((venda)=>{
            if(venda.pagamentos[0].pix > 0){
                setPix(pix + venda.pagamentos[0].pix);
            }
            if(venda.pagamentos[0].dinheiro > 0){
                setDin(din + venda.pagamentos[0].dinheiro);
            }
            if(venda.pagamentos[0].credit > 0){
                setCredito(credito + venda.pagamentos[0].credit);
            }
            if(venda.pagamentos[0].debit > 0){
                setDebito(debito + venda.pagamentos[0].debit);
            }
        })
    }

    async function deletaVendas(id){
        const deletedVenda = await api.delete(`/vendas/${id}`);
        if(deletedVenda){
            setAllVendas(allVendas.filter(venda => venda._id !== id))
            alert('Venda Deletada Com Sucesso !!!')
        }
    }


    const boole = (valor) =>{
        if(valor % 1 === 0) {
            return valor + ",00"
        }else{
            return valor.toString().replace(".", ",") + "0"
        }
    }

    return(
        <div className="Relatorio">
            <nav className='navbar'>
                <a className='button-navbar' href="http://localhost:3000/">PDV (Ponto de Venda)</a>
                <a className='button-navbar' href="http://localhost:3000/produtos">Produtos</a>
            </nav>
            <div className="main">

                <div className="top-main">
                    <h1>Vendas</h1>          
                </div>

                <div className="container-pag">                    
                    <div className="box-pag">
                        <h2>Dinheiro :</h2>
                        <h2>{`${boole(din)}`}</h2>
                    </div>
                    <div className="box-pag">
                        <h2>Pix :</h2>
                        <h2>{`${boole(pix)}`}</h2>
                    </div>
                    <div className="box-pag">
                        <h2>Credito :</h2>
                        <h2>{`${boole(credito)}`}</h2>
                    </div>
                    <div className="box-pag">
                        <h2>Debito :</h2>
                        <h2>{`${boole(debito)}`}</h2>
                    </div>
                </div>

                <div className="container-vendas">
                    {allVendas.map(function(data){
                        return <div key={data._id} className="box-vendas">
                                    <img className="img-lixo" onClick={() => deletaVendas(data._id)} src={lixo}></img>
                                    <div className="left-box-page">
                                        <p>Data:</p>
                                        <p>Hora:</p>
                                        <p>Total:</p>
                                    </div>
                                    <div className="rigth-box-page">
                                        <p>{`${data.created_at.dia} / ${data.created_at.mes} / ${data.created_at.ano}`}</p>
                                        <p>{`${data.created_at.hora}`}</p>
                                        <p>{`${boole(data.pagamentos[0].total)}`}</p>
                                    </div>
                                </div>
                            })
                        }
                </div>
                
            </div>
        </div>
    )
}