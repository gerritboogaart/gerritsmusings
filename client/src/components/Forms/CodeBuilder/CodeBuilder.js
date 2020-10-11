import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import copy from 'copy-to-clipboard';
import './CodeBuilder.css';

const CodeBuilder = ({form}) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    if (options && !form.some(item => item.type === 'dropdown')) setOptions(undefined)
  }, [form.length, form, options])

  const codeRender = () => {
    if (!form) return <div />;
    const ret =  map(form, (item, i) => {
      switch (item.type) {
        case 'input':
          return (
            <p key={`${i}type`} className='indent3'>
            {`<Input label='${item.label}' onChange={(e) => handleChange(e)} />`}
            </p>
          )
        case 'text':
          return (
            <p key={`${i}type`} className='indent3'>
              { item.options ? `<TextArea placeholder='${item.options}' onChange={(e) => handleChange(e)} /></li>` : `<TextArea onChange={(e) => handleChange(e)} /></li>`}
            </p>

          )
        case 'dropdown':
          if (!options) {
            setOptions(item.options)
          };
          return (
            <p key={`${i}type`} className='indent3'>
            {`<Dropdown
              placeholder=${item.label}
              selection
              selected={dropDownValue}
              options={options}
              onChange={(e => setDropDownValue(e)}
            />`}
            </p>
          )
        default:
            return <div />
      }
    });
    ret.push((
      <p key='submit' className='indent3'>{`<Button className='submit-button' onClick={() => callback()} >Submit</Button>`}</p>
    ));

    return ret;

  }

  const renderOptions = () => {
    const res = [];
    res.push(<p key='1' className='indent1'>{`const options = [`}</p>);
    const lines = map(options, (line, i) => {
      const comma = i === options.length - 1 ? '' : ',';
      return <p key={`${i}dd`} className='indent2'>{`{ key: '${line}', text: '${line}', value: '${line}' }${comma}`}</p>
    })
    res.push(...lines);
    res.push(<p key='2'className='indent1'>{`]`}</p>)
    return res;
  }

  const copyText = () => {
    const text = document.getElementById('code-output').innerText;
    copy(text)
  }

  return (
    <div className='code-builder'>
      <Icon className='copy-icon' name='copy outline' link onClick={copyText} />
      <div id='code-output' className='code-block'>
      <p>{`import React, {useState} from 'react';`}</p>
      <p>{`import { Input, TextArea, Dropdown, Form, Button } from 'semantic-ui-react';`}</p>
      <br />
      <p>{`const formRender = () => {`}</p>
      <p className='indent1'>{`const [formValue, setFormValue] = useState(); `}</p>
      {options && <p className='indent1'>{`const [dropDownValue, setDropDownValue] = useState();`}</p>}
      <p />
      <p className='indent1'>{`handleChange = (e, {value}) => setFormValue(value)`}</p>
      <p />
      {options && renderOptions()}
      <p />
      <p className='indent1'>{`return (`}</p>
      <p className='indent2'>{`<Form>`}</p>
      {codeRender()}
      <p className='indent2'>{`</Form>`}</p>
      <p className='indent1'>{`)`}</p>
      <p>{`}`}</p>
      </div>

    </div>
  );
};

export default CodeBuilder;