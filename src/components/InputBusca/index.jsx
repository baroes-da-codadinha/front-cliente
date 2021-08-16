import React from 'react';
import './styles.css';

export default function InputBusca({
  placeholder, value, setValue, array, setArray
}) {
  function selecionarItem(item) {
    setValue('')
    setArray([]);
  }
  return (
    <div className="flex-column input-search">
      <input
        id="text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && array.length > 0 && (
        <div className="search-box">
          {array.map(item => (
            <div
              className="search-itens"
              onClick={() => selecionarItem(item)}
            >
              {item.nome}
            </div>
          ))}
        </div>)
      }
    </div>
  );
}
