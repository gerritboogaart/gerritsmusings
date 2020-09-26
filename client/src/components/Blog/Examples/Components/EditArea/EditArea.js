import React, { useState, useEffect } from "react";
import AppContext from "../../context";
import DatePicker from 'react-datepicker';
import { Input, Button, Rating } from 'semantic-ui-react';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

const formatDate = (date) => {
  if (!new Date(date)) return '';
  const useDate = new Date(date)
  return moment(useDate).format('MMM DD');
}

const EditArea = ({ names, selectedName, actions }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [pob, setPob] = useState('');
  const [index, setIndex] = useState(selectedName);
  const [rating, setRating] = useState(1);

  const person = { firstName, lastName, birthday, pob, rating };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (index !== selectedName) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIndex(selectedName);
      setFirstName(names[selectedName].firstName || '');
      setLastName(names[selectedName].lastName || '');
      setBirthday(names[selectedName].birthday || new Date());
      setPob(names[selectedName].pob || '');
      setRating(names[selectedName].rating || 3);
    }
  })

  const handleRate = (e, { rating, maxRating }) => {
    setRating(rating)

  }

  return (
    <div className='edit-area'>
      {!names[selectedName]
        ? <><span style={{ color: 'gray' }}>Select a name on the left to edit</span> <br /></>
        : (
          <div className='edit-name'>
            {names[selectedName].firstName}
            <li>
              <Input
                icon='users' iconPosition='left' placeholder='Enter name' value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              /></li>
            <li><Input icon='users' iconPosition='left' placeholder='Enter last name' value={lastName} onChange={(e) => setLastName(e.target.value)} /></li>
            <li>
              <DatePicker
                selected={new Date(birthday)}
                onChange={date => setBirthday(date)}
                dateFormat="MMMM dd"
                customInput={
                  (
                    <Input
                      icon='gift'
                      iconPosition='left'
                      placeholder='Enter birthday'
                      value={formatDate(birthday)}
                    />
                  )
                }
              />
            </li>
            <li><Input icon='home' iconPosition='left' placeholder='Enter home location' value={pob} onChange={(e) => setPob(e.target.value)} /></li>
            <li><Rating icon='star' rating={rating} maxRating={5} onRate={handleRate} /></li>
            <Button onClick={() => actions.updateName(person, selectedName)}>Update Person</Button>
          </div>
        )
      }
    </div>
  )
};

export default () => (
  <AppContext.Consumer>
    {({ names, selectedName, actions }) => <EditArea names={names} selectedName={selectedName} actions={actions} />}
  </AppContext.Consumer>
)