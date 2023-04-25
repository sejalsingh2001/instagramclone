import React, { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fireDb } from '../../firebaseConfig';
import Post from '../Posti/Post';

function Mainpage() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>();
  const dispatch = useDispatch();

  const getData = async () => {
    if (lastVisible !== undefined) {
      dispatch({ type: 'showLoading' });
      const next = query(collection(fireDb, 'posts'), startAfter(lastVisible), limit(2));
      const querySnapshot = await getDocs(next);
      const visible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(visible);

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setData(data);

      dispatch({ type: 'hideLoading' });
    } else {
      dispatch({ type: 'showLoading' });

      const first = query(collection(fireDb, 'posts'), limit(2));
      const querySnapshot = await getDocs(first);
      const visible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(visible);
      const temp: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      setData(temp);

      dispatch({ type: 'hideLoading' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <InfiniteScroll dataLength={data.length} loader={<p>loading ...</p>} next={getData} hasMore>
        {data.map((post) => {
          return <Post key={post?.user?.id} post={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Mainpage;
