'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
  createTheme,
  useTheme,
  ThemeProvider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { User } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import useThemes from '@/app/hooks/useTheme';

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

  const themes = useThemes().theme;

  const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === 'light'
                ? 'rgb(254,255,244)' //random light yellow color for the background in light mode
                : '#000', //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: 'none', //customize typography styles for all buttons in table by default
            fontSize: '1.2rem',
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '1.1rem', //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme],
  );

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
                className='object-cover rounded-full h-1 w-full '
                src={row.original.image || '/user.png'}
                alt='avatar'
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

  useEffect(() => {
    setTableData(allUsers);
  }, [allUsers]);
  return (
    <>
      <div
        className={`min-h-screen ${
          themes === 'light' ? 'bg-color-white' : 'bg-color-dark'
        }`}
      >
        <ThemeProvider theme={tableTheme}>
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
            onEditingRowSave={handleSaveRowEdits}
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
                <Tooltip arrow placement='left' title='Edit'>
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='right' title='Delete'>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Example;
