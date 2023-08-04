import { useCitys } from '@/app/hooks/useCitys';
import { User } from '@prisma/client';
import Select from 'react-select';

export const SelectCity = ({
  uf,
  onChange,
  user,
}: {
  uf: string;
  onChange: (ev: any) => void;
  user: User | null;
}) => {
  const { citys, loading: loadingCitys } = useCitys({
    uf,
  });

  const citysOptions = citys.map(city => ({
    label: city.nome.charAt(0).toUpperCase() + city.nome.slice(1).toLowerCase(),
  }));

  const handleStateUpdate = (event: any) => {
    onChange(event.label);
  };

  const selectedCity = user?.city || null; // Verifica se o usuário tem uma cidade cadastrada

  return (
    <Select
      isLoading={loadingCitys}
      loadingMessage={() => 'Estamos carregando as cidades, aguarde...'}
      isDisabled={loadingCitys || citysOptions.length === 0}
      options={citysOptions}
      placeholder={selectedCity ? selectedCity : 'Selecione uma cidade'}
      onChange={handleStateUpdate}
      className='citys'
      id='city'
    />
  );
};
