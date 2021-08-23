/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { post } from '../../services/ApiClient';
import './styles.css';
import Carrinho from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';
import InputTexto from '../InputTexto';

export default function ModalEndereco({ abrirModalEndereco, setAbrirModalEndereco }) {
    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const history = useHistory();

    useEffect(() => {
        const { cep, endereco, complemento } = formState.errors;
        if (cep) {
            setMensagem({ texto: cep.message, status: 'erro' });
            setOpenSnack(true);
            return;
        }
        if (endereco) {
            setMensagem({ texto: endereco.message, status: 'erro' });
            setOpenSnack(true);
            return;
        }
        if (complemento) {
            setMensagem({ texto: complemento.message, status: 'erro' });
            setOpenSnack(true);
            return;
        }
    }, [formState])

    async function onSubmit(data) {
        try {
            const resposta = await post('endereco', data);
      
            if (!resposta.ok) {
              const msg = await resposta.json();
      
              setMensagem({ texto: msg, status: 'erro' });
              setOpenSnack(true);
              return;
            }
      
            history.push('/pedido');
          } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
            setOpenSnack(true);
          }
    }

    return (
        <>
            <div className="modal">
                <div>
                    <div>
                        <Carrinho />
                        <h3>Adicionar Endereço</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputTexto
                                label="CEP"
                                {...register('cep',
                                    { required: 'CEP é um campo obrigatório' })}
                            />
                            <InputTexto
                                label="Endereco"
                                {...register('endereco',
                                    { required: 'Nome é um campo obrigatório' })}
                            />
                            <InputTexto
                                label="Complemento"
                                {...register('complemento',
                                    { required: 'Complemento é um campo obrigatório' })}
                            />
                        </form>
                    </div>
                </div>
                <Snackbar
                    mensagem={mensagem}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            </div>
        </>
    );
}
