/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import useCart from '../../hooks/useCart';
import IconFechar from '../../assets/x.svg';
import IconCifrao from '../../assets/cifrao-icon.svg'
import IconTempo from '../../assets/tempo-icon.svg'
import editarPreco from '../../functions/editarPreco';
import Snackbar from '../Snackbar';

export default function Modal({ restaurante, produto, abrirModal, setAbrirModal }) {
  const [quantidade, setQuantidade] = useState(1)
  const [adicionado, setAdicionado] = useState(false)
  const { adicionarAoCarrinho } = useCart();

  function adicionarCarrinho() {
    const item = {
      restaurante_id: restaurante.id,
      id: produto.id,
      quantidade: quantidade,
    }
    adicionarAoCarrinho(item);
    setQuantidade(1);
    setAdicionado(true)
  }
  return (
    <>
      {abrirModal && (
        <div className="modal">
          <div className="base n-produto">
            <img
              className="fechar"
              src={IconFechar}
              alt='fechar'
              onClick={() => setAbrirModal(false)} />
            <div className="img-produto-modal"
              style={{ backgroundImage: `url('${produto.url_imagem}')` }}
            />
            <div className="logo-modal-borda">
              <img className="logo-modal"
                src={restaurante.url_imagem}
                alt={restaurante.nome} />
            </div>
            <div className="detalhes-produto">

              {adicionado ? (
                <div>
                  teste
                </div>
              ) : (<>
                <div className="nome-produto">{produto.nome}</div>
                <div className="dados-restaurante">
                  <img src={IconCifrao} alt="$" />
                  <b>Pedido Mínimo:</b> {restaurante && editarPreco(restaurante.valor_minimo_pedido, true)}
                  <img src={IconTempo} alt="relógio" />
                  <b>Tempo de Entrega:</b> {restaurante.tempo_entrega_minutos} min
                </div>
                <div className="dados-produto">
                  <div className="dados-coluna">
                    {produto.descricao}
                  </div>
                  <div className="dados-coluna">
                    <div className="preco-modal">
                      {produto && editarPreco(produto.preco, true)}
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
                    <button
                      className="aceitar"
                      onClick={() => adicionarCarrinho()}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              </>)}
              <div className="link-revisao">
                Ir para a revisão do pedido
              </div>
            </div>
          </div>
          <Snackbar
          />
        </div>
      )}
    </>
  );
}
