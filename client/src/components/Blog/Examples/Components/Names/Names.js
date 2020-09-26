import React from "react";
import AppContext from "../../context";
import { Rating } from 'semantic-ui-react';
import moment from 'moment';

const formatDate = (date) => {
  if (!new Date(date)) return '';
  // const useDate = new Date(date)
  return moment(date).format('MMM DD');
}

const Names = ({ names, actions }) => {
  if (!names || names.length < 1) return <div />
  const res = names.map((name, i) => (
    <React.Fragment key={name.firstName + i}>
      <li className='names' onClick={() => actions.selectName(i)}>{name.firstName}</li>
      {!!name.lastName && <li className='small'>last name: {name.lastName}</li>}
      {!!name.birthday && <li className='small'>birthday: {formatDate(name.birthday)}</li>}
      {!!name.pob && <li className='small'>home: {name.pob}</li>}
      {!!name.rating && <li className='small'>rating: {<Rating icon='star' rating={name.rating} maxRating={5} disabled />}</li>}
      </React.Fragment>
      ))
      return (
    <div className='name-area'>
        {res}
      </div>
      )
    };

export default () => (
    <AppContext.Consumer>
        {({ names, actions }) => <Names names={names} actions={actions} />}
      </AppContext.Consumer>
)