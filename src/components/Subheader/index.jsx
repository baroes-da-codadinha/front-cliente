import './styles.css';
import IconCifrao from '../../assets/cifrao-icon.svg'
import IconTempo from '../../assets/tempo-icon.svg'
import editarPreco from '../../functions/editarPreco';


export default function Subheader({ selecionado, setAbrirCart }) {
    const { valor_minimo_pedido: valorMinimo,
        tempo_entrega_minutos: tempoEntrega,
        descricao } = selecionado;

    return (
        <div className="sh-base">
            <button className="aceitar"
                onClick={() => setAbrirCart(true)}>
                Revisar Pedido
            </button>
            <div className="sh-detalhes">
                <div>
                    <img src={IconCifrao} alt="$" />
                    <b>Pedido Mínimo:</b> {valorMinimo && editarPreco(valorMinimo, true)}
                    <img src={IconTempo} alt="relógio" />
                    <b>Tempo de Entrega:</b> {tempoEntrega} min
                </div>
                <div>
                    {descricao}
                </div>
            </div>
        </div>
    )
}