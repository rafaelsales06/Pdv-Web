import { useState , useEffect} from 'react';
import "../styles/Produtos.css";
import "../styles/App.css";

import api from "../services/api";

import lixeira from "../imgs/lixeira.png";
import lapis from "../imgs/lapis.png";

export default function Produtos(){

    const [id, setId] = useState('');
    const [name, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [codigo, setCodigo] = useState('');
    const [p_compra, setCompra] = useState('');
    const [p_venda, setVenda] = useState('');
    const [search, setSearch] = useState('');
    

    const [allProdutos, setAllProdutos] = useState([])

    async function getAllProdutos(){
        const response = await api.get('/produtos');
        
        setAllProdutos(response.data)
    }

    useEffect(()=>{
        getAllProdutos()
    }, [])

    useEffect(() => {
        function enableSubmitButton(){
            let btn = document.getElementById("add-button");
            btn.style.background = '#57a2f8'
            if(name && p_venda){
                btn.style.background = '#2484F4'
            }
        }
        enableSubmitButton()
    }, [name, p_venda]);


    async function handleSubmit(e){
        e.preventDefault();

        if(id){
            console.log('edit')
        }else{
            console.log('cadastro')
        }

        if(id){
            console.log(id)
            const response = await api.post(`/produtos/${id}`,{
                name,
                apelido,
                codigo,
                p_compra,
                p_venda
            }
            );
            getAllProdutos();

            setId('')
            setNome('');
            setApelido('');
            setCodigo('');
            setCompra('');
            setVenda('');
        }
        else{
            const response = await api.post('/produtos',{
                name,
                apelido,
                codigo,
                p_compra,
                p_venda
            }
            );
            setAllProdutos([...allProdutos, response.data]);
            setId('');
            setNome('');
            setApelido('');
            setCodigo('');
            setCompra('');
            setVenda('');
        }

    }
    
    async function editInf(e){    
        const response = await api.get('/produtos');
        const prods = response.data;

        console.log(prods)

        function confId(value){
            if(value._id === `${e}`){
                return value._id
            }   
        }

        let prod = prods.filter(confId)

        setId(prod[0]._id)
        document.getElementById('name').value = prod[0].name;
        setNome(prod[0].name);
        document.getElementById('apelido').value = prod[0].apelido;
        setApelido(prod[0].apelido);
        document.getElementById('codigo').value = prod[0].codigo;
        setCodigo(prod[0].codigo);
        document.getElementById('p_compra').value = prod[0].p_compra;
        setCompra(prod[0].p_compra);
        document.getElementById('p_venda').value = prod[0].p_venda;
        setVenda(prod[0].p_venda);

        
    } 
    
    async function removeInf(id){
        const deletedProd = await api.delete(`/produtos/${id}`);
        if(deletedProd){
            setAllProdutos(allProdutos.filter(produto => produto._id !== id))
        }
    }

    function searchProd(){
        console.log(search)
        setAllProdutos(allProdutos.filter(prod => prod.includes(search)))
    } 

    return(
        <div className='Produtos'>
            <nav className='navbar'>
                <a className='button-navbar' href="http://localhost:3000/">PDV (Ponto de Venda)</a>
                <a className='button-navbar' href="http://localhost:3000/relatorios">Relatorios</a>
            </nav>
            <form className="add-box" onSubmit={handleSubmit}>
                <div className='box-input'>
                    <label>Nome : </label>
                    <input 
                    id='name'
                    className='name-input' 
                    placeholder='Nome do Produto'
                    required
                    value={name}
                    onChange={e => setNome(e.target.value)}
                    >  
                    </input>
                </div>
                <div className='box-input'>
                    <label>Apelido : </label>
                    <input 
                    id='apelido'
                    className='name-input'
                    placeholder='Apelido do Produto'
                    value={apelido}
                    onChange={e => setApelido(e.target.value)}
                    ></input>
                </div>
                <div className='box-input'>
                    <label>Codigo : </label>
                    <input 
                    id='codigo'
                    className='name-input'
                    placeholder='8848454851458'
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    ></input>
                </div>
                <div className='box-input'>
                    <label>Preço de Compra : </label>
                    <input 
                    id='p_compra'
                    className='name-input'
                    placeholder='R$ 0,00'
                    value={p_compra}
                    onChange={e => setCompra(e.target.value)}
                    ></input>
                </div>
                <div className='box-input'>
                    <label>Preço de Venda : </label>
                    <input 
                    id='p_venda'
                    className='name-input'
                    placeholder='R$ 0,00'
                    required
                    value={p_venda}
                    onChange={e => setVenda(e.target.value)}
                    ></input>
                </div>
                <button type='submit' id='add-button' className='add-button'>SALVAR</button>
            </form>

            <div className='search-box'>
                <label>Pesquisar Produto : </label>
                <input onChange={e => setSearch(e.target.value)} className='input-search'></input>
                <button onClick={searchProd} className='search-button'>Pesquisar</button>
            </div>
                                    
            <div className='show-products'>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Apelido</th>
                            <th>Codigo</th>
                            <th>Valor de Compra</th>
                            <th>Valor de Venda</th>
                            <th>Editar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProdutos.map(function(data){
                            return <tr id={data._id} key={data._id}>
                                
                                    <td>{data.name}</td>
                                    <td>{data.apelido}</td>
                                    <td>{data.codigo}</td>
                                    <td>R$ {data.p_compra}</td>
                                    <td>R$ {data.p_venda}</td>
                                    <td onClick={() => {editInf(data._id)}}><img src={lapis}></img></td>
                                    <td onClick={() => removeInf(data._id)}><img  src={lixeira}></img></td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}