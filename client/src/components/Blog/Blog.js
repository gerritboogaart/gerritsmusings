import React, { useState, useEffect } from 'react';
import './Blog.css';
import BlogEntry from './Entries/2020-8-23';
import SecondBlog from './Entries/2020-8-24';

const BLOGS = {
  context: () => BlogEntry,
  filter: () => SecondBlog
}
const Blog = () => {
  const [blogType, setBlogType] = useState('context');
  const [blog, setBlogView] = useState(BlogEntry);

  useEffect(() => {
    setBlogView(BLOGS[blogType]);
  }, [blogType])

  return (
    <div className='blog-page'>
      <div className='blog-list'>
        <li className='blog-item' onClick={() => setBlogType('context')}>Musings on Context</li>
        <li className='blog-item' onClick={() => setBlogType('filter')}>Musings on reduce and map</li>
      </div>
      <div className='blog-entry'>
        {blog}
      </div>
      <div className='comment-area'>


      </div>

    </div>
  );
};

export default Blog;