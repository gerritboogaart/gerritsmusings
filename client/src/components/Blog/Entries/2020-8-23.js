
import React from 'react';
import { Link } from 'react-router-dom';

export default (
  <React.Fragment>
    <div className='blog-part'>
      <div className='blog-date'>2020-08-23</div>
      <h1>An example of how to use the ReactJS Context api</h1>
      These are my musings on Context in React.
    <hr />
      Here, I will investigate the use of React Context.
      I am interested in what I will learn :)
    <br />
      I'm testing Context  <Link style={{ color: 'blue' }} to="/examples">if you click this link</Link>.
      It actually works pretty well.
      In this example, I used Context to update a person's attribute.  When you click on a person, you can update several fields and properties.
      You can also add a rating (because Semantic is so cool). The birth date is a simplification of datepicker.
    <br />
      Q: What was I trying to solve? A: I am attempting to find out if I prefer Context or Redux when creating dynamic components.

    <h5 className='blog-bold'>Context TLDR:</h5>
      Context is pretty cool, and once set up, it is pretty powerful. I am still not sure if it's better or worse than redux.
    <h5>React Context, the long answer</h5>
      How did I go about all this? First, I knew I wanted a simple react app with two panels. One panel that shows a list of names. This pane will display a simple array of objects with firstName, lastName, birth date, home town, and rating.
      Then, I figured the list needs to be clickable. When you click on a person, the person becomes 'selected', and the right panel will show a form with the attributes of the selected person as inputs.
      I wanted to achieve this without 'drilling' of props. In comes 'Context'. ReactJS has a feature called React.CreateContext() that allows you to use Context.
  <br />
      How to setup and use Context:
  <br />
      In your freshly created React app, create a file called context.js (or whatever you think works well as a name).

    <div className='code-block'>
        <p>import React from "react";</p>
        <p>const Context = React.createContext();</p>
      </div>
      <div className='blog-text'>
        To keep the example easy, I created a simple array called names that looks like this: {`[{firstName: 'Jessica'}, {firstName: 'Charlie'},...]`}. In the example I save changed data in the localStorage so I can see what I did.
    <br />Then you declare your AppContextProvider:
    </div>

      <div className='code-block'>
        <p>{`class AppContextProvider extends React.Component {`}</p>
        <p className='indent1'>{`state = {`}</p>
        <p className='indent2'>names: JSON.parse(localStorage.getItem('nameList')) || names,</p>
        <p className='indent2'>selectedName: undefined</p>
        <p className='indent1'>{`};`}</p>
        <br />
        <p className='indent1'>{`selectName = index => this.setState({ selectedName: index })`}</p>
      </div>

      <div className='blog-text'>
        All your functions, or <span className='blog-bold'>actions</span> go in here. When you have done this,  you get to the core of the magic: you render this.props.children inside a wrapper. That is why stuff needs to get wrapped later.
        This will cause state to be updated and therefore, will keep your page in the correct state.
        <br />Pro tip: don't forget <span className='blog-bold'>{`{this.props.children}`} because nothing will be rendered in your child Component...</span>
      </div>
      <div className='code-block'>
        <p>{`render() {`}</p>
        <p className='indent1'>return (</p>
        <p className='indent2'>{`<Context.Provider`}</p>
        <p className='indent3'>{`value={{`}</p>
        <p className='indent4'>...this.state,</p>
        <p className='indent4'>{`actions: {`}</p>
        <p className='indent5'>addName: this.addName,</p>
        <p className='indent5'>selectName: this.selectName,</p>
        <p className='indent5'>updateName: this.updateName</p>
        <p className='indent4'>{`},`}</p>
        <p className='indent3'>{`}}`}</p>
        <p className='indent2'>{`>`}</p>
        <p className='indent3'>{`{this.props.children}`}</p>
        <p className='indent2'>{`</Context.Provider>`}</p>
        <p className='indent1'>{`);`}</p>
        <p>{`export default { Provider: AppContextProvider, Consumer: Context.Consumer };`}</p>
      </div>
      <div className='blog-text'>
        Context.Provider has as values 'this.state' and 'actions' in my example. In my example you can call names and selectedName from state, and addName, selectName, and updateName from actions. for example: actions.selectName would run above function {`selectName = index => this.setState({ selectedName: index })`}
        <br />
        To make this actually work in your app, the components that use Context have to be wrapped in a Provider. I added this wrapper in App.js. The state and actions from the context provider can be used in Names and EditArea becuase they are wrapped in the provider in the code below.

    </div>
      <div className='code-block'>
        <p>{`render() {`}</p>
        <p className='indent1'>return (</p>
        <p className='indent2'>{`<Context.Provider`}</p>
        <p className='indent3'>{`<div className="examples">`}</p>
        <p className='indent4'>{`<Names />`}</p>
        <p className='indent4'>{`<EditArea />`}</p>
        <p className='indent3'>{`</div>`}</p>
        <p className='indent2'>{`</Context.Provider>`}</p>
        <p className='indent1'>{`);`}</p>
        }

    </div>

    <div className='blog-text'>
        Now you can use the Context in Names and EditArea like this:
    </div>
    <div className='code-block'>
      <p>{`import React from "react";`}</p>
      <p>{`import AppContext from "../../context";`}</p>
      <br />
      <p>{`const Names = ({ names, actions }) => {`}</p>
      <p className='indent1'>{`names.map((name, i) => (`}</p>
      <p className='indent1'>{`<li  key={name.firstName + i} className='names' onClick={() => actions.selectName(i)}>{name.firstName}</li>`}</p>
      <p>{`)}`}</p>
      <br />
      <p>{`export default () => (`}</p>
      <p className='indent1'>{`<AppContext.Consumer>`}</p>
      <p className='indent2'>{`{({ names, actions }) => <Names names={names} actions={actions} />}`}</p>
      <p className='indent1'>{`</AppContext.Consumer>`}</p>
      <p>)</p>
    </div>
    <div className='blog-text'>
        The cool thing is, if I click on the first name, actions.selectName in context.js gets called, which updates the state with <span className='blog-bold'>
        {`selectName = index => this.setState({ selectedName: index })`}</span>
        <br />To make this change appear on the right side, I coded EditArea to only display anything if selectedName is not undefined.
         The code following is a simplified version. I am using Hooks in this example to show how Hooks and Context mix quite well together.
    </div>
    <div className='code-block'>

      <p>{`import React from "react";`}</p>
      <p>{`import AppContext from "../../context";`}</p>
      <p />
      <p>{`const EditArea = ({ names, selectedName, actions }) => {`}</p>
      <p className='indent1'>{`const [firstName, setFirstName] = useState('');`}</p>
      <p className='indent1'>{`const [index, setIndex] = useState(selectedName);`}</p>
      <p />
      <p className='indent1'>{`useEffect(() => {`}</p>
      <p className='indent2'>{`if (index !== selectedName) {`}</p>
      <p className='indent3'>{`setIndex(selectedName);`}</p>
      <p className='indent3'>{`setFirstName(names[selectedName].firstName || '');`}</p>
      <p className='indent2'>{`}`}</p>
      <p className='indent1'>{`})`}</p>
      <p />
      <p className='indent1'>{` return (`}</p>
      <p className='indent2'>{`<div className='edit-area'>`}</p>
      <p className='indent3'>{`{!names[selectedName]`}</p>
      <p className='indent4'>{`? <><span style={{ color: 'gray' }}>Select a name on the left to edit</span> <br /></>`}</p>
      <p className='indent4'>{`: (`}</p>
      <p className='indent5'>{`<div className='edit-name'>`}</p>
      <p className='indent5'>{` {names[selectedName].firstName}`}</p>
      <p className='indent5'>{`<li>`}</p>
      <p className='indent6'>{`<Input icon='users' iconPosition='left' placeholder='Enter name' value={firstName}  onChange={(e) => {setFirstName(e.target.value);}}/>`}</p>
      <p className='indent5'>{`</li>`}</p>
      <p className='indent4'>{`</div>`}</p>
      <p className='indent3'>{`)`}</p>
      <p className='indent2'>{`}`}</p>
      <p className='indent2'>{`</div>`}</p>
      <p className='indent1'>{`)`}</p>
      <p>{`}`}</p>
      <p />
      <p>{`export default () => (`}</p>
      <p className='indent1'>{`<AppContext.Consumer>`}</p>
      <p className='indent2'>{`{({ names, selectedName, actions }) => <EditArea names={names} selectedName={selectedName} actions={actions} />}`}</p>
      <p className='indent1'>{`</AppContext.Consumer>`}</p>
      <p>{`)`}</p>
    </div>
    </div>
  </React.Fragment>



)