import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import './NavBar.css';

export const NavBar = () => {
  const [active, setActive] = useState('home');
  const setClass = (link) => {
    if (window['gtag'] && active === link) {
      window['gtag']('event', 'click', {
        'event_category' : 'pages',
        'event_label' : link
      });
    }
    return {color: 'gray', fontWeight: active === link ? 'bold' : 'normal'}
  }
  return (
    <div className='nav-bar'>
      <List horizontal>
        <List.Item > <Link onClick={() => setActive('home')}  style={setClass('home')} to="/">Home</Link></List.Item>
        <List.Item > <Link onClick={() => setActive('blog')} style={setClass('blog')}  to="/blog">Blog</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('form')} style={setClass('form')}  to="/forms">Form Builder</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('blocks')} style={setClass('blocks')}  to="/blocks">Blocks Game</Link> </List.Item>
        <List.Item> <Link onClick={() => setActive('weather')} style={setClass('weather')}  to="/weather">Weather App</Link> </List.Item>
      </List>
    </div>
  )

}