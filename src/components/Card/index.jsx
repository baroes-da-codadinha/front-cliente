import React, { useState, useRef } from 'react';
import './styles.css';
import Snackbar from '../Snackbar';
import editarPreco from '../../functions/editarPreco';
import { del } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';

export default function Card({ restaurante, setModalEditarProduto, setProdutoEditado }) {
  const { token } = useAuth();

  const {
    id, nome, descricao, url_imagem: urlImagem,
  } = restaurante;
  const [editando, setEditando] = useState(false);

  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  return (
    <>
      <div style={{ position: 'relative' }}>
        {editando && (
          <div className="botoes-edicao">
            <button
              className="excluir"
              type="button"
            >
              Excluir produto do catálogo
            </button>
            <button
              className="aceitar"
              type="button"
              onClick={() => {
                setModalEditarProduto(true);
              }}
            >
              Editar produto
            </button>
          </div>
        )}
        <div
          className={editando ? 'card blur' : 'card'}
          onClick={() => setEditando(!editando)}
        >
          <div className="flex-column">
            <span className="card-titulo">{nome}</span>
            <span className="card-texto">{descricao}</span>
          </div>
          <div className="imagem-card">
            <img src={urlImagem} alt={nome} />
          </div>
        </div>
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </>
  );
}
