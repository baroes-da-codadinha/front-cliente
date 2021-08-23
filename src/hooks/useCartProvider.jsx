import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useCartProvider() {
  const [cartPersistido, setCartPersistido, removeCartPersistido] = useLocalStorage('CARRINHO', []);
  const [cart, setCart] = useState(cartPersistido);

  // eslint-disable-next-line no-shadow
  const adicionarAoCarrinho = (novoProduto) => {
    let carrinho = cart.length > 0 ? [...cart] : []
    carrinho.push(novoProduto)
    setCart(carrinho);
    setCartPersistido(carrinho);
  };

  const limparCarrinho = () => {
    setCart(null);
    setCartPersistido();
  };

  return {
    cart,
    adicionarAoCarrinho,
    limparCarrinho,
  };
}
