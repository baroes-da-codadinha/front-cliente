/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { post } from '../../services/ApiClient';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import './styles.css';
import Snackbar from '../Snackbar';
import InputTexto from '../InputTexto';

export default function ModalEndereco({ abrirEndereco, setAbrirEndereco }) {
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
            {abrirEndereco && (
                <div className="modal">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="base n-produto padded">
                            <img
                                className="fechar"
                                src={IconFechar}
                                alt='fechar'
                                onClick={() => setAbrirEndereco(false)} />
                            <div className="cart-titulo">
                                <img src={IconCart} alt='carrinho' />
                                Adicionar Endereço
                            </div>
                            <div className="coloca-um-gapizinho topzera">
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

                            </div>
                            <button
                                className="aceitar centraliza topzera"
                                type="submit">
                                Adicionar endereço</button>
                        </div>
                    </form>
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
