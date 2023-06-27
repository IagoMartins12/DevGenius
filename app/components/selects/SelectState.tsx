import { useStates } from '@/app/hooks/useStates';
import { useState } from 'react';
import Select from 'react-select';

export const SelectState = ({ onChange }: { onChange: (ev: any) => void }) => {
  const { estados } = useStates();
  const [selectedEstado, setSelectedEstado] = useState<number | null>(null);

  const estadoOptions = estados.map(estado => ({
    value: estado.id,
    label: estado.nome,
  }));

  const selectedOptionEstado = estadoOptions.find(
    e => e.value === selectedEstado,
  );

  const handleEstadoUpdate = (event: any) => {
    setSelectedEstado(event.value);
    const selectedUf = estados.find(e => e.id === event.value)?.sigla;
    onChange(selectedUf);
  };

  return (
    <Select
      placeholder='Selecione um estado'
      options={estadoOptions}
      value={selectedOptionEstado}
      onChange={handleEstadoUpdate}
    />
  );
};
