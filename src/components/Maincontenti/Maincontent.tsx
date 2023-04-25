import { Grid } from '@material-ui/core';
import React from 'react';

import InfoSection from '../Infosectioni/InfoSection';
import './Maincontent.scss';
import Mainpage from '../Mainpagei/Mainpage';
import StatusBar from '../Statusbar/StatusBar';
import Suggestions from '../suggestions/Suggestions';

function Maincontent() {
  return (
    <div>
      <Grid container>
        <Grid xs={2} item />
        <Grid className="maincontent__container" xs={6} item>
          <div>
            <StatusBar />
            <Mainpage />
          </div>
        </Grid>
        <Grid xs={2} item>
          <InfoSection />
          <Suggestions />
        </Grid>
        <Grid xs={2} item />
      </Grid>
    </div>
  );
}

export default Maincontent;
