import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';

const MotoristasList = ({
  paginatedMotoristas,
  isLoading,
  user,
  onEditMotorista,
  onDeleteMotorista,
  sortConfig,
  onSortChange,
}) => {
  const renderSortIcon = (field) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.order === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />;
  };

  const handleSortClick = (field) => {
    onSortChange(field);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!paginatedMotoristas || paginatedMotoristas.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
        Nenhum motorista encontrado.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
              }}
              onClick={() => handleSortClick('nome')}
            >
              Nome
              {renderSortIcon('nome')}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
              }}
              onClick={() => handleSortClick('matricula')}
            >
              Matrícula
              {renderSortIcon('matricula')}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
              }}
              onClick={() => handleSortClick('telefone')}
            >
              Telefone
              {renderSortIcon('telefone')}
            </TableCell>
            {user.role === 'ADMIN' && <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedMotoristas.map((motorista) => (
            <TableRow key={motorista.id}>
              <TableCell>{motorista.nome}</TableCell>
              <TableCell>{motorista.matricula}</TableCell>
              <TableCell>{motorista.telefone}</TableCell>
              {user.role === 'ADMIN' && (
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" size="small" onClick={() => onEditMotorista(motorista)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => onDeleteMotorista(motorista.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MotoristasList;
