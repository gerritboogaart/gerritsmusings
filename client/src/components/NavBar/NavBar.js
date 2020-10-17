import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Icon } from 'semantic-ui-react';
import './NavBar.css';

export const NavBar = () => {
  const [active, setActive] = useState('home');

  // useEffect(() => {
  //   const path = window.location.pathname;
  //   console.log(path, active)
  //   if (path !== active) setActive(path);
  // })

  const setClass = (link) => {
    if (window['gtag'] && active === link) {
      window['gtag']('event', 'click', {
        'event_category' : 'pages',
        'event_label' : link
      });
    }
    const path = window.location.pathname;
    return {color: 'gray', fontWeight: path === `/${link}` ? 'bold' : 'normal'}
  }
  return (
    <div className='nav-bar'>
      <List horizontal>
        <List.Item > <Link onClick={() => setActive('home')}  style={setClass('')} to="/"><Icon name='home' /></Link></List.Item>
        <List.Item > <Link onClick={() => setActive('blog')} style={setClass('blog')}  to="/blog">Blog</Link> </List.Item>
        {/* <List.Item> <Link onClick={() => setActive('forms')} style={setClass('forms')}  to="/forms">Form Builder</Link> </List.Item> */}
        <List.Item> <Link onClick={() => setActive('weather')} style={setClass('weather')}  to="/weather">Weather</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('blocks')} style={setClass('blocks')}  to="/blocks">Blocks</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('photos')} style={setClass('photos')}  to="/photos">Photos</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('about')} style={setClass('about')}  to="/about">About</Link> </List.Item>
      </List>
    </div>
  )

}