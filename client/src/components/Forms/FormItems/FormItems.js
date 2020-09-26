import React, { Component } from 'react';
import { Button, Icon, Modal, Input, TextArea } from 'semantic-ui-react';

// const addFormItem = type => {
//   const form = localStorage.getItem('form') || {};
//   const i = Object.keys(form).length;
//   const newForm = { ...form, [`${type}${i + 1}`]: { type: type, default: '' }};
//   localStorage.setItem('form', JSON.stringify(newForm));
// }

export class FormItems extends Component {

  state = { textmodal: false, inputmodal: false, ddmodal: false };

  handleOpen = (type) => {
    switch (type) {
      case 'text': 
        this.setState({ textmodal: true });
        break;
      case 'input': 
        this.setState({ inputmodal: true });
        break;
      case 'dropdown': 
        this.setState({ ddmodal: true });
        break;
      default: return;
    }
  }

  changeLabel = (e, { value }) => this.setState({ textlabel: value });

  addText = () => {
    this.props.addFormItem('input', this.state.textlabel);
    this.handleClose();
  }

  addTextArea = () => {
    this.props.addFormItem('text', this.state.textlabel);
    this.handleClose();
  }
  addDropDown = () => {
    this.props.addFormItem('dropdown', this.state.textlabel);
    this.handleClose();
  }

  handleClose = () => this.setState({ textmodal: false, inputmodal: false, ddmodal: false });



  handleStart = () => console.log('start');

  render() {
    // const { addFormItem } = this.props;
    return (
      <div>
         <Modal
          trigger={<Button draggable='true' className="form-items" onClick={() => this.handleOpen('input')}>Text Input</Button>}
          open={this.state.inputmodal}
          onClose={this.handleClose}
          size='small'
        >
          <Modal.Content>
            please give a label: <Input name='lextlabel' onChange={this.changeLabel} label='please give a label to the input' />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={() => this.addText()} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          trigger={<Button className="form-items" onClick={() => this.handleOpen('text')}>Text Area</Button>}
          open={this.state.textmodal}
          onClose={this.handleClose}
          size='small'
        >
          <Modal.Content>
            please give a label: <Input name='lextlabel' onChange={this.changeLabel} label='please give a label to the text area' />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.addTextArea} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          trigger={<Button className="form-items" onClick={() => this.handleOpen('dropdown')}>Dropdown</Button>}
          open={this.state.ddmodal}
          onClose={this.handleClose}
          size='small'
        >
          <Modal.Content>
            please give a label: 
              <Input name='lextlabel' onChange={this.changeLabel} label='please give a label to the dropdown' />
              <br />
              <TextArea name='' />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.addDropDown} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default FormItems;