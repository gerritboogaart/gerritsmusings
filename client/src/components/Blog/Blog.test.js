import React from 'react';
import Blog from './Blog';
import { BrowserRouter } from 'react-router-dom';

describe('RenderHeaders component', () => {
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line no-undef
    wrapper = shallow(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>);
  });

  it('renders without crashing', () => {
    console.log(wrapper.instance().blogType)
    expect(wrapper.length).toEqual(1);
  });
});