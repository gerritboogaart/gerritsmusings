import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Start.css';

const CARDS = {
  forms: {
    url: '/forms',
    className: 'form-card',
    header: 'Form Builder',
    description: 'Create and test your form layouts',
    active: true
  },
  blocks: {
    url: '/blocks',
    className: 'blocks-card',
    header: 'Blocks',
    description: 'CSS Game: See blocks fall as you click them away',
    active: true
  },
  cards: {
    url: '/weather',
    className: 'weather-card',
    header: 'Weather',
    description: 'Check your local weather data',
    active: true
  },
  blog: {
    url: '/blog',
    className: 'blog-card',
    header: 'Blog',
    description: 'Read my musings',
    active: true
  },
  photos: {
    url: '/photos',
    className: 'photos-card',
    header: 'Photos',
    description: 'My pictures integrated with Google Maps',
    active: true
  }
}

const createCard = type => {
  const details = CARDS[type];
  if (!details) return <div />
  return (
    <div className='single-card'>
      <Link to={details.url} >
        <Card className='gerrit-card' style={{minHeight: '17rem'}}>
          <Card.Content className={details.className}>

          </Card.Content>
          <Card.Content>
            <Card.Header>{details.header}</Card.Header>
            <Card.Description>
              {details.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>
    </div>
  )
}

export const Start = () => {

  return (
    <div className='main-page'>
      <div className='text-main-page'>
        Welcome to <Link to='/about' >Gerrit Boogaart's</Link> portfolio. This site is written in React using Hooks and sometimes Context.<br />
        </div>
      <div className='card-holder'>
      <Card.Group>
        {createCard('blog')}
        {/* {createCard('forms')} */}
        {createCard('blocks')}
        {createCard('cards')}
        {createCard('photos')}
      </Card.Group>
      </div>




    </div>
  )
}
