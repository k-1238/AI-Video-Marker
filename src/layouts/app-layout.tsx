import React from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GiArtificialHive,
  GiHamburgerMenu,
} from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import {
  MdOutlineOndemandVideo,
} from "react-icons/md";

type AppLayoutProps = {
  visibleDrawer?: boolean,
}

const AppLayout = ({
  visibleDrawer = true,
  children,
}: React.PropsWithChildren<AppLayoutProps>) => {
  const sideLink = [
    {
      name: 'All Videos',
      icon: <MdOutlineOndemandVideo size={32} />,
      href: '/app/allvideos'
    }, {
      name: "Dashboard",
      icon: <MdSpaceDashboard size={32} />,
      href: '/app/dashboard'
    }
  ];
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            paddingX: 2,
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <GiArtificialHive size={32} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              VidioGen.com
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                color="inherit"
              >
                <GiHamburgerMenu />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <GiArtificialHive size={32} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Video Editor
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton sx={{ p: 0 }}>
                  <Avatar src="/favicon.ico" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        {visibleDrawer && (
          <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Box
              sx={{
                padding: 2,
                overflow: 'auto',
              }}
            >
              <List>
                {sideLink.map((link) => (
                  <ListItem key={link.name} disablePadding>
                    <Link href={link.href} passHref>
                      <ListItemButton>
                        <ListItemIcon>
                          {link.icon}
                        </ListItemIcon>
                      <ListItemText primary={link.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Toolbar />
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout;
