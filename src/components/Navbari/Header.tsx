import React from 'react';

function Header() {
  return (
    <div className="header1">
      <div className="header2">
        <div className="header3">
          <div className="header4">
            <h1 className="header5">
              <img alt="Instagram" className="header6" src="/assets/logo.png" />
            </h1>
          </div>
          <div className="header7">
            <>
              <svg
                className="header8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>

              <svg
                className="header9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>

              <div className="header10">
                <img alt="profile_pic" className="karl" src="/assets/karl.jpeg" />
              </div>
            </>
            {/* ) : ( */}
            <></>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
