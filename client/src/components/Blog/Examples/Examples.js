import React from "react";
import Names from './Components/Names/Names';
import EditArea from "./Components/EditArea/EditArea";

import AppContext from './context';
import './Examples.css';


class Examples extends React.Component {

  render() {
    return (
      <AppContext.Provider>
        <div className="examples">
          <Names />
          <EditArea />
        </div>
      </AppContext.Provider>

    );
  }
}

export default Examples;