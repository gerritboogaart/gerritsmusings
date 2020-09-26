import React, { Component } from 'react';
import { get, clone, map } from 'lodash';
import { Button, Input, Popup } from 'semantic-ui-react';
import './Edit.css';


export class Edit extends Component {
  state = { form: [], elements: [], current: undefined };

  componentDidMount() {
    console.log('clicked on edit basically');
    this.getFormForEdit();
  }

  getFormForEdit = () => {
    const form = JSON.parse(localStorage.getItem('form'));
    console.log(form);
    this.setState({ elements: form });
  }


  addFormItem = (type, label) => {
    // const form = localStorage.getItem('form') || {};
    const { form } = this.state;
    // const i = form.length;
    // const newForm = { ...form, [`${type}${i + 1}`]: { type: type, default: '' } };
    form.push({ type, default: '', label });
    this.setState({ form });
    //localStorage.setItem('form', JSON.stringify(newForm));
  };

  saveform = () => {
    const elements = clone(this.state.elements);
    const form = map(elements, element => {
      delete element.element;
      return element;
    })
    localStorage.setItem('form', JSON.stringify(form));
  }

  reuseForm = () => {
    const form = JSON.parse(localStorage.getItem('form'));
    this.setState({ form });
  }

  resetCurrentForm = () => {
    this.setState({ elements: [] });
  };

  allowDrop = (ev) => {
    ev.preventDefault();
  }

  dragIn = (ev, i) => {
    ev.dataTransfer.setData("type", ev.target.attributes.getNamedItem("type").value);
    this.setState({ current: [ev.target], index: i });
  }

  drag = (ev) => {
    ev.dataTransfer.setData("type", ev.target.attributes.getNamedItem("type").value);
    this.setState({ current: [ev.target] });
  }

  drop = (ev) => {
    ev.preventDefault();
    var type = ev.dataTransfer.getData("type");
    const newEl = clone(this.state.elements) || [];
    let label;
    const { index } = this.state;
    if (index > -1) {
      label = newEl[index].label;
      newEl.splice(index, 1);

    }
    const element = { element: this.state.current[0], x: ev.clientX, y: ev.clientY, type, label };
    newEl.push(element);

    this.setState({ elements: newEl, index: undefined });
  }

  setLabel = (i) => {
    const elements = clone(this.state.elements);
    const element = elements[i];
    const label = this.state.currentLabel || '';
    const newEl = { ...element, label };
    elements[i] = newEl;
    this.setState({ elements, [`isOpen${i}`]: false });

  }

  changeLabel = (e, { value }) => this.setState({ currentLabel: value });

  handleOpen = (i) => this.setState({ [`isOpen${i}`]: true })

  handleClose = (i) => this.setState({ [`isOpen${i}`]: false })


  handleTypes = (type, i) => {
    switch (type) {
      case 'input':
        return (
          <Popup
            content={(
              <React.Fragment>
                <Input
                  type='text'
                  onChange={this.changeLabel}
                  placeholder='please set a label'
                >
                </Input>
                <Button onClick={() => this.setLabel(i)}>Set label</Button>
              </React.Fragment>
            )}
            on='click'
            open={this.state[`isOpen${i}`]}
            onClose={() => this.handleClose(i)}
            onOpen={() => this.handleOpen(i)}
            trigger={<div type='input' className='form-input' draggable="true" onDragStart={(event) => this.dragIn(event, i)} />}
          />
        );
      default:
        return 'No default';
    }
  }

  drawElements = () => {
    if (!get(this.state, 'elements')) return <div />
    return this.state.elements.map((element, i) => {
      return (
        <div
          key={`${i}form`}
          style={{ position: 'absolute', top: element.y, left: element.x, width: '100px', height: '25px' }}
        >

          {element.label &&
            <span className='smallLabel'>{element.label}</span>

          }
          {this.handleTypes(element.type, i)}
          <span onClick={() => this.removeElement(i)}>[x]</span>
        </div>
      )
    })
  }

  removeElement = i => {
    const elements = clone(this.state.elements);
    elements.splice(i, 1);
    this.setState({ elements });
  }
  render() {
    // console.log(this.state);
    return (
      <div className="home">
        <div className='top-nav'>
          Drag your form<br />
          Usable items:<br />
          {/* // <FormItems addFormItem={this.addFormItem} /> */}
          <div type='input' className='form-input' draggable="true" onDragStart={(event) => this.drag(event)} />

        </div>

        <div id="div1" className='form' onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>

          {this.drawElements()}

        </div>
        {/* <div className='form' onDrop={(e) => this.handleDrop(e)}  > */}


        <div className='bottom-nav'>
          <Button onClick={this.saveform}>Save Form</Button>
          <Button onClick={this.reuseForm}>use Saved Form</Button>
          <Button onClick={this.resetCurrentForm}>Reset Form</Button>
        </div>

      </div>
    );
  }

}

export default Edit;