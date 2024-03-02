import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

import useStyles from './HeaderStyles';
import { Coordinates } from '../App/App';
import Navigation from '../Navigation/Navigation';

type HeaderProps = {
  setCoordinates: (coordinates: Coordinates) => void;
};

const Header: React.FC<HeaderProps> = ({ onLoad, onPlaceChanged }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete | null) =>
    setAutocomplete(autocomplete);

  const onPlaceChanged = () => {
    if (autocomplete === undefined || autocomplete === null) return;
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setCoordinates({ lat, lng });
  };

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
