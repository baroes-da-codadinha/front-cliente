/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { get, post } from '../../services/ApiClient';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';
import useCart from '../../hooks/useCart';

export default function Carrinho({ restaurante, abrirCart, setAbrirCart, carrinho, setAbrirEndereco }) {
  const { token } = useAuth();
  const { cart } = useCart();
  const [enderecoAdicionado, setEnderecoAdicionado] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  function irParaEndereco() {
    setAbrirEndereco(true);
    setAbrirCart(false);
  }

  async function encontrarEndereco() {
    try {
      const resposta = await get('endereco', token);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        setEnderecoAdicionado(false);
        return;
      }

      const lista = await resposta.json();
      setEndereco(lista);
      setEnderecoAdicionado(true);
      setOpenSnack(false);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
      setEnderecoAdicionado(false);
    }
  }

  useEffect(() => {
    encontrarEndereco()
  }, [abrirCart])

  async function confirmarPedido() {
    const pedido = {
      restaurante_id: restaurante.id,
      carrinho
    }

    try {
      const resposta = await post('pedido', pedido, token);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        setPedidoConfirmado(false);
        return;
      }

      setPedidoConfirmado(true);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  return (
    <>
      {abrirCart && (
        <div className="modal">
          <div className="base n-produto padded">
            <img
              className="fechar"
              src={IconFechar}
              alt='fechar'
              onClick={() => setAbrirCart(false)} />
            <div className="cart-titulo">
              <img src={IconCart} alt='carrinho' />
              {restaurante.nome}
            </div>
            <div className="area-endereco">
              {enderecoAdicionado ? (
                <div>
                  <span className="txt-end-entrega">Endereco de entrega:</span>
                  <span className="text-endereco">{endereco.endereco}, {endereco.complemento}, {endereco.cep}</span>
                </div>
              ) : (
                <div onClick={() => irParaEndereco()}
                  className="alerta-endereco">
                  Adicionar endereço
                </div>
              )}
            </div>
            <div className="txt-tempo">
              Tempo de Entrega: {restaurante.tempo_entrega_minutos}min
            </div>
            <div className="cartbox">
              {cart.map((item) => (
                <div className="mini-card">
                  <img src={item.url_imagem} alt={item.nome} />
                  <div className="mini-detalhes">
                    <div className="mini-nome">{item.nome}</div>
                    <div className="mini-quantidade">{item.quantidade} unidade{item.quantidade > 1 && "s"}</div>
                    <div className="mini-preco">{item && editarPreco(item.preco, true)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="fim-pedido">
              <div className="fim-subtotal">
                <div className="txt-fim">
                  Subtotal
                </div>
                <div className="txt-resto">
                  {restaurante && editarPreco(restaurante.taxa_entrega, true)}
                </div>
              </div>
              <div className="fim-taxa">
                <div className="txt-fim">
                  Taxa de entrega
                </div>
                <div className="txt-resto">
                  {restaurante && editarPreco(restaurante.taxa_entrega, true)}
                </div>
              </div>
              <div className="fim-total">
                <div className="txt-fim">
                  Total
                </div>
                <div className="txt-total">
                  {restaurante && editarPreco(restaurante.taxa_entrega, true)}
                </div>
              </div>
              <button className="aceitar">
                Confirmar pedido
              </button>
            </div>
          </div>
          <Snackbar
            mensagem={mensagem}
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
          />
        </div>
      )}
    </>
  );
}
