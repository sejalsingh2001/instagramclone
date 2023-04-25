import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import './Navbar.scss';
import Avatar from '@material-ui/core/Avatar';
import { Link, useNavigate } from 'react-router-dom';

import insta_log from '../../images/logoinsta.png';
import home from '../../images/home.svg';
import message from '../../images/message.svg';
import find from '../../images/find.svg';
// import pp from '../../images/karl.jpeg';
import plus from '../../images/imagesplus.svg';
// eslint-disable-next-line import/order
import log from '../../images/log4.svg';
import '../Addposti/Addpost';
import '../Profilei/Profile';
import sj from '../../images/prfl.jpeg';
import Modal from '../modal/Modal';
import StoryModal from '../shostory/StoryModal';

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('Instagram-clone') || '{}');
  const navigate = useNavigate();

  const [story, setStory] = useState(false);

  return (
    <div>
      <div className="navbar-content">
        <Grid container>
          <Grid xs={2} item>
            {' '}
          </Grid>
          <Grid xs={3} item>
            <Link to="/home">
              <img alt="img" className="navbar-logo" src={insta_log} width="105px" />
            </Link>
          </Grid>
          <Grid xs={3} item>
            {/* <input className="navbar-search" placeholder="Search" type="text" /> */}
          </Grid>
          <Grid style={{ display: 'flex' }} xs={3} item>
            <Link to="/home">
              <img
                alt="pic"
                className="navbar-img"
                src={home}
                width="25px"
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            </Link>
            <img alt="pic" className="navbar-img " src={message} width="25px" />

            <img
              alt="pic"
              className="navbar-img plus"
              src={plus}
              width="23px"
              onClick={() => {
                setStory(true);
              }}
            />
            <Link to="/addpost">
              <img alt="pic" className="navbar-img" src={find} width="25px" />
            </Link>
            <img
              alt="pic"
              className="navbar-img2"
              src={log}
              width="25px"
              onClick={() => {
                localStorage.removeItem('Instagram-clone');
                navigate('/');
              }}
            />
            
            <Link to={`/profile/${user.id}`}>
              <Avatar
                className="navbar-img"
                src={sj}
                style={{ maxWidth: '30px', maxHeight: '30px' }}
              />
            </Link>
          </Grid>
          <Grid xs={1} item />
        </Grid>
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      {story && <StoryModal setOpenModal={setStory} />}
    </div>
  );
}

export default Navbar;
