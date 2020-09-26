import React from 'react';
import { isArray, map } from 'lodash';
import { Input, TextArea, Dropdown, Form, Button } from 'semantic-ui-react';

import './FormBuilder.css';

// const addFormItem = type => {
//   const form = localStorage.getItem('form') || {};
//   const i = Object.keys(form).length;
//   const newForm = { ...form, [`${type}${i + 1}`]: { type: type, default: '' }};
//   localStorage.setItem('form', JSON.stringify(newForm));
// }
export class FormBuilder extends React.Component {

  state = {showResult: false, form: [], parsing: []};


  formBuilder = (form) => {
    return map(form, (item, i) => {
      switch (item.type) {
        case 'input':
          return (
            <li key={`input${i}`}><Input label={item.label} index={i} onChange={this.props.handleChange} /></li>
          )
        case 'text':
          return (
            <li key={`text${i}`}><TextArea index={i} placeholder={item.label} onChange={this.props.handleChange} /></li>
          )
        case 'dropdown':
          return (
            <li key={i} >
            <Dropdown
              placeholder={item.label}
              selection
              options={[{ key: 'Dude', text: 'Dude', value: 'Dude' }]}
              onChange={this.handleChange}
            />
            </li>
          )
        default: 
            return <div />
      }
    })
  }
  render() {
    const { form, showResults } = this.props;
    if (!isArray(form)) return <div />
    return (
      <Form>
      <ul>{this.formBuilder(form)}</ul>
      <br />
      {
        form.length > 0 && <Button className='submit-button' onClick={() => showResults()} >Submit</Button>
      }
      </Form>
    );
  }
}

export default FormBuilder;