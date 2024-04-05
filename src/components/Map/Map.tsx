import React from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../vendor/mapStyles';
import useStyles from './MapStyles';
import { Coordinates, Bounds as ApiBounds } from '../App/App';
import { Place } from '../List/List';
import Marker from '../Marker/Marker';

type MapProps = {
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: ApiBounds) => void;
  setChildClicked: (child: string) => void;
  coordinates: Coordinates;
  places: Place[];
};

const Map: React.FC<MapProps> = ({
  setCoordinates,
  setBounds,
  setChildClicked,
  coordinates,
  places,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyAMOclBoa7qsstpYZA1o7htNdvpHjRw4-o',
        }}
        center={coordinates}
        defaultCenter={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({
            ne: e.marginBounds.ne as Coords,
            sw: e.marginBounds.sw as Coords,
          });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <Marker
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {isMobile ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant='subtitle2'
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place.name}
                />
                <Rating size='small' value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </Marker>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
