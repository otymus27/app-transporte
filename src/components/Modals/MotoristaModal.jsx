import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

const MotoristaModal = ({
  open,
  onClose,
  selectedMotorista,
  formData,
  onFormChange,
  onSave,
  isLoading,
  user,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{selectedMotorista ? 'Editar Motorista' : 'Adicionar Novo Motorista'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nome}
          onChange={(e) => onFormChange('nome', e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="matricula"
          label="Matrícula"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.matricula}
          onChange={(e) => onFormChange('matricula', e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="telefone"
          label="Telefone"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.telefone}
          onChange={(e) => onFormChange('telefone', e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        {user.role === 'ADMIN' && (
          <Button variant="contained" onClick={onSave} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MotoristaModal;
