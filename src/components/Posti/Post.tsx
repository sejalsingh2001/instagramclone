/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import { Avatar } from '@material-ui/core';
import love from '../../images/love.svg';
import comment from '../../images/comment.svg';
import share from '../../images/share.svg';

import './Post.scss';
import {  useEffect, useState } from 'react';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';

import { fireDb } from '../../firebaseConfig';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export type Props = {
  post: DocumentData;
};
type comment_type = {
  commentText: string;
  email: string;
  id: string;
};

function Post(props: Props) {
  const currentUser = JSON.parse(localStorage.getItem('Instagram-clone') || '{}');
  const { post } = props;
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [commentText, setCommentText] = useState('');
  const [addpost, setAddpost] = useState<DocumentData>();

  // const [displayComment, setDisplayComment] =useState<comment_type[] | []>([]);

  // setDisplayComment(post.comments)

  const [modalOp, setModalOp] = useState(false);
  // console.log("post",post)
  const getUserName = () => {
    const email = post?.user?.email;
    const username = email.substring(0, email.length - 10);

    return username;
  };

  const getData = () => {
    dispatch({ type: 'showLoading' });
    getDoc(doc(fireDb, 'posts', post.docId))
      .then((response) => {
        setAddpost({ ...response.data(), id: response.id });
        // console.log(addpost,"addpost")
        dispatch({ type: 'hideLoading' });
      })
      .catch(() => {
        dispatch({ type: 'hideLoading' });
      });
  };
  useEffect(() => {
    getData();
 
  }, []);

  //  console.log(post,"post")

   
   const  addComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const updatedComments = await addpost?.comments;
  
      // updatedComments.push({
      //   id: currentUser.id,
      //   email: currentUser.email,
      //   commentText,
      // });
      post.comments.push({
        id: currentUser.id,
        email: currentUser.email,
        commentText,
      });
  
      updateDoc(doc(fireDb, 'posts', post.id), {
        ...post.post,
        // comments: updatedComments,
        comments: post.comments,
      })
        .then((res) => {
            getData();
          setCommentText('');
        })
        .catch((error) => {
          // console.log('error');
        });
    };





  return (
    <div className="post__container">
      {/* Header */}
      <div className="post__header">
        <Avatar className="post__image" src="" />
        <div className="post__username">{getUserName()}</div>
      </div>

      {/* Image */}
      <div>
        <LazyLoadImage alt="postimg" effect="blur" src={post.imageURL} width="613px" />
      </div>

      {/* Analytics */}
      <div>
        <div style={{ marginLeft: '10px' }}>
          <img alt="pic" className="post_reactimage" src={love} />
          <Link to="/home">
            <img
              alt="pic"
              className="post_reactimage"
              src={comment}
              onClick={() => {
                setModalOp(true);
              }}
            />
          </Link>
          <img alt="pic" className="post_reactimage" src={share} />
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <span />
        {post.comments.map((comment: comment_type) => {
          return (
            <div key={comment.id} className="comment1">
              <h1 className="comment2">
                <span className="comment3">
                  {/* {getUserName(comment.email)} commented is for reference*/}
                  {getUserName()}
                  <span>:</span>
                </span>{' '}
                {comment.commentText}
              </h1>
            </div>
          );
        })}
        {/* //   ))
      } */}
        <form onSubmit={addComment}>
          <input
            className="post__commentbox"
            placeholder="Add a comment..."
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </form>
      </div>
      {modalOp && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setModalOp(false);
                }}
              >
                X
              </button>
            </div>

            <div className="body">
              <p>hiii</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
