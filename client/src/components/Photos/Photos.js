import React, { useState, useEffect } from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import axios from 'axios';
import './Photos.css';

const mobile = window.navigator.userAgent;

export const Photos = () => {
  const [photo, setPhoto] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState([500, 400]);
  const [showText, setShowText] = useState(false);
  const [googleApi, setGoogleApi]= useState();

  useEffect(() => {
    if (!googleApi) {
      axios.get('/getapi')
      .then(result => {
        setGoogleApi(result.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  });

  useEffect(() => {
    if (!isMobile) {
      const mob = mobile.includes('iPhone') || mobile.includes('Android');
      setIsMobile(mob);
      const resize = mob ? [345, 350] : [500, 400];
      setSize(resize);
    }
  }, [mobile, isMobile])

  const moveLeft = () => setPhoto(photo - 1 < 1 ? 8 : photo - 1);

  const moveRight = () => setPhoto(photo + 1 > 8 ? 1 : photo + 1);

  const QUERY = {
    1: { name: 'virginia+beach+rudee+inlet', zoom: 8 },
    2: { name: 'charlottesville+va', zoom: 8 },
    3: { name: 'venice+beach', zoom: 8 },
    4: { name: 'nationals+park+washington+DC', zoom: 8 },
    5: { name: 'cliffs+of+moher', zoom: 7 },
    6: { name: 'grand-canyon+west', zoom: 6 },
    7: { name: 'kerry+park+seattle+washington', zoom: 7 },
    8: { name: 'monticello+trail+charlottesville+va', zoom: 8 },
  }

  const getSrcUrl = () => {
    if (!photo || !googleApi) return '';
    const base = 'https://www.google.com/maps/embed/v1/place?key=';
    const api = googleApi;

    return base + api + '&q=' + QUERY[photo]['name'] + '&zoom=' + QUERY[photo]['zoom'];
  }

  return (
    <div className='photos-page'>

        <div className='photo-columns'>
        <div className='photo-holder'>
          <div className={`photo photo${photo}`}></div>
          <Icon onClick={() => moveRight()} className='right-angle' size='big' name='chevron circle right'></Icon>
          <Icon onClick={() => moveLeft()}className='left-angle' size='big' name='chevron circle left'></Icon>
          </div>
          <div className='right-side'>
          {!photo || !googleApi ? (
            <Loader>Waiting for google api</Loader>
          ) : (
            <iframe
            width={size[0]}
            title="Where is this picture taken"
            height={size[1]}
            frameBorder="0"
            src={getSrcUrl()} >
          </iframe>
          )}
          </div>
        </div>
        <div className='photos-text'>
         <Icon link name='camera' size='big' onClick={() => setShowText(!showText)}></Icon>
         { showText && (
           <span className='photo-span'>
            All pictures are my personal photos captured on either my wife's iPhone 6s, or my Samsung Galaxy S9.
           </span>
         )}
        </div>
    </div>
  )
}