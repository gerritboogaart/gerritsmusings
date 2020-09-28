import React from 'react';
import { Icon } from 'semantic-ui-react';
import './About.css';

export const About = () => {

  const linking = (type) => {
    switch(type) {
      case 'twitter':
        window.open('https://twitter.com/gerritb42', "_blank");
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/gerrit-boogaart-a8b56015/', '_blank');
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
        My hobbies are coding in JavaScript, ReactJS, NodeJS, and playing with CSS3, HTML5 and MySql.<br />
        My hobbies that don't involve a screen are my dog Boomer (a Boston Terrier), reading my kindle and indoor cycling.

        </div>
        <div className='social-icons'>
          <Icon link size='big' className='social-links' name='linkedin' onClick={() => linking('linkedin')}/>
          <Icon link size='big' className='social-links' name='twitter' onClick={() => linking('twitter')}/>
        </div>
    </div>


  )
}
