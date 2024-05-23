import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css'

import { api } from './services/api';

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState<CepData | null>(null)

  async function handleSearch() {
    if(input === '') {
      alert('Digite um CEP para pesquisar!')
      return
    }
  
    if (!/^\d+$/.test(input)) {
      alert('Digite apenas números no campo de busca!');
      setInput('')
      return;
    }

    try {
      const response = await api.get(`${input}/json/`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('CEP não encontrado')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
          type="text" 
          placeholder="Digite o seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {Object.keys(cep || {}).length > 0 && (
        <main className='main'>
          {cep ? (
            <>
              <h2>CEP: {cep.cep}</h2>
              <span>Rua {cep.logradouro}</span>
              <span>Complemento: {cep.complemento}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
            </>
          ) : (
              <h2>CEP não encontrado</h2>
          )}
        </main>       
      )}
    </div>
  );
}

export default App;
