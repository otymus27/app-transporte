import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Search, Home } from '@mui/icons-material';

const CarroSearch = ({
  searchTerm,
  handleSearchChange,
  handleGoHome,
  userRole,
  onAddCarro, // callback para adicionar novo carro
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
      <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquisar carros por placa, modelo ou marca..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {userRole === 'ADMIN' && (
        <Button variant="contained" color="primary" onClick={onAddCarro}>
          Adicionar Carro
        </Button>
      )}
      <Button variant="outlined" startIcon={<Home />} onClick={handleGoHome}>
        Início
      </Button>
    </Box>
  );
};

export default CarroSearch;
