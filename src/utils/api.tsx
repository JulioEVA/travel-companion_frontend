import { Bounds } from 'google-map-react';

export const getPlacesData = async (
  type: string,
  sw: Bounds['sw'],
  ne: Bounds['ne']
) => {
  try {
    const response = await fetch(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${sw.lat}&bl_longitude=${sw.lng}&tr_longitude=${ne.lng}&tr_latitude=${ne.lat}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '2d4132a0d2msh46335e84430a537p16def1jsne49b0896c994',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
