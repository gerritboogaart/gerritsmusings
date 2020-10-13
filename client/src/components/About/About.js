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
      Gerrit Boogaart | Software Engineer
      <div className='text-about-page'>
        Welcome to my portfolio. This site is written in React using Hooks and sometimes Context.<br />
        I code in JavaScript, ReactJS, NodeJS, and use CSS3, HTML5 and MySql to bring apps to life.<br />
        I have a passion for coding and solving problems programmatically. I am intrigued by using both the front end and the back end to create the optimal experience for clients, customers, and the passerby.<br />
        My hobbies that do not involve a screen are my dog Boomer (a Boston Terrier), reading my Kindle, and indoor cycling.
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
        <Icon style={{ color: '#2266c2' }} link size='big' className='social-links' name='linkedin' onClick={() => linking('linkedin')} />
        <Icon style={{ color: '#369ef2' }} link size='big' className='social-links' name='twitter' onClick={() => linking('twitter')} />
        <Icon style={{ color: '#927f64' }} link size='big' className='social-links' name='goodreads g' onClick={() => linking('goodreads')} />
      </div>
    </div>


  )
}
