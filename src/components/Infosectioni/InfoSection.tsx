import React from 'react';
// eslint-disable-next-line import/order
import { Avatar } from '@material-ui/core';



import './InfoSection.scss';
// import imageSrc from '../../images/karl.jpeg';

import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, DocumentData, getDoc, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import im from '../../images/userprofile.jpeg';
import { fireDb } from '../../firebaseConfig';
// import pp from '../../images/karl.jpeg';



type comment_type = {
  commentText: string;
  email: string;
  id: string;
};
type user_type = {
  bio: string;
  email: string;
  id: string;
  profilePicture: string;
};

type filtered_post = {
  comments: comment_type;
  docId: string;
  id: string;
  imageURL: string;
  likes: `{}`;
  user: user_type;
};


function InfoSection() {
  const dispatch = useDispatch();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<DocumentData>();

  const getPosts = async () => {
    dispatch({ type: 'showLoading' });
    const querySnapshot = await getDocs(collection(fireDb, 'posts'));
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const temp: any = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    const filteredPosts = temp.filter((post: filtered_post) => post.user.id === params.id);

    setPosts(filteredPosts);
    dispatch({ type: 'hideLoading' });
  };

  const getUser = async () => {
    if (params.id) {
      const result = await getDoc(doc(fireDb, 'users', params?.id));
      setUser(result.data());
    }
  };
// eslint-disable-next-line no-console
console.log(posts);
  const getUserName = () => {
    const email = user?.email;
    const username = email?.substring(0, email.length - 11);

    return username ;
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);


  return (
    <div>
      <div className="info__container">
        <Avatar className="info__image" src={im} />
        <div className="info_content">
          <div className="info_username"> dummy_user {getUserName()}</div>
          <div className="info_description"> Description</div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
