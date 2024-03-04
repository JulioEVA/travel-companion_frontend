import React from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './LandingStyles';
import { InputBase } from '@material-ui/core';
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search';

type LandingProps = {
  onLoad: (autocomplete: google.maps.places.Autocomplete | null) => void;
  onPlaceChanged: () => void;
};

const Landing: React.FC<LandingProps> = ({ onLoad, onPlaceChanged }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handlePlaceChanged = () => {
    onPlaceChanged();
    navigate('/explore');
  };

  return (
    <section className={classes.container}>
      <div className={classes.flex}>
        <div className={classes.textCenter}>
          <h1 className={classes.title}>Discover New Travel Destinations</h1>
          <p className={classes.subTitle}>
            Explore travel places near your city
          </p>
        </div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Autocomplete>
      </div>
    </section>
  );
};

export default Landing;
