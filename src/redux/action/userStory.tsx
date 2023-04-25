import { addDoc, collection, doc, DocumentData, getDocs, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { fireDb } from '../../firebaseConfig';

const addstory = async (image: File) => {
  const storage = getStorage();

  if (!image) return;

  const storageRef = ref(storage, `/stories/${image.name}`);

  uploadBytes(storageRef, image).then(() => {
    getDownloadURL(ref(storage, `/stories/${image.name}`)).then((url) => {
      addDoc(collection(fireDb, 'stories'), {
        imageURL: url,
        likes: [],
        comments: [],
        user: JSON.parse(localStorage.getItem('Instagram-clone') || '{}'),
      })
        .then((docRef) => {
          const documentRef = doc(fireDb, `stories/${docRef.id}`);
          updateDoc(documentRef, { docId: docRef.id });
        })
        .catch(() => {
          // console.log(error);
        });
    });
  });
};

const getStory = async () => {
  let stories: DocumentData[] = [];
  const usersQuery = query(
    collection(fireDb, "stories")
   
  );
  const querySnapshot = await getDocs(usersQuery);
  querySnapshot.forEach((doc) => {
    stories= [...stories, doc.data()];
    console.log(stories)
  });
  return stories;
};

const userStoryActions = {
  addstory,
getStory
};

export default userStoryActions;
