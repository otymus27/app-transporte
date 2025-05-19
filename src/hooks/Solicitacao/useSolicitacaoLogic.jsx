import { useState, useEffect, useCallback } from 'react';
import {
  getSolicitacoes,
  addSolicitacao,
  updateSolicitacao,
  deleteSolicitacao,
} from '../../services/SolicitacaoService.js';
import useDebounce from '../../hooks/useDebounce.js';
import { getMotoristas } from '../../services/MotoristaService.js';
import { getSetores } from '../../services/SetorService.js';
import { getCarros } from '../../services/CarroService.js';

export const useSolicitacaoLogic = (user, fetchTrigger) => {
  const [allSolicitacoes, setAllSolicitacoes] = useState([]);
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [motoristas, setMotoristas] = useState([]);
  const [setores, setSetores] = useState([]);
  const [carros, setCarros] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
  const [formData, setFormData] = useState({
    idMotorista: '',
    idSetor: '',
    idCarro: '',
    destino: '',
    dataSolicitacao: new Date().toISOString().split('T')[0],
    status: 'PENDENTE',
    horaSaida: '',
    kmInicial: '',
    horaChegada: '',
    kmFinal: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchListas = useCallback(async () => {
    try {
      const [motoristasData, setoresData, carrosData] = await Promise.all([getMotoristas(), getSetores(), getCarros()]);
      setMotoristas(motoristasData);
      setSetores(setoresData);
      setCarros(carrosData);
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
      setNotification({
        open: true,
        message: 'Erro ao buscar dados auxiliares.',
        severity: 'error',
      });
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSolicitacoes();
      const processedData = data.map((s, index) => ({
        ...s,
        id: s.id || `generated-${index}`,
      }));
      setAllSolicitacoes(processedData);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      setNotification({
        open: true,
        message: 'Erro ao buscar solicitações.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchListas();
  }, [fetchData, fetchListas, fetchTrigger]);

  useEffect(() => {
    let currentData = [...allSolicitacoes];
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      currentData = allSolicitacoes.filter(
        (s) =>
          (s.titulo && s.titulo.toLowerCase().includes(term)) ||
          (s.descricao && s.descricao.toLowerCase().includes(term)) ||
          (s.status && s.status.toLowerCase().includes(term)),
      );
    }
    setFilteredSolicitacoes(currentData);
  }, [debouncedSearchTerm, allSolicitacoes]);

  const handleOpenModal = (solicitacao = null) => {
    setSelectedSolicitacao(solicitacao);
    setFormData(
      solicitacao
        ? {
            dataSolicitacao: solicitacao.dataSolicitacao || '',
            destino: solicitacao.destino || '',
            status: solicitacao.status || 'PENDENTE',
            idCarro: solicitacao.idCarro || '',
            idMotorista: solicitacao.idMotorista || '',
            idSetor: solicitacao.idSetor || '',
            horaSaida: solicitacao.horaSaida || '',
            kmInicial: solicitacao.kmInicial || '',
            horaChegada: solicitacao.horaChegada || '',
            kmFinal: solicitacao.kmFinal || '',
          }
        : {
            dataSolicitacao: new Date().toISOString().split('T')[0],
            destino: '',
            status: 'PENDENTE',
            idCarro: '',
            idMotorista: '',
            idSetor: '',
            horaSaida: '',
            kmInicial: '',
            horaChegada: '',
            kmFinal: '',
          },
    );
    setOpenModal(true);
  };

  useEffect(() => {
    if (!openModal) return;

    if (selectedSolicitacao) {
      setFormData({
        idMotorista: selectedSolicitacao.idMotorista || '',
        idSetor: selectedSolicitacao.idSetor || '',
        idCarro: selectedSolicitacao.idCarro || '',
        destino: selectedSolicitacao.destino || '',
        dataSolicitacao: selectedSolicitacao.dataSolicitacao || new Date().toISOString().split('T')[0],
        status: selectedSolicitacao.status || 'PENDENTE',
        horaSaida: selectedSolicitacao.horaSaida || '',
        kmInicial: selectedSolicitacao.kmInicial || '',
        horaChegada: selectedSolicitacao.horaChegada || '',
        kmFinal: selectedSolicitacao.kmFinal || '',
      });
    } else {
      setFormData({
        idMotorista: '',
        idSetor: '',
        idCarro: '',
        destino: '',
        dataSolicitacao: new Date().toISOString().split('T')[0],
        status: 'PENDENTE',
        horaSaida: '',
        kmInicial: '',
        horaChegada: '',
        kmFinal: '',
      });
    }
  }, [openModal, selectedSolicitacao]);

  const handleSave = async (dataToSend) => {
    if (!user || user.role !== 'ADMIN') {
      setNotification({
        open: true,
        message: 'Apenas administradores podem salvar solicitações.',
        severity: 'warning',
      });
      return;
    }

    setIsLoading(true);
    try {
      let responseMessage = '';
      if (selectedSolicitacao) {
        await updateSolicitacao(selectedSolicitacao.id, dataToSend);
        responseMessage = 'Solicitação atualizada com sucesso!';
      } else {
        await addSolicitacao(dataToSend);
        responseMessage = 'Solicitação adicionada com sucesso!';
      }

      setNotification({
        open: true,
        message: responseMessage,
        severity: 'success',
      });

      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error);
      setNotification({
        open: true,
        message: `Erro ao salvar solicitação: ${error.message || ''}`,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSolicitacao(null);
    setFormData({
      dataSolicitacao: new Date().toISOString().split('T')[0],
      destino: '',
      status: 'PENDENTE',
      idCarro: '',
      idMotorista: '',
      idSetor: '',
      horaSaida: '',
      kmInicial: '',
      horaChegada: '',
      kmFinal: '',
    });
    setSearchTerm('');
  };

  const handleDeleteSolicitacao = async (id) => {
    if (!user || user.role !== 'ADMIN') {
      setNotification({
        open: true,
        message: 'Apenas administradores podem excluir solicitações.',
        severity: 'warning',
      });
      return;
    }

    setIsLoading(true);
    try {
      await deleteSolicitacao(id);
      setNotification({
        open: true,
        message: 'Solicitação excluída com sucesso!',
        severity: 'success',
      });
      await fetchData();
    } catch (error) {
      console.error('Erro ao excluir solicitação:', error);
      setNotification({
        open: true,
        message: `Erro ao excluir solicitação: ${error.message || ''}`,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  return {
    allSolicitacoes,
    filteredSolicitacoes,
    searchTerm,
    isLoading,
    openModal,
    selectedSolicitacao,
    formData,
    notification,
    motoristas,
    setores,
    carros,

    setSearchTerm,
    setFormData,
    fetchData,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleDeleteSolicitacao,
    handleSearchChange,
    handleCloseNotification,
  };
};
