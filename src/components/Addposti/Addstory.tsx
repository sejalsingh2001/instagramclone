import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Addpost.scss';

import { addStoryThunk} from '../../redux/feature/userStorySlice';
import { AppDispatch } from '../../redux/store';


function Addstory() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const addStory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: 'showLoading' });
    dispatch(addStoryThunk(image));
    navigate('/');
  
  };


  return (
    <div className="addpost_bck">
      <div className="addpodst_div">
        <div>
          <h1 className="addpost_h">Create a new story</h1>
        </div>
        <div className="addpost_div2">
          <form className="addpost_form">
            <div className="addpost_div4">
              <input
                accept="image/png, image/jpeg"
                className="hid"
                id="file"
                type="file"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const files = target.files;

                  setImage(files![0]);
                }}
              />
              <label className="addpost_label" htmlFor="file">
                {image ? <p> {image.name}</p> : <p className='dot'>Choose Image</p>}
              </label>
            </div>
            <button className="addpost_submit" onClick={addStory}>
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addstory;
