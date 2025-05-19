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

const headerStyle = {
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
};

const SolicitacaoList = ({
  paginatedSolicitacoes = [],
  isLoading = false,
  user = { role: '' },
  onEditSolicitacao,
  onDeleteSolicitacao,
  sortConfig = { field: '', order: 'asc' },
  onSortChange,
}) => {
  const renderSortIcon = (field) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.order === 'asc' ? (
      <ArrowUpIcon fontSize="small" aria-label="Ordenado ascendente" />
    ) : (
      <ArrowDownIcon fontSize="small" aria-label="Ordenado descendente" />
    );
  };

  const handleSortClick = (field) => {
    onSortChange(field);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress aria-label="Carregando solicitações" />
      </Box>
    );
  }

  if (paginatedSolicitacoes.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
        Nenhuma solicitação encontrada.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} aria-label="Lista de solicitações">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={headerStyle}
              onClick={() => handleSortClick('dataSolicitacao')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSortClick('dataSolicitacao')}
              aria-sort={
                sortConfig.field === 'dataSolicitacao'
                  ? sortConfig.order === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              Data da Solicitação {renderSortIcon('dataSolicitacao')}
            </TableCell>

            <TableCell
              sx={headerStyle}
              onClick={() => handleSortClick('destino')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSortClick('destino')}
              aria-sort={
                sortConfig.field === 'destino' ? (sortConfig.order === 'asc' ? 'ascending' : 'descending') : 'none'
              }
            >
              Destino {renderSortIcon('destino')}
            </TableCell>

            <TableCell
              sx={headerStyle}
              onClick={() => handleSortClick('status')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSortClick('status')}
              aria-sort={
                sortConfig.field === 'status' ? (sortConfig.order === 'asc' ? 'ascending' : 'descending') : 'none'
              }
            >
              Status {renderSortIcon('status')}
            </TableCell>

            <TableCell sx={{ fontWeight: 'bold' }}>Carro</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Motorista</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Setor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Usuário</TableCell>

            {user.role === 'ADMIN' && (
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                Ações
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedSolicitacoes.map((s) => {
            const dataFormatada = s.dataSolicitacao ? new Date(s.dataSolicitacao).toLocaleDateString() : '—';
            //const carroDesc = s.carro ? `${s.carro.marca} ${s.carro.modelo} (${s.carro.placa})` : '—';

            return (
              <TableRow key={s.id} hover tabIndex={-1}>
                <TableCell>{dataFormatada}</TableCell>
                <TableCell>{s.destino || '—'}</TableCell>
                <TableCell>{s.status || '—'}</TableCell>
                <TableCell>{s.placaCarro}</TableCell>
                <TableCell>{s.nomeMotorista || '—'}</TableCell>
                <TableCell>{s.nomeSetor || '—'}</TableCell>
                <TableCell>{s.nomeUsuario || '—'}</TableCell>

                {user.role === 'ADMIN' && (
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEditSolicitacao(s)}
                        aria-label={`Editar solicitação ${s.id}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDeleteSolicitacao(s.id)}
                        aria-label={`Excluir solicitação ${s.id}`}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SolicitacaoList;
