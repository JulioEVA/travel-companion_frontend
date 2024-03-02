import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import useStyles from './HeaderStyles';
import Navigation from '../Navigation/Navigation';

type HeaderProps = {
  onLoad: (autocomplete: google.maps.places.Autocomplete | null) => void;
  onPlaceChanged: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoad, onPlaceChanged }) => {
  const classes = useStyles();

  return (
    <header>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h5' className={classes.title}>
            Travel Companion
          </Typography>
          <Box display='flex'>
            <Typography variant='h6'>Explore new places</Typography>
            <Navigation
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              classes={classes}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
