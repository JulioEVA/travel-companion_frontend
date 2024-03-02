import axios from 'axios';
import { Bounds } from 'google-map-react';

export const getPlacesData = async (
  type: string,
  sw: Bounds['sw'],
  ne: Bounds['ne']
) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
