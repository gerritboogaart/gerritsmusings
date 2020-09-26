import React from 'react';
import { map } from 'lodash';

export const ParseForm = (({ form }) => {
  if (!form || form.length < 1) return <p>There is nothing to show. Please enter form values</p>
  return map(form, (item, i) => {
    return (
        <li key={`${item.value}${i}`}>{item.label} - {item.value}</li>
    )
  })
})