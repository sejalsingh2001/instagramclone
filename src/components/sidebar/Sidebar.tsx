import React from 'react';

function Sidebar() {
  return (
    <>
      <div className="side_main">
        <div className="sidebar_main">
          <img alt="karl" className="img_sidebar" src="/assets/karl.jpeg" />
        </div>
        <div className="sidebar_name">
          <p className="sidebar_menu">karl</p>
          <p className="sidebar_fullname">karl hudson </p>
        </div>

        <div className="side">
          <div className="sidebar1">
            <p className="sugp">Suggestions for you</p>
            <div className="sidebar2">
              <img alt="pic" className="sidebar3" src="/assets/karl.jpeg" />
              <p> karl</p>
            </div>
            <button className="sidebar4" type="button">
              Follow
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
