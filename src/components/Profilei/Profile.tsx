import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useParams } from 'react-router-dom';
import { collection, doc, DocumentData, getDoc, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import Item from '@mui/material/Grid';
import Grid from '@mui/material/Grid';

import { fireDb } from '../../firebaseConfig';
// import pp from '../../images/karl.jpeg';
import Navbar from '../Navbari/Navbar';
import ss from '../../images/userprofile.jpeg'




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

function Profile() {
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

  const getUserName = () => {
    const email = user?.email;
    const username = email?.substring(0, email.length - 10);

    return username ;
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="UserProfileContainer">
        <div className="align_center">
          <div className="UserDataSection">
            <div>
              <img alt="pic" src={ss} style={{ borderRadius: '50%', height: '150px' }} />
            </div>
            <div className="UserInfoContainer">
              <div className="EditAndSettingsDiv">
                <p> {getUserName()}</p>
                {/* <button>Edit Profile</button> */}
              </div>
              <div className="EditAndSettingsDiv">
                <div><span>{posts.length}</span> posts</div>
                <div style={{ cursor: 'pointer' }}>
                  <span>0 </span>
                  followers
                </div>
                <div style={{ cursor: 'pointer' }}>
                  <span>0 </span>
                  following
                </div>
              </div>
              <div className="EditAndSettingsDiv">
                <span>{user?.bio}</span>
                <p style={{ fontSize: '16px', display: 'block' }}> </p>
              </div>
            </div>
          </div>
        </div>
        <div className="align_center">
          <div className="UserHighlightSection">
            <div className='AllPostImages'>
            <Grid  spacing ={1}container>
              {posts.map((post: filtered_post) => {
                return ( 
                // eslint-disable-next-line react/jsx-key
                <Grid md={4} xs={6} item>
                <Item className='ff'> <img key={post.docId} alt="postimg" className='profileimg' height="400px" src={post.imageURL} width="360px" /></Item>
              </Grid>
             
                )
              })}
           </Grid>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}

export default Profile;
