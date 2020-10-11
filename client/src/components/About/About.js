import React from 'react';
import { Icon } from 'semantic-ui-react';
import './About.css';

export const About = () => {

  const linking = (type) => {
    switch (type) {
      case 'twitter':
        window.open('https://twitter.com/gerritb42', "_blank");
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/gerrit-boogaart-a8b56015/', '_blank');
        break;
      case 'goodreads':
        window.open('https://www.goodreads.com/user/show/18523417/', '_blank');
        break;
      default:
        return <div />
    }
  }

  return (
    <div className='about-page'>
      Gerrit Boogaart
      <div className='text-about-page'>
        Welcome to my portfolio. This site is written in React using hooks and sometimes context.<br />
        I code in JavaScript, ReactJS, NodeJS, and use CSS3, HTML5 and MySql to bring apps alive<br />
        My hobbies that don't involve a screen are my dog Boomer (a Boston Terrier), reading my Kindle and indoor cycling.
        <br />
        <p />
        <p>Favorite Coding Quotes:</p>
        <p />
        <div className='quotes'>
          <p>'I would love to change the world, but they won’t give me the source code'</p>
          <p>'I write code, so my dog can have a better life'</p>
        </div>
      </div>
      <div className='social-icons'>
        <Icon link size='big' className='social-links' name='linkedin' onClick={() => linking('linkedin')} />
        <Icon link size='big' className='social-links' name='twitter' onClick={() => linking('twitter')} />
        <Icon link size='big' className='social-links' name='goodreads g' onClick={() => linking('goodreads')} />
      </div>
    </div>


  )
}
