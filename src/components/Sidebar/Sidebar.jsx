import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  People,
  Person,
  Inventory,
  Category,
  Assignment,
  AssignmentReturn,
  AddCircleOutline,
  Search,
  BarChart,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleToggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const menuStructure = [
    {
      key: 'carros',
      icon: <People />,
      text: 'Carros',
      children: [
        { text: 'Gerenciar', path: '/carro', icon: <AddCircleOutline /> },
        { text: 'Consultar', path: '/carro/consultar', icon: <Search /> },
        { text: 'Relatório', path: '/carro/relatorio', icon: <BarChart /> },
      ],
    },
    {
      key: 'usuarios',
      icon: <Person />,
      text: 'Usuários',
      children: [
        { text: 'Gerenciar', path: '/usuarios', icon: <AddCircleOutline /> },
        { text: 'Consultar', path: '/usuarios/consultar', icon: <Search /> },
        { text: 'Relatório', path: '/usuarios/relatorio', icon: <BarChart /> },
      ],
    },
    {
      key: 'motoristas',
      icon: <Inventory />,
      text: 'Motoristas',
      children: [
        { text: 'Gerenciar', path: '/motorista', icon: <AddCircleOutline /> },
        { text: 'Consultas', path: '/motorista/consulta', icon: <Search /> },
        { text: 'Relatório', path: '/motorista/relatorio', icon: <BarChart /> },
      ],
    },
    {
      key: 'setores',
      icon: <Category />,
      text: 'Setores',
      children: [
        { text: 'Gerenciar', path: '/setor', icon: <AddCircleOutline /> },
        { text: 'Consultar', path: '/setor/consultar', icon: <Search /> },
        { text: 'Relatório', path: '/setor/relatorio', icon: <BarChart /> },
      ],      
    },
    {
      key: 'solicitacoes',
      icon: <Assignment />,
      text: 'Solicitações',
      children: [
        { text: 'Novo', path: '/solicitacao', icon: <AddCircleOutline /> },
        { text: 'Consultar', path: '/solicitacao/consultar', icon: <Search /> },
        { text: 'Relatório', path: '/solicitacao/relatorio', icon: <BarChart /> },
      ],
    },
    
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth, backgroundColor: theme.palette.background.paper, height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ m: 'auto' }}>
          Gerenciador
        </Typography>
      </Toolbar>
      <List>
        {menuStructure.map((menu) => (
          <React.Fragment key={menu.key}>
            <ListItemButton onClick={() => handleToggleMenu(menu.key)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
              {openMenus[menu.key] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMenus[menu.key]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.children.map((child) => (
                  <ListItemButton key={child.text} sx={{ pl: 4 }} onClick={() => handleNavigate(child.path)}>
                    <ListItemIcon>{child.icon}</ListItemIcon>
                    <ListItemText primary={child.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton onClick={() => setMobileOpen(true)} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;