import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';

const destinosDisponiveis = [
  'Centro Administrativo',
  'HRS',
  'HBDF',
  'HRT',
  'HRBZ',
  'Secretaria de Educação',
  'Delegacia',
  'Fórum',
  'Aeroporto',
  'Rodoviária',
];

const SolicitacaoModal = ({
  open,
  onClose,
  selectedSolicitacao,
  onSave,
  isLoading,
  user,
  motoristas = [],
  setores = [],
  carros = [],
  formData,
  setFormData,
}) => {
  const dataAtual = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  const isEditMode = Boolean(selectedSolicitacao);

  useEffect(() => {
    if (!open) return;

    console.log('selectedSolicitacao:', selectedSolicitacao);

    if (selectedSolicitacao) {
      setFormData({
        idMotorista: selectedSolicitacao.idMotorista || '',
        idSetor: selectedSolicitacao.idSetor || '',
        idCarro: selectedSolicitacao.idCarro || '',
        destino: selectedSolicitacao.destino || '',
        dataSolicitacao: selectedSolicitacao.dataSolicitacao || dataAtual,
        status: selectedSolicitacao.status || 'PENDENTE',
      });
    } else {
      setFormData({
        idMotorista: '',
        idSetor: '',
        idCarro: '',
        destino: '',
        dataSolicitacao: dataAtual,
        status: 'PENDENTE',
      });
    }
  }, [open, selectedSolicitacao]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = () => {
    const payload = {
      idMotorista: formData.idMotorista,
      idSetor: formData.idSetor,
      idCarro: formData.idCarro,
      destino: formData.destino,
      dataSolicitacao: formData.dataSolicitacao,
      status: formData.status || 'PENDENTE',
    };

    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Editar Solicitação' : 'Nova Solicitação'}</DialogTitle>

      <DialogContent>
        <TextField label="Usuário" value={user?.nome || ''} fullWidth margin="dense" variant="outlined" disabled />

        <FormControl fullWidth margin="dense" required>
          <InputLabel id="motorista-label">Motorista</InputLabel>
          <Select
            labelId="motorista-label"
            value={formData.idMotorista}
            onChange={handleChange('idMotorista')}
            label="Motorista"
          >
            <MenuItem value="">Selecione o motorista</MenuItem>
            {motoristas.map(({ id, nome }) => (
              <MenuItem key={id} value={id}>
                {nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense" required>
          <InputLabel id="setor-label">Setor</InputLabel>
          <Select labelId="setor-label" value={formData.idSetor} onChange={handleChange('idSetor')} label="Setor">
            <MenuItem value="">Selecione o setor</MenuItem>
            {setores.map(({ id, nome }) => (
              <MenuItem key={id} value={id}>
                {nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense" required>
          <InputLabel id="carro-label">Carro</InputLabel>
          <Select labelId="carro-label" value={formData.idCarro} onChange={handleChange('idCarro')} label="Carro">
            <MenuItem value="">Selecione o carro</MenuItem>
            {carros.map(({ id, marca, modelo, placa }) => (
              <MenuItem key={id} value={id}>
                {`${marca} ${modelo} (${placa})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense" required>
          <InputLabel id="destino-label">Destino</InputLabel>
          <Select labelId="destino-label" value={formData.destino} onChange={handleChange('destino')} label="Destino">
            {destinosDisponiveis.map((destino) => (
              <MenuItem key={destino} value={destino}>
                {destino}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Data da Solicitação"
          type="date"
          value={formData.dataSolicitacao}
          fullWidth
          margin="dense"
          variant="outlined"
          disabled
        />

        {isEditMode && (
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="status-label">Status</InputLabel>
            <Select labelId="status-label" value={formData.status} onChange={handleChange('status')} label="Status">
              <MenuItem value="PENDENTE">PENDENTE</MenuItem>
              <MenuItem value="APROVADO">APROVADO</MenuItem>
              <MenuItem value="REPROVADO">REPROVADO</MenuItem>
              <MenuItem value="CANCELADO">CANCELADO</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SolicitacaoModal;
