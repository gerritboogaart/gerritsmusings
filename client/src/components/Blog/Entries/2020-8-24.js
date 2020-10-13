import React from 'react';

export default (
  <React.Fragment>
    <div className='blog-date'>2020-09-25</div>
    <div className='blog-main-text'>
      <h1>Map, Reduce, and Filter</h1>
    Even though I love to use Lodash's map, reduce, and filter, sometimes in life you have no choice and you find yourself forced to use vanilla JS. Let's face it: working in pure JavaScript can be awesome in my opinion.
    <hr />
    JavaScript has a some really powerful native functions. Three of my favorites functions are map, reduce and filter.<br />
    The difference between 'map' and 'reduce' is that map will always return an array of the length of the array you are sending. [1,2,3].map(n => n + 1).length will return 3. Even if you would try this: [1,2,3].map(n => undefined).length, the return will still be 3. It will be [undefined, undefined, undefined].
    Of course, you can use Lodash if you need to iterate over an object, which native JS does not allow directly. Here I'm focussing on regular, pure JS.
    The fact you can chain these functions is an added bonus that is very powerful. Although, I do find that if you use reduce in a clever way, you can often leverage the reduce function and filter inside of it.
    Working with map and React is simply amazing because mapping makes it super easy to return a list of JSX:
    <p />
    Here is an example using a simple groceries list: const list = ['Potato', 'Apple', 'Orange'];
    <div className='code-block'>
        <p>{`return list.map( item => <li key={item}>item</li>)`}</p>
    </div>
    It's that simple!<br />
    React is nice because if you want to filter all groceries with the letter 'p' in it. You can still use map, and React will ignore the undefined items in the list.
    So you don't need to:
    <div className='code-block'>
        <p>{`return list.filter((item => item.toLowerCase().includes('p'))).map( filteredItem => <li key={filteredItem}>item</li>)`}</p>
    </div>
    You can simply
    <div className='code-block'>
        <p>{`return list.map( item => { if ( item.toLowerCase().includes('p')) return <li key={filteredItem}>item</li> })`}</p>
    </div>
    You can also reduce the list. Using reduce would be a little bit verbose, but will give you the right array length.
    <div className='code-block'>
        <p>{`return list.reduce( (acc, item) => {`}</p>
        <p className='indent1'>{`if ( item.toLowerCase().includes('p')) acc.push(item);`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, [])`}</p>
    </div>
    As you can see in the example, using reduce in this case might seem a bit lengthy, but this example shows that you can give the reduce function a default type like an array, object or a number. This function will then return any type you want. For example:
    <div className='code-block'>
        <p>{`return list.reduce( (acc, item) => {`}</p>
        <p className='indent1'>{`if ( item.toLowerCase().includes('p')) acc[item] = 1;`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, {})`}</p>
    </div>
    it would return:
    <div className='code-block'>
        <p>{`{ Potato: 1, Apple: 1 }`}</p>
    </div>
    This functionality is quite powerful. You can do additions, subtractions, counts, or any other manipulation on the elements in the array you pass into the reduce function.<br />
    Something nice you can do in Lodash's reduce function that regular JavaScript does not allow, is that you can iterate over an object. You can find both key and value of the itterator. The first argument is the accumulator, the second one is the value, the third argument is the key if you iterate over an object, and the index when iterating over an array. If you pass in a fourth argument you get the entire collection.
    Lodash allows nice and quick mapping to an object while filtering at the same time.
    <div className='code-block'>
        <p>{`const obj = { Potato: 1, Apple: 2, Banana: 3 }`}</p>
        <p>{`const pricing = { Potato: 0.25, Apple: 0.75, Banana: 1 }`}</p>
        <p>{`return reduce(obj, (acc, value, key) => {`}</p>
        <p className='indent1'>{`if ( key.toLowerCase().includes('p') && pricing[key]) acc[key] = value * pricing[key];`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, {})`}</p>
    </div>
    Above code would return (remember that this function returns an object, and order is not constant in objects):
    <div className='code-block'>
        <p>{`{Potato: 0.25, Apple: 1.5}`}</p>
    </div>
    If you would like to see this in React as a list, this is possible, but you will have to make the 'obj' object into an array first, and return an array with the JSX elements:
    <div className='code-block'>
        <p>{`const obj = { Potato: 1, Apple: 2, Banana: 3 }`}</p>
        <p>{`const pricing = { Potato: 0.25, Apple: 0.75, Banana: 1 }`}</p>
        <p>{`return Object.entries(obj).reduce(acc, [item, qty]) => {`}</p>
        <p className='indent1'>{`if ( key.toLowerCase().includes('p') && pricing[item]) acc.push(<li key={item}>{item} - $ {qty * pricing[item]}</li>)`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, [])`}</p>
    </div>
    which nicely returns a usable:
    <div className='code-block'>
        <p>{`["<li key='Potato'>Potato - $ 0.25</li>", "<li key='Apple'>Apple - $ 1.5</li>"]`}</p>
    </div>
    <br />
    </div>
</React.Fragment>
);