import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { fireDb } from '../../firebaseConfig';

const addpost = async (image: File) => {
  const storage = getStorage();

  if (!image) return;

  const storageRef = ref(storage, `/posts/${image.name}`);
  uploadBytes(storageRef, image).then(() => {
    getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {
      addDoc(collection(fireDb, 'posts'), {
        imageURL: url,
        likes: [],
        comments: [],
        user: JSON.parse(localStorage.getItem('Instagram-clone') || '{}'),
      })
        .then((docRef) => {
          const documentRef = doc(fireDb, `posts/${docRef.id}`);
          updateDoc(documentRef, { docId: docRef.id });
        })
        .catch(() => {
          // console.log(error);
        });
    });
  });
};

const userActions = {
  addpost,
};

export default userActions;
