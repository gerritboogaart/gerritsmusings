import React, { Component } from 'react';
import { get, clone } from 'lodash';
import { Button } from 'semantic-ui-react';
import FormItems from '../FormItems/FormItems';
import FormBuilder from '../FormBuilder/FormBuilder';
import './Home.css';
import { ParseForm } from '../PasrseForm/ParseForm';


export class Home extends Component {
  state = { form: [], parsing: false };

  componentDidMount() {
    // this.reuseForm();
  }

  handleChange = (e, {value, index, label}) =>  {
    const parsing = clone(this.state.form) || [];
    const addValue = parsing[index];
    const newValue = {...addValue, value};
    parsing[index] = newValue;
    this.setState({ form: parsing });
  }


  addFormItem = (type, label, options) => {
    const { form } = this.state;
    // const i = form.length;
    // const newForm = { ...form, [`${type}${i + 1}`]: { type: type, default: '' } };
    form.push({ type, default: '', label, options });
    this.setState({ form });
  };

  saveform = () => {
    const { form } = this.state;
    localStorage.setItem('form', JSON.stringify(form));
  }

  reuseForm = () => {
    const form = JSON.parse(localStorage.getItem('form')) || [];
    this.setState({form});
  }

  resetCurrentForm = () => {
    this.setState({form: [], parsing: false});
  };

  showResults = () => {
    this.setState({parsing: true});
  }

  removeEntry = (index) => {
    const { form } = this.state;
    form.splice(index, 1);
    this.setState({ form });
  }

  render() {
    const form = get(this.state, 'form');
    return (
      <div className="home">
        <div className='top-nav'>
          Build your form here<br />
          Usable items:<br />
          <FormItems addFormItem={this.addFormItem} />

        </div>
        <div style={{width: '90%', margin: 'auto'}}>
          <FormBuilder removeEntry={this.removeEntry} form={form} showResults={this.showResults} handleChange={this.handleChange} />
        </div>
        {/* <div className='bottom-nav'>
        <Button onClick={this.saveform}>Save Form</Button>
        <Button onClick={this.reuseForm}>use Saved Form</Button>
        <Button onClick={this.resetCurrentForm}>Reset Form</Button>
        </div> */}
        {
          !!this.state.parsing &&
            ( <div className='result-form'>
                <ParseForm form={this.state.form} />
            </div> )
        }


      </div>
    );
  }

}

export default Home;