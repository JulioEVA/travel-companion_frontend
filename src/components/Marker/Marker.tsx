import React from 'react';

interface MarkerProps {
  className: string;
  lat: number;
  lng: number;
  children: React.ReactNode;
}

const Marker = ({ lat, lng, children, className }: MarkerProps) => (
  <div className={className} {...{ lat, lng }}>
    {children}
  </div>
);

export default Marker;
