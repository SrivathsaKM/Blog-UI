import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Posts = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      const result = response.data;
      setAllPosts(result);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Listing Posts - ({allPosts.length})</h1>
          <ul>
            {allPosts.map((posts) => {
              const { id, title } = posts;
              return (
                <li key={id}>
                  <Link to={`/posts/${id}`}> {title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Posts;
