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
    header: 'Falling blocks',
    description: 'See blocks fall as you click them away',
    active: true
  },
  cards: {
    url: '/weather',
    className: 'weather-card',
    header: 'Weather App',
    description: 'Check your local weather',
    active: true
  },
  blog: {
    url: '/blog',
    className: 'blog-card',
    header: 'My Blog',
    description: 'Read my musings',
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
       <Link to='/about' >Gerrit Boogaart</Link>
        <br />
      <div className='text-main-page'>
        Welcome to my portfolio. This site is written in React using hooks and sometimes context.<br />
        </div>
      <div className='card-holder'>
      <Card.Group>
        {createCard('blog')}
        {/* {createCard('forms')} */}
        {createCard('blocks')}
        {createCard('cards')}
      </Card.Group>
      </div>




    </div>
  )
}