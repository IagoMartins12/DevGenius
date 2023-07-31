'use client';

import React, { useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { User } from '@prisma/client';
import { usePanelUsers } from '@/app/hooks/customHooks/usePanelUsers';
import { useTheme } from 'next-themes';

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

const PanelUsers = ({ allUsers }: { allUsers: User[] }) => {
  const {
    columns,
    handleCancelRowEdits,
    handleDeleteRow,
    handleSaveRowEdits,
    tableData,
    setTableData,
  } = usePanelUsers();

  const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default:
              globalTheme.theme === 'light'
                ? '#fafafa' //random light yellow color for the background in light mode
                : '#010105', //pure black table in dark mode for fun
          },
          text: {
            primary: globalTheme.theme === 'light' ? '#1c1c1c' : '#fafafa', //pure black text in dark mode for fun
          },
        },
      }),
    [globalTheme],
  );

  useEffect(() => {
    setTableData(allUsers);
  }, [allUsers]);

  return (
    <>
      <div className={`min-h-screen`}>
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

export default PanelUsers;
