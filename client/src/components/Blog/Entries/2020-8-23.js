
import React from 'react';
import { Link } from 'react-router-dom';

export default (
  <React.Fragment>
    <div className='blog-part'>
      <div className='blog-date'>2020-08-23</div>
      <h1>An example of how to use the ReactJS Context api</h1>
      These are my musings on Context in react
    <hr />
      In here I will investigate the use of React Context. When to use it, and how otherwise to do it.
      I'm interested myself what I'll learn :)
    <br />
      I'm testing context  <Link style={{ color: 'blue' }} to="/examples">if you click this link</Link>. It actually works pretty well.
      In this example I used context to simply update a person's attribute; when you click on a person, you can add / remove last name, birth date, edit the first name, or add a hometown.
      For posterity you can add a rating, because Semantic is so cool. The birth date is a simplification of datepicker.
    <br />
      Q: What was I trying to solve? A: What is all the Context fuzz about?

    <h5 className='blog-bold'>Context TLDR:</h5>
      It's pretty cool, and once set up, it's pretty powerful. I am still not sure if it's better or worse than redux.
    <h5>React Context, the long answer</h5>
      How did I go about all this. First I knew I wanted a simple react app with two panels. One that lists the names: a simple array of objects with firstName, lastName, birth date, home town, and rating.
      Then i figured the list needs to be clickable so that when a person is clicked, it becomes selected, and the right panel will show a form with the attributes in inputs.
      I wanted to achieve this without 'drilling' of props. In comes 'Context'. ReactJS has this thing called React.CreateContext() that I was happy to use.
  <br />
      Start:
  <br />
      In your freshly created React app. Create a file called context.js (or whatever you think works well as a name).

    <div className='code-block'>
        <p>import React from "react";</p>
        <p>const Context = React.createContext();</p>
      </div>
      <div className='blog-text'>
        For simplicity sake, i created a simple array called names that looks like this: {`[{firstName: 'Hank'}, {firstName: 'Charles'},...]`}. In the example I let stuff save in the localStorage so I can see what I did.
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
        All your functions, or <span className='blog-bold'>actions</span> go in here. Then comes the whole point of the magic: you render this.props.children inside a wrapper. That's why stuff needs to get wrapped later.
    Pro tip: don't forget <span className='blog-bold'>{`{this.props.children}`} cause nothing will be rendered in your child Component...</span>
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
        As you can see from the example, Context.Provider has as value: this.state and actions in my example. In my example you can call names and selectedName from state, and addName, selectName, and updateName from actions. for example: actions.selectName would run above function {`selectName = index => this.setState({ selectedName: index })`}
        <br />
        To make this actually work in your app, you have to wrap the component you want to use your context in with this: (App.js for example). In this case, the state and actions from the context provider can be used in Names and EditArea.

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
        Now you can use the context in Names and EditArea like this:
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
        So the cool thing is, if i click on the first name, actions.selectName in context.js gets called, which updates the state with <span className='blog-bold'>
        {`selectName = index => this.setState({ selectedName: index })`}</span>
        <br />So to make this appear on the right side, I coded EditArea to only display anything if selectedName is not undefined. The code following is a simplified version, but you get the drift. I'm using hooks to show hooks and context mix quite well

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