import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const marcasDisponiveis = ['CHEVROLET', 'FIAT', 'FORD', 'HONDA', 'HYUNDAI', 'KIA', 'NISSAN', 'PEUGEUT', 'RENAULT', 'TOYOTA', 'VOLKSWAGEN'];
const modelosDisponiveis = {
  CHEVROLET: ['ONIX', 'Cruze', 'S10', 'Tracker', 'SPIN','Astra','Agile', 'COBALT'],
  FIAT: ['AMBULANCIA','DOBLO','FURGÃO','PALIO', 'ARGO', 'TORO', 'MOBI', 'STRADA'],
  FORD: ['Ka', 'Fiesta', 'Focus'],  
  HONDA: ['Civic', 'HR-V', 'Fit', 'City'],  
  HYUNDAI: ['HB20', 'Creta', 'i30'],
  KIA: ['Seltos', 'Sportage', 'Picanto'],
  NISSAN: ['Versa', 'Kicks', 'Sentra'], 
  PEUGEUT: ['208', '3008', '5008'],
  RENAULT: ['AMBULANCIA','SANDERO', 'CAPTUR', 'DUSTER','KWID','MASTER'],  
  TOYOTA: ['Corolla', 'Hilux', 'Yaris', 'RAV4'],
  VOLKSWAGEN: ['Gol', 'Polo', 'T-Cross'],
};

const CarroModal = ({
  open,
  onClose,
  selectedCarro,
  formData,
  onFormChange,
  onSave,
  isLoading,
  user,
}) => {
  const modelosParaMarcaSelecionada = modelosDisponiveis[formData.marca] || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{selectedCarro ? 'Editar Carro' : 'Adicionar Novo Carro'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="placa"
          label="Placa"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.placa}
          onChange={(e) => onFormChange('placa', e.target.value)}
          required
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="marca-label">Marca</InputLabel>
          <Select
            labelId="marca-label"
            value={formData.marca}
            onChange={(e) => {
              onFormChange('marca', e.target.value);
              onFormChange('modelo', ''); // Resetar modelo ao mudar a marca
            }}
            label="Marca"
            required
          >
            {marcasDisponiveis.map((marca) => (
              <MenuItem key={marca} value={marca}>
                {marca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense" disabled={!formData.marca}>
          <InputLabel id="modelo-label">Modelo</InputLabel>
          <Select
            labelId="modelo-label"
            value={formData.modelo}
            onChange={(e) => onFormChange('modelo', e.target.value)}
            label="Modelo"
            required
          >
            {modelosParaMarcaSelecionada.map((modelo) => (
              <MenuItem key={modelo} value={modelo}>
                {modelo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default CarroModal;
