/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';

export default function Carrinho({ restaurante, abrirCart, setAbrirCart }) {

  const array = [
    {
      "id": 2,
      "restaurante_id": 3,
      "nome": "Produto do Rodrigo",
      "descricao": "",
      "preco": 10000,
      "ativo": true,
      "permite_observacoes": false,
      "url_imagem": "https://fhfmgjnasgrddtfwgquj.supabase.in/storage/v1/object/public/cubosfood/placeholders/produto.png"
    },
    {
      "id": 3,
      "restaurante_id": 3,
      "nome": "Outro produto do Rodrigo",
      "descricao": "",
      "preco": 40000,
      "ativo": true,
      "permite_observacoes": false,
      "url_imagem": "https://fhfmgjnasgrddtfwgquj.supabase.in/storage/v1/object/public/cubosfood/placeholders/produto.png"
    },]

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
                <div className="alerta-endereco">
                  Adicionar endereço
                </div>
              )}
            </div>
            <div className="txt-tempo">
              Tempo de Entrega: {restaurante.tempo_entrega_minutos}min
            </div>
            <div className="cartbox">
              {array.map((item) => (
              <div className="mini-card">
                <img src={item.url_imagem} alt={item.nome}/>

              </div>
              ))}
            </div>
          </div>
          <Snackbar
          />
        </div>
      )}
    </>
  );
}
