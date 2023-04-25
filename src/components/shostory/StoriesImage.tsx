import React, { useRef, useState } from 'react';
import Stories from 'react-insta-stories';
import { Link, useLocation } from 'react-router-dom';

import './StoriesImage.scss';

function StoriesImage() {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locationRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stories, setStories] = useState([
    {
      url: location.state.url,
    },
  ]);

  return (
    <div className="storiesimage">
      <Stories
        defaultInterval={2000}
        height="800px"
        stories={stories}
        width="500px"
        isPaused
        onAllStoriesEnd={() => locationRef.current.click()}
      />

      <Link ref={locationRef} to="/home" />
    </div>
  );
}



export default StoriesImage;
