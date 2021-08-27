/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';

export default function Carrinho({ restaurante, abrirCart, setAbrirCart, carrinho, setAbrirEndereco }) {
  const [mensagem, setMensagem] = useState('');

  function irParaEndereco() {
    setAbrirEndereco(true);
    setAbrirCart(false);
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
              {false ? (
                <div>
                  <span className="txt-end-entrega">Endereco de entrega:</span>
                  <span className="text-endereco">(Aqui vai o endereço)</span>
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
              {carrinho.map((item) => (
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
          />
        </div>
      )}
    </>
  );
}
