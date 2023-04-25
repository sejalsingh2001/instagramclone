import React from 'react';

import Addpost from '../Addposti/Addpost';
import './Modal.scss';
import sp from '../../images/icons6.png'

function Modal({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
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
          <Addpost />
        </div>
      </div>
    </div>
  );
}

export default Modal;
