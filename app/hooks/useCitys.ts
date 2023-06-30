import { useEffect, useState } from 'react';

export interface ICity {
  nome: string;
  codigo_ibge: string;
}

export const useCitys = ({ uf }: { uf: string }) => {
  const [citys, setCitys] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uf) return;

    setLoading(true);
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
      .then(response => response.json())
      .then(data => setCitys(data))
      .then(() => setLoading(false));
  }, [uf]);

  return {
    citys,
    loading,
  };
};
