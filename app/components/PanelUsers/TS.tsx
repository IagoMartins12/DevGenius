'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { User } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export type Person = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TablePerson = Pick<
  User,
  | 'id'
  | 'image'
  | 'username'
  | 'firstName'
  | 'secondName'
  | 'email'
  | 'city'
  | 'state'
  | 'role'
>;

const Example = ({ allUsers }: { allUsers: User[] }) => {
  const [tableData, setTableData] = useState<TablePerson[]>(() => []);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  // const handleSaveRowEdits: MaterialReactTableProps<TablePerson>['onEditingRowSave'] =
  //   async ({ exitEditingMode, row, values }) => {
  //     if (!Object.keys(validationErrors).length) {
  //       tableData[row.index] = values;
  //       console.log(tableData[row.index]);
  //       //send/receive api updates here, then refetch or update local table data for re-render
  //       setTableData([...tableData]);
  //       exitEditingMode(); //required to exit editing mode and close modal
  //     }
  //   };

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

  // const getCommonEditTextFieldProps = useCallback(
  //   (
  //     cell: MRT_Cell<TablePerson>,
  //   ): MRT_ColumnDef<TablePerson>['muiTableBodyCellEditTextFieldProps'] => {
  //     return {
  //       error: !!validationErrors[cell.id],
  //       helperText: validationErrors[cell.id],
  //       onBlur: event => {
  //         const isValid =
  //           cell.column.id === 'email'
  //             ? validateEmail(event.target.value)
  //             : validateRequired(event.target.value);
  //         if (!isValid) {
  //           //set validation error for cell if invalid
  //           setValidationErrors({
  //             ...validationErrors,
  //             [cell.id]: `${cell.column.columnDef.header} is required`,
  //           });
  //         } else {
  //           //remove validation error for cell if valid
  //           delete validationErrors[cell.id];
  //           setValidationErrors({
  //             ...validationErrors,
  //           });
  //         }
  //       },
  //     };
  //   },
  //   [validationErrors],
  // );

  const columns = useMemo<MRT_ColumnDef<TablePerson>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'image',
        header: 'Imagem',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt='avatar'
              height={40}
              width={40}
              src={row.original.image || '/user.png'}
              loading='lazy'
              style={{ borderRadius: '50%' }}
            />
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
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        //   type: 'email',
        // }),
      },
      {
        accessorKey: 'city',
        header: 'Cidade ',
      },
      {
        accessorKey: 'state',
        header: 'Estado',
      },
      {
        accessorKey: 'role',
        header: 'Cargo',
      },
    ],
    [],
  );

  useEffect(() => {
    setTableData(allUsers);
  }, [allUsers]);
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode='modal' //default
        enableColumnOrdering
        enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip> */}
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

export default Example;
