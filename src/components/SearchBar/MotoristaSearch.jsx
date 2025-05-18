import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Search, Home } from '@mui/icons-material';

const MotoristaSearch = ({
  searchTerm,
  handleSearchChange,
  handleGoHome,
  userRole,
  onAddMotorista, // callback para adicionar novo motorista
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
      <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquisar motoristas por nome, matrícula ou telefone..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {userRole === 'ADMIN' && (
        <Button variant="contained" color="primary" onClick={onAddMotorista}>
          Adicionar Motorista
        </Button>
      )}
      <Button variant="outlined" startIcon={<Home />} onClick={handleGoHome}>
        Início
      </Button>
    </Box>
  );
};

export default MotoristaSearch;
