import React from 'react';

import sp from '../../images/icons2.png'

function Moda({ setOpenModa }: { setOpenModa: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModa(false);
            }}
          >
           <img alt="pic" className="navbar-img " src={sp} width="25px" />
          </button>
        </div>

        <div className="body">
          <p>hii</p>
        </div>
      </div>
    </div>
  );
}

export default Moda;
