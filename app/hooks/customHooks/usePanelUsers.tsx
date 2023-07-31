'use client';

import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import {
  MaterialReactTableProps,
  MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { TablePerson } from '@/app/components/PanelUsers/PanelUsers';
import { useNavigate } from './useNavigate';

export const usePanelUsers = () => {
  const [tableData, setTableData] = useState<TablePerson[]>(() => []);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const { navigateToUrl } = useNavigate();

  const handleSaveRowEdits: MaterialReactTableProps<TablePerson>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        console.log(tableData[row.index]);
        setTableData([...tableData]);
        const object = {
          firstName: values.firstName as string,
          secondName: values.secondName as string,
          email: values.email as string,
          role: parseInt(values.role),
        };
        await axios.patch(`/api/account/${values.id}`, object);
        toast.success('Usuario alterado!');

        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<TablePerson>) => {
      console.log('row', row.original.id);
      if (!confirm(`Deletar a conta do usuario ${row.getValue('email')}?`)) {
        return;
      }
      await axios.delete(`/api/account/${row.original.id}`);
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      toast.success('Usuario deleteado!');
    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<TablePerson>,
    ): MRT_ColumnDef<TablePerson>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<TablePerson>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'image',
        header: 'Imagem',
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <div className='aspect-video w-12 h-12 relative'>
              <Image
                fill
                className='object-cover rounded-full cursor-pointer w-full '
                src={row.original.image || '/user.png'}
                alt='avatar'
                onClick={() => {
                  navigateToUrl('user', row.original.id);
                }}
              />
            </div>
          </Box>
        ),
      },
      {
        accessorKey: 'username',
        header: 'Nome de usuario',
      },
      {
        accessorKey: 'firstName',
        header: 'Primeiro nome',
      },
      {
        accessorKey: 'secondName',
        header: 'Segundo nome',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
        enableEditing: false,
      },
      {
        accessorKey: 'city',
        header: 'Cidade ',
        enableEditing: false,
      },
      {
        accessorKey: 'state',
        header: 'Estado',
        enableEditing: false,
      },
      {
        accessorKey: 'role',
        header: 'Cargo',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
    ],
    [],
  );

  return {
    tableData,
    setTableData,
    handleSaveRowEdits,
    columns,
    handleCancelRowEdits,
    handleDeleteRow,
  };
};
