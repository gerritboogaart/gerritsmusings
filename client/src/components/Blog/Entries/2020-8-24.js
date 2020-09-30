import React from 'react';

export default (
  <React.Fragment>
    <div className='blog-date'>2020-09-25</div>
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
    Example of creating a simple list. Say you have a list: const groceries = ['Potato', 'Apple', 'Orange'];
    <div className='code-block'>
        <p>{`return list.map( item => <li key={item}>item</li>)`}</p>
    </div>
    It's that simple!<br />
    Now React is super nice that if you want to filter all groceries with the letter 'p' in it, you can still use map, and React will ignore the empty




    <br />


</React.Fragment>
);