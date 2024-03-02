import React from 'react';

import { Autocomplete } from '@react-google-maps/api';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

type NavigationProps = {
  onLoad: (autocomplete: google.maps.places.Autocomplete | null) => void;
  onPlaceChanged: () => void;
  classes: ClassNameMap;
};

const Navigation: React.FC<NavigationProps> = ({
  onLoad,
  onPlaceChanged,
  classes,
}) => {
  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
  );
};

export default Navigation;
