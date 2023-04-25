import React from 'react';

import Addstory from '../Addposti/Addstory';
import sp from '../../images/icons6.png'

function StoryModal({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
          <img alt="pic" className="navbar-img " src={sp} width="25px" /> 
          </button>
        </div>

        <div className="body">
          <Addstory />
        </div>
      </div>
    </div>
  );
}

export default StoryModal;
