import { useState,useEffect } from 'react';
import "../styles/Pdv.css"
import certo from "../imgs/direito.png";
import errado from "../imgs/cruz.png";
import lapis from "../imgs/lapis.png";
import lixeira from "../imgs/lixeira.png";

import api from '../services/api';

function Pdv() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [produtoAtual, setProdutoAtual] = useState('');
    const [total, setTotal] = useState(0);
    const [totalpagamento, setTotalPagamento] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    //variaveis de pagamento
    const [credit, setCredit] = useState(0);
    const [debit, setDebit] = useState(0);
    const [pix, setPix] = useState(0);
    const [din, setDin] = useState(0);
  
    async function getAllProdutos(){
        const response = await api.get('/produtos');
        
        setProducts(response.data)

    }

    useEffect(()=>{
        getAllProdutos()
    }, [])

    useEffect(()=>{
        let tot = cart.reduce(getSum, 0);
        setTotal(tot);
        function getSum(tota, num) {
            return tota + num.value;
        }
    }, [cart])

    

    useEffect(()=>{
        let parsetotal = ( credit + debit ) + ( pix + din )
        setTotalPagamento(parsetotal)

        if(totalpagamento > total){
            document.getElementById('troco').innerText = `${totalpagamento - total}`
            document.getElementById('falta-pagar').innerText = '0'
        }
        if(totalpagamento < total){
            document.getElementById('falta-pagar').innerText = `${total - totalpagamento}`
            document.getElementById('troco').innerText = '0'
        }
        if(totalpagamento === total){
            document.getElementById('falta-pagar').innerText = '0'
            document.getElementById('troco').innerText = '0'
        }
    });

    async function criarVenda(){
            const produtos = cart;
            const pagamentos = [{
                credit : credit,
                debit : debit,
                pix : pix,
                dinheiro : din,
                total : total
            }]

            function formatDate(date, format) {
            //
            } 

            const response = await api.post(`/vendas`,{
                created_at : startDate, 
                produtos,
                pagamentos,
            }
            );
            console.log(response.data)
            
            if(response){
                alert('Venda Criada Com Sucesso !!!')
                setCart([])
                setCredit(0)
                setDebit(0)
                setPix(0)
                setDin(0)
                setTotal(0)
                setTotalPagamento(0)
                document.getElementById('credit-pay').value = ""
                document.getElementById('debit-pay').value = ""
                document.getElementById('pix-pay').value = ""
                document.getElementById('dinheiro-pay').value = ""
            }
    }

    const cancelarVenda = () =>{
        alert('Venda Cancelada Com Sucesso !!!')
        setCart([])
        setCredit(0)
        setDebit(0)
        setPix(0)
        setDin(0)
        setTotal(0)
        setTotalPagamento(0)
        document.getElementById('credit-pay').value = ""
        document.getElementById('debit-pay').value = ""
        document.getElementById('pix-pay').value = ""
        document.getElementById('dinheiro-pay').value = ""
    }

    const addNewProd = (id,name,qtd,value) => {
        return {
            _id: id,
            name: name,
            qtd: qtd,
            value: value,
        }
    }
  
    const addToCart = () => {
      // Adiciona um produto ao carrinho
      const prod = document.getElementsByClassName('search-input')[0];
      const qtd = document.getElementsByClassName('qtd-input')[0];
      setQuantidade(qtd.value)
  
      for(let i = 0; i <= products.length; i++){
        if(prod.value === products[i].name || prod.value === products[i].apelido || prod.value === products[i].codigo){
          setCart([...cart, addNewProd(products[i]._id, products[i].name, qtd.value , (products[i].p_venda * qtd.value))]);
          console.log(cart)
          setProdutoAtual(products[i].name);
          qtd.value = "";
          prod.value = "";
        }
      }
    };
  
    const removeFromCart = (productToRemove) => {
      // Remove um produto do carrinho
      setCart(cart.filter(product => product._id !== productToRemove));
    };
    
    return (
        <div className='Pdv'>
            <nav className='navbar'>
                <a className='button-navbar' href="http://localhost:3000/produtos">Produtos</a>
                <a className='button-navbar' href="http://localhost:3000/relatorios">Relatorios</a>
            </nav>
            <div className='box-pdv'>
                <div className='left-box'>
                    <div className='search-box'>
                        <h2>Produtos :</h2>
                        <input className='search-input' type={'search'}></input>
                        <input className='qtd-input' type='number'></input>
                        <button onClick={() => addToCart()} className='search-button'>Procurar</button>
                    </div>
                <div className="cart">
                    <h2>Cesta :</h2>
                    <div className='cart-container'>
                        <table className='cart-show'>
                            <thead>
                                <tr>
                                    <th className='table-title'>Itens</th>
                                    <th className='table-title'>Qtd</th>
                                    <th className='table-title'>Valor</th>
                                    <th className='table-title'>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(function(data){
                                    return <tr id={data._id} key={data.name}>
                                                <td>{data.name}</td>
                                                <td>{data.qtd}</td>
                                                <td>R$ {data.value}</td>
                                                <td onClick={() => removeFromCart(data._id)}><img src={lixeira}></img></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
                <div className='rigth-box'>
                    
                    <div className='payments'>
                        <div className='credit-payment'>
                        <h2>Credito :</h2>
                        <input id='credit-pay' className='credit-box' type='number' onChange={e => setCredit(parseInt(e.target.value))} placeholder='0,00'></input>
                        </div>
                        <div className='credit-payment'>
                        <h2>Debito :</h2>
                        <input id='debit-pay' className='credit-box' type='number' onChange={e => setDebit(parseInt(e.target.value))} placeholder='0,00'></input>
                        </div>
                        <div className='credit-payment'>
                        <h2>Pix :</h2>
                        <input id='pix-pay' className='credit-box' type='number' onChange={e => setPix(parseInt(e.target.value))} placeholder='0,00'></input>
                        </div>
                        <div className='credit-payment'>
                        <h2>Dinheiro :</h2>
                        <input id='dinheiro-pay' className='credit-box' type='number' onChange={e => setDin(parseInt(e.target.value))} placeholder='0,00'></input>
                        </div>
                    </div>

                    <div className='values-payment'>
                        <div><h3>Total: R$ {total}</h3><h3>Troco : R$ <span id='troco'>0,00</span></h3> <h3>Falta Pagar : R$ <span id='falta-pagar'>0,00</span></h3></div>
                    </div>

                    <div className='box-button'>
                        <img className='button-final' onClick={() => criarVenda()} src={certo}></img>
                        <img className='button-final' onClick={() => cancelarVenda()}src={errado}></img>
                    </div>
                </div>
           
            </div>
        </div>
    )
  }
  
  
  export default Pdv;
  