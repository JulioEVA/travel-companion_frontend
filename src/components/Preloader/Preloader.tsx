import React from 'react';

type PreloaderProps = {
  children: React.ReactNode;
  className: string;
};

const Preloader: React.FC<PreloaderProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Preloader;
