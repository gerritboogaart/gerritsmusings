import React from 'react';
import { isArray, map } from 'lodash';
import { Input, TextArea, Dropdown, Form, Button, Icon, Label } from 'semantic-ui-react';

import './FormBuilder.css';
import CodeBuilder from '../CodeBuilder/CodeBuilder';

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
            <li key={`input${i}`}><Icon link name='trash alternate outline' onClick={() => this.props.removeEntry(i)} /><Input label={item.label} index={i} onChange={this.props.handleChange} /></li>
          )
        case 'text':
          return (
            <li key={`text${i}`}>
              <Icon link name='trash alternate outline' onClick={() => this.props.removeEntry(i)} />
            {item.label && <Label>{item.label}</Label>}
              <TextArea style={{width: '89%'}} index={i} placeholder={item.options} onChange={this.props.handleChange} />
            </li>
          )
        case 'dropdown':
          return (
            <li key={i} >
            <Icon link name='trash alternate outline' onClick={() => this.props.removeEntry(i)} />
            <Dropdown
              placeholder={item.label}
              selection
              // options={[{ key: 'Dude', text: 'Dude', value: 'Dude' }]}
              options={this.drawOptions(item.options)}
              onChange={this.handleChange}
            />
            </li>
          )
        default:
            return <div />
      }
    })
  }

  drawOptions = (options) => {
    return map(options, option => {
      return { key: option, text: option, value: option }
    })
  }

  calcHeight = (form) => {
    if (!form || form.length < 1) return '1rem';
    const h = ( form.length * 6 ) + 6;
    return `${h}rem`;
  }
  render() {
    const { form, showResults } = this.props;
    if (!isArray(form) || form.length < 1) return <div />
    return (
      <React.Fragment>
      <Form style={{height: this.calcHeight(form)}}>
      <ul>{this.formBuilder(form)}

      {
        form.length > 0 && <li><Button className='submit-button' onClick={() => showResults()} >Submit</Button></li>
      }
      </ul>
      </Form>
      <br />
      Code Example:
      <br />
      <CodeBuilder form={form}/>
    </React.Fragment>
    );
  }
}

export default FormBuilder;