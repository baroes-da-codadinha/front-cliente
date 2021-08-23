/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import IconCifrao from '../../assets/cifrao-icon.svg'
import IconTempo from '../../assets/tempo-icon.svg'
import editarPreco from '../../functions/editarPreco';
import Snackbar from '../Snackbar';

export default function Modal({ abrirModal, setAbrirModal }) {
  const [quantidade, setQuantidade] = useState(1)
  const produto = {
    id: 2,
    restaurante_id: 3,
    nome: "Produto do Rodrigo",
    descricao: "Isso é uma descrição mocada",
    preco: 10000,
    ativo: true,
    permite_observacoes: false,
    url_imagem: "https://fhfmgjnasgrddtfwgquj.supabase.in/storage/v1/object/public/cubosfood/placeholders/produto.png"
  }

  const restaurante = {
    "id": 1,
    "usuario_id": 1,
    "nome": "Noal Massas",
    "descricao": "",
    "categoria_id": 4,
    "taxa_entrega": 500,
    "tempo_entrega_minutos": 30,
    "valor_minimo_pedido": 1500,
    "url_imagem": "https://fhfmgjnasgrddtfwgquj.supabase.co/storage/v1/object/public/cubosfood/restaurantes/8426",
    "categoria": {
      "id": 4,
      "nome": "Massas",
      "url_imagem": "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg"
    }
  }


  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="img-produto-modal"
            style={{ backgroundImage: `url('${produto.url_imagem}')` }}
          />
          <div className="logo-modal-borda">
            <img className="logo-modal"
              src={restaurante.url_imagem}
              alt={restaurante.nome} />
          </div>
          <div className="detalhes-produto">
            <div className="nome-produto">{produto.nome}</div>
            <div className="dados-restaurante">
              <img src={IconCifrao} alt="$" />
              <b>Pedido Mínimo:</b> {editarPreco(restaurante.valor_minimo_pedido, true)}
              <img src={IconTempo} alt="relógio" />
              <b>Tempo de Entrega:</b> {restaurante.tempo_entrega_minutos} min
            </div>
            <div className="dados-produto">
              <div className="dados-coluna">
                {produto.descricao}
              </div>
              <div className="dados-coluna">
                <div className="preco-modal">
                  {editarPreco(produto.preco, true)}
                </div>
              </div>
            </div>
            <div className="dados-carrinho">
              <div className="quantidade-produto">
                <button
                  className="modal-special minus"
                  disabled={quantidade === 1 && true}
                  onClick={() => setQuantidade(quantidade - 1)}
                >
                  -
                </button>
                {quantidade}
                <button className="modal-special plus"
                  onClick={() => setQuantidade(quantidade + 1)}>
                  +
                </button>
                <button className="aceitar">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
            <div>
              (Ir para a revisão do pedido)
              Isso aqui será um link
            </div>
          </div>
        </div>
        <Snackbar
        />
      </div>
    </>
  );
}
