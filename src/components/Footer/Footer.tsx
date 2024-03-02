import React from 'react';

import useStyles from './FooterStyles';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p>Julio Emmanuel Valenzuela Arredondo. &copy;2024 </p>
    </footer>
  );
};

export default Footer;
