import React from 'react';

export default (
  <React.Fragment>
    <div className='blog-date'>2020-09-25</div>
    <div className='blog-main-text'>
      <h1>Filter, Reduce, and Map</h1>
    Even though I love to use lodash' filter, map, and reduce, if only because you can hand these wonderful functions an object instead of only an array.
    But sometimes in life you have no choice, and let's face it: working in pure JS is awesome.
    <hr />
    JavaScript has a couple of crazy powerful native functions, three of my favorites are map, reduce and filter.<br />
    The difference between a map and reduce is that map will always return an array of the length of the array you are sending. [1,2,3].map(n => n + 1).length will return 3. Even if you'd say [1,2,3].map(n => undefined).length; it will still be 3. It will be [undefined, undefined, undefined]
    Of course, you can use lodash if you need to iterate over an object, which native JS doesn't allow directly. But here I'm focussing on regular, pure JS.
    The fact you can chain them in an added bonus that is super powerful. Although I do find that if you use reduce in a nifty way, often you can leverage the reduce function and filter in it.
    Working with map and React is simply amazing because it makes it super easy to return JSX:
    <p />
    Example of creating a simple list. Say you have a list: const list = ['Potato', 'Apple', 'Orange'];
    <div className='code-block'>
        <p>{`return list.map( item => <li key={item}>item</li>)`}</p>
    </div>
    It's that simple!<br />
    Now React is super nice that if you want to filter all groceries with the letter 'p' in it, you can still use map, and React will ignore the empty / undefined items in the list.
    So you don't need to:
    <div className='code-block'>
        <p>{`return list.filter((item => item.toLowerCase().includes('p'))).map( filteredItem => <li key={filteredItem}>item</li>)`}</p>
    </div>
    You can simply
    <div className='code-block'>
        <p>{`return list.map( item => { if ( item.toLowerCase().includes('p')) return <li key={filteredItem}>item</li> })`}</p>
    </div>
    You can also reduce it, because reduce is awesome. It would be a little bit more verbose, but will give you the right array length.
    <div className='code-block'>
        <p>{`return list.reduce( (acc, item) => {`}</p>
        <p className='indent1'>{`if ( item.toLowerCase().includes('p')) acc.push(item);`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, [])`}</p>
    </div>
    This would be a bit overkill for reduce, but this example shows you can use have reduce to return any type you want. If you'd say:
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
    Which is quite powerful if you want to do adds, substractions, counts, or any other manipulation.<br />
    Something nice you can do in lodash' reduce function vs regular javascript, is that you can iterate over an object and actually easilly find both key and value of the itterator:
    You could do some nice and quick mapping to another object while filtering at the same time.
    <div className='code-block'>
        <p>{`const obj = { Potato: 1, Apple: 2, Banana: 3 }`}</p>
        <p>{`const pricing = { Potato: 0.25, Apple: 0.75, Banana: 1 }`}</p>
        <p>{`return reduce(obj, (acc, value, key) => {`}</p>
        <p className='indent1'>{`if ( key.toLowerCase().includes('p') && pricing[key]) acc[key] = value * pricing[key];`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, {})`}</p>
    </div>
    would return (mind you that since this returns an object, the order is not constant):
    <div className='code-block'>
        <p>{`{Potato: 0.25, Apple: 1.5}`}</p>
    </div>
    If you'd like to see that in React as a list, you can do that, but then you'll have to make the 'obj' object into an array first and return an array as well so you can use JSX the way it was meant to be used:
    <div className='code-block'>
        <p>{`const obj = { Potato: 1, Apple: 2, Banana: 3 }`}</p>
        <p>{`const pricing = { Potato: 0.25, Apple: 0.75, Banana: 1 }`}</p>
        <p>{`return Object.entries(obj).reduce(acc, [key, value]) => {`}</p>
        <p className='indent1'>{`if ( key.toLowerCase().includes('p') && pricing[key]) acc.push(<li>{key} - $ {value * pricing[key]}</li>)`}</p>
        <p className='indent1'>{`return acc`}</p>
        <p>{`}, [])`}</p>
    </div>
    which nicely returns a usable:
    <div className='code-block'>
        <p>{`["<li>Potato - $ 0.25</li>", "<li>Apple - $ 1.5</li>"]`}</p>
    </div>
    <br />
    </div>
</React.Fragment>
);