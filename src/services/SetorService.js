import { API } from '../services/api';

const API_URL = '/setor'; // Ajuste conforme sua configuração de backend

/**
 * Busca todos os setores.
 * Retorna um array com objetos setor.
 * Cada setor possui, por exemplo: { id, nome, descricao }.
 */
export const getSetores = async () => {
  try {
    const response = await API.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar setores:', error);
    throw error;
  }
};

/**
 * Busca setores de forma paginada.
 * @param {number} page - Número da página.
 * @param {number} size - Quantidade de registros por página.
 * Retorna um objeto com a estrutura: { content, totalPages, totalElements }.
 */
export const getSetoresPaginated = async (page, size) => {
  try {
    const response = await API.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar setores paginados:', error);
    throw error;
  }
};

/**
 * Adiciona um novo setor.
 * O objeto "setor" deve conter as propriedades necessárias, por exemplo:
 * { nome: 'Financeiro', descricao: 'Responsável pelas finanças' }
 */
export const addSetor = async (setor) => {
  try {
    const response = await API.post(API_URL, setor);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar setor:', error);
    throw error;
  }
};

/**
 * Atualiza um setor existente.
 * @param {number} id - ID do setor que será atualizado.
 * @param {Object} setor - Objeto com os dados atualizados do setor.
 */
export const updateSetor = async (id, setor) => {
  try {
    const response = await API.put(`${API_URL}/${id}`, setor);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar setor:', error);
    throw error;
  }
};

/**
 * Exclui um setor.
 * @param {number} id - ID do setor a ser excluído.
 */
export const deleteSetor = async (id) => {
  try {
    await API.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir setor:', error);
    throw error;
  }
};
