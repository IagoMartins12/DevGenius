import { useEffect, useState } from 'react';

export interface Region {
  id: number;
  sigla: string;
  nome: string;
}

export interface IState {
  id: number;
  sigla: string;
  nome: string;
  regiao: Region;
}

export const useStates = () => {
  const [states, setStates] = useState<IState[]>([]);

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(response => response.json())
      .then(data => setStates(data));
  }, []);

  return {
    states,
  };
};
