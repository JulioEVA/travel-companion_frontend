/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, createRef } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

import useStyles from './ListStyles';
import Preloader from '../Preloader/Preloader';

export type Place = {
  latitude: number;
  longitude: number;
  rating: number;
  website: string | URL | undefined;
  web_url: string;
  phone: string;
  address: string;
  cuisine: { name: string }[];
  place_id: string;
  num_reviews: number;
  name: string;
  photo: {
    images: {
      large: {
        url: string;
      };
    };
  };
  ranking: number;
  price_level: number;
  awards: {
    display_name: string | undefined;
    year: number;
    award_type: string;
    images: {
      small: {
        url: string;
      };
    };
  }[];
};

type ListProps = {
  places: Place[];
  childClicked: string | null;
  isLoading: boolean;
  type: string;
  setType: (type: string) => void;
  rating: number;
  setRating: (rating: number) => void;
};

const List: React.FC<ListProps> = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classses = useStyles();
  const [elemRefs, setElemRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill(undefined)
      .map((_, i) => elemRefs[i] || createRef());

    setElemRefs(refs);
  }, [places]);

  return (
    <div className={classses.container}>
      <Typography variant='h4'>
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <Preloader className={classses.loading}>
          <CircularProgress size='5rem' />
        </Preloader>
      ) : (
        <>
          <FormControl className={classses.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as string)}
            >
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classses.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value as number)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classses.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elemRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
