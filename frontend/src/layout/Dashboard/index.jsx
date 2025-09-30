import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  if (menuMasterLoading) return <Loader />;

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ mt: 1 }} />
          <Container
            maxWidth={container ? 'xl' : false}
            sx={{
              ...(container && { px: { xs: 0, sm: 2 } }),
              position: 'relative',
              minHeight: 'calc(100vh - 110px)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {pathname !== '#!' && <Breadcrumbs />}
            <Outlet />
            <Footer />
          </Container>
        </Box>
      </Box>
    </AuthGuard>
  );
}
