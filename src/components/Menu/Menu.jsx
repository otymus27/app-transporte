// src/config/menuConfig.js
import {
  People,
  Person,
  Inventory,
  Category,
  Assignment,
  AddCircleOutline,
  Search,
  BarChart,
} from '@mui/icons-material';

export const menuStructure = [
  {
    key: 'carros',
    icon: <People />,
    text: 'Carros',
    allowedRoles: ['ADMIN', 'GERENTE', 'BASIC'],
    children: [
      {
        text: 'Gerenciar',
        path: '/carro',
        icon: <AddCircleOutline />,
        allowedRoles: ['ADMIN', 'GERENTE', 'BASIC'],
      },
      {
        text: 'Consultar',
        path: '/carro/consultar',
        icon: <Search />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Relatório',
        path: '/carro/relatorio',
        icon: <BarChart />,
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    key: 'usuarios',
    icon: <Person />,
    text: 'Usuários',
    allowedRoles: ['ADMIN'],
    children: [
      {
        text: 'Gerenciar',
        path: '/usuarios',
        icon: <AddCircleOutline />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Consultar',
        path: '/usuarios/consultar',
        icon: <Search />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Relatório',
        path: '/usuarios/relatorio',
        icon: <BarChart />,
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    key: 'motoristas',
    icon: <Inventory />,
    text: 'Motoristas',
    allowedRoles: ['ADMIN', 'GERENTE'],
    children: [
      {
        text: 'Gerenciar',
        path: '/motorista',
        icon: <AddCircleOutline />,
        allowedRoles: ['ADMIN', 'GERENTE'],
      },
      {
        text: 'Consultar',
        path: '/motorista/consulta',
        icon: <Search />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Relatório',
        path: '/motorista/relatorio',
        icon: <BarChart />,
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    key: 'setores',
    icon: <Category />,
    text: 'Setores',
    allowedRoles: ['ADMIN', 'GERENTE'],
    children: [
      {
        text: 'Gerenciar',
        path: '/setor',
        icon: <AddCircleOutline />,
        allowedRoles: ['ADMIN', 'GERENTE'],
      },
      {
        text: 'Consultar',
        path: '/setor/consultar',
        icon: <Search />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Relatório',
        path: '/setor/relatorio',
        icon: <BarChart />,
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    key: 'solicitacoes',
    icon: <Assignment />,
    text: 'Solicitações',
    allowedRoles: ['ADMIN', 'GERENTE', 'BASIC'], // todos visualizam o menu
    children: [
      {
        text: 'Novo',
        path: '/solicitacao',
        icon: <AddCircleOutline />,
        allowedRoles: ['ADMIN', 'GERENTE', 'BASIC'],
      },
      {
        text: 'Consultar',
        path: '/solicitacao/consultar',
        icon: <Search />,
        allowedRoles: ['ADMIN'],
      },
      {
        text: 'Relatório',
        path: '/solicitacao/relatorio',
        icon: <BarChart />,
        allowedRoles: ['ADMIN'],
      },
    ],
  },
];
