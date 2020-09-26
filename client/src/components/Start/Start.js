import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Start.css';

const CARDS = {
  forms: {
    url: '/forms',
    className: 'form-card',
    header: 'Form Builder',
    description: 'Create and test your form layouts'
  },
  blocks: {
    url: '/blocks',
    className: 'blocks-card',
    header: 'Falling blocks',
    description: 'See blocks fall as you click them away'
  },
  cards: {
    url: '/weather',
    className: 'weather-card',
    header: 'Weather App',
    description: 'Check your local weather'
  },
  blog: {
    url: '/blog',
    className: 'blog-card',
    header: 'My Blog',
    description: 'read my musings'
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
      Gerrit Boogaart
        <br />
      <div className='text-main-page'>
        Welcome to my portfolio. This site is written in React.
        </div>
      <div className='card-holder'>
      <Card.Group>
        {createCard('blog')}
        {createCard('forms')}
        {createCard('blocks')}
        {createCard('cards')}
      </Card.Group>
      </div>




    </div>
  )
}
