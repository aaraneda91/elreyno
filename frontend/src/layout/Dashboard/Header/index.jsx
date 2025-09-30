import { useMemo } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// project imports
import HeaderContent from './HeaderContent';

import useConfig from 'hooks/useConfig';
import { useGetMenuMaster } from 'api/menu';
import { MenuOrientation, DRAWER_WIDTH, MINI_DRAWER_WIDTH } from 'config';
import { useNavigate } from 'react-router-dom';
// assets
import Button from '@mui/material/Button';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { menuOrientation } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  const navigate = useNavigate();

  // common header
  const mainHeader = (
    <Toolbar>
      <Button onClick={() => { navigate('/home'); }}>Home</Button>
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: '1px solid',
      borderBottomColor: 'divider',
      zIndex: 1200,
      width: isHorizontal
        ? '100%'
        : { xs: '100%', lg: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : `calc(100% - ${MINI_DRAWER_WIDTH}px)` }
    }
  };

  return (
    <>
        <AppBar>{mainHeader}</AppBar>
    </>
  );
}
