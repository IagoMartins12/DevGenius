import { useCitys } from '@/app/hooks/useCitys';
import Select from 'react-select';

export const SelectCity = ({ uf }: { uf: string }) => {
  const { cidades, loading: loadingCidades } = useCitys({
    uf,
  });

  const cidadeOptions = cidades.map(cidade => ({
    value: cidade.codigo_ibge,
    label: cidade.nome,
  }));

  return (
    <Select
      isLoading={loadingCidades}
      loadingMessage={() => 'Estamos carregando as cidades, aguarde ...'}
      isDisabled={loadingCidades || cidadeOptions.length === 0}
      options={cidadeOptions}
      placeholder='Selecione uma cidade'
    />
  );
};
