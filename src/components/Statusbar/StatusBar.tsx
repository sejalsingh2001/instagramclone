import React, {  useState } from 'react';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/order
import { fireDb } from '../../firebaseConfig';

import './StatusBar.css';
import ShowStory from '../shostory/ShowStory';


function StatusBar() {
  const [data, setData] = useState<DocumentData[]>([]);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch({ type: 'showLoading' });
    const querySnapshot = await getDocs(collection(fireDb, 'stories'));
    const temp: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    setData(temp);

    dispatch({ type: 'hideLoading' });
  };

  setTimeout(() => {
    getData()
  }, 1000);


  return (
    <div className="statusbar__container">
      {data.map((post) => {
        return <ShowStory key={post.user.id} post={post} />;
      })}
    </div>
  );
}

export default StatusBar;
