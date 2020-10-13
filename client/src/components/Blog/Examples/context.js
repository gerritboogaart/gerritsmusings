/* eslint no-unused-vars: 0 */
import React from "react";

const Context = React.createContext();

const names = [
  { firstName: 'Jessica' },
  { firstName: 'Alfredo' },
  { firstName: 'Maria' },
  { firstName: 'Ahmed' },
  { firstName: 'Charles' },
  { firstName: 'Isabella' }
];

const nameBuilder = (firstName, lastName, birthday, pob, rating) => {
  return {
    firstName, lastName, birthday, pob, rating
  }
}

class AppContextProvider extends React.Component {
  state = {
    names: JSON.parse(localStorage.getItem('nameList')) || names,
    selectedName: undefined
  };



  addName = name => {
    const { names } = this.state;
    this.setState({ names: names.push(name) });
  };

  selectName = index => this.setState({ selectedName: index })

  updateName = async ({firstName, lastName, birthday, pob, rating}, index) => {
    const { names } = this.state;
    const updates = nameBuilder(firstName, lastName, birthday, pob, rating);
    names[index] = updates;
    await localStorage.setItem('nameList', JSON.stringify(names));
    this.setState({ names })

  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          actions: {
            addName: this.addName,
            selectName: this.selectName,
            updateName: this.updateName
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default { Provider: AppContextProvider, Consumer: Context.Consumer };