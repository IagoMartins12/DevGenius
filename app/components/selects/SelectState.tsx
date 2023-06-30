import { useStates } from '@/app/hooks/useStates';
import { User } from '@prisma/client';
import { useState } from 'react';
import Select from 'react-select';

export const SelectState = ({
  onChange,
  user,
}: {
  onChange: (ev: any) => void;
  user: User | null;
}) => {
  const [selectedState, setSelectedState] = useState<string | null>(
    user?.state ? user.state : null,
  );

  const { states } = useStates();

  const statesOptions = states.map(state => ({
    value: state.id,
    label: state.nome,
  }));

  const selectedOptionEstado = statesOptions.find(
    e => e.label === selectedState,
  );

  const handleStateUpdate = (event: any) => {
    setSelectedState(event.label);
    const selectedUf = states.find(e => e.id === event.value)?.sigla;
    onChange(selectedUf);
  };

  return (
    <Select
      placeholder='Selecione um estado'
      options={statesOptions}
      value={selectedOptionEstado}
      onChange={handleStateUpdate}
      id='state'
    />
  );
};
