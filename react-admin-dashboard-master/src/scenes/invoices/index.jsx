import React, { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State to manage invoice data
  const [data, setData] = useState(mockDataInvoices);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "items",
      headerName: "Items Purchased",
      flex: 2,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleViewDetails(params.row.id)}
          color="primary"
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const handleDeleteSelected = () => {
    // Filter out the selected rows
    const newData = data.filter((row) => !selectionModel.includes(row.id));

    // Reassign IDs to ensure they are unique and sequential
    const updatedData = newData.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setData(updatedData);
    setSelectionModel([]); // Clear selection
  };

  const handleDetailsRedirect = () => {
    navigate("/details"); // Navigate to the detailed information page
  };

  const handleViewDetails = (id) => {
    navigate(`/person/${id}`); // Navigate to the detailed view of the specific person
  };

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box mb="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteSelected}
          disabled={selectionModel.length === 0}
        >
          Delete Selected
        </Button>
        <IconButton onClick={handleDetailsRedirect} color="primary">
          <InfoIcon />
        </IconButton>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
