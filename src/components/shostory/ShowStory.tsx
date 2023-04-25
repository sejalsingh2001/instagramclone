import { Avatar } from '@material-ui/core';
import React from 'react';
// import '../../StatusBar.scss';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export type Props = {
  post: DocumentData;
};

function ShowStory(props: Props) {


  const { post } = props;

  const navigate = useNavigate();


  const toComponentB = (image: string) => {
    navigate('/storiesimage', {
      state: { url: image },
    });
  };

  const getUserName = () => {
    const email = post.user.email;
    const username = email.substring(0, email.length - 12);

    return username;
  };

  return (
    <>
      <div className="status">
        <Avatar
          className="statusbar__status"
          src={post.imageURL}
          onClick={() => {
            toComponentB(post.imageURL);
          }}
        />
        <div className="statusbar__text">{getUserName()}</div>
      </div>
    </>
  );
}

export default ShowStory;
