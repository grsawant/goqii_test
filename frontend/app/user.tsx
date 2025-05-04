"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const columns: GridColDef<any>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (param) => (
        <IconButton href={`/users/${param.row.id}`}>
          <Edit color="warning" />
        </IconButton>
      ),
    },
];

const User = (props) => {
	return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
	)
}

export { User}
