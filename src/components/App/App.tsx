import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from '../../utils/api';

import Header from '../Header/Header';
import List, { Place } from '../List/List';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bounds = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
};

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [childClicked, setChildClicked] = useState<string | null>(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter(
      (place: Place) => place.rating > rating
    );

    setFilteredPlaces(filteredPlaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => {
    if (!bounds?.sw && !bounds?.ne) return;
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(
        data?.filter((place: Place) => place.name && place.num_reviews > 0)
      );
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Main>
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates as Coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>
      </Main>
      <Footer />
    </>
  );
};

export default App;
