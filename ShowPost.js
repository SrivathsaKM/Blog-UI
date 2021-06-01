import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const ShowPost = (props) => {
  const { id } = props.match.params;

  const [userName, setUserName] = useState({});
  const [singlePost, setSinglePost] = useState({});
  const [singlePostCommands, setSinglePostCommands] = useState([]);
  const [loading, setLoading] = useState(true);

  //For Single Post
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        const result = response.data;
        setSinglePost(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  //For userName (here singlePost array dependency is imp)
  useEffect(() => {
    if (singlePost.userId > 0) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${singlePost.userId}`)
        .then((response) => {
          const result = response.data;
          setUserName(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [singlePost]);

  //For Comments
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => {
        const result = response.data;
        setSinglePostCommands(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>USER NAME : {userName.name}</h1>
          <h2>TITLE : {singlePost.title}</h2>
          <h3>BODY : {singlePost.body}</h3>
          <hr />
          <h2>COMMENTS</h2>
          <ul>
            {singlePostCommands.map((commands) => {
              const { id, body } = commands;
              return <li key={id}>{body}</li>;
            })}
          </ul>
          <Link to={`/users/${singlePost.userId}`}>More posts of author : {userName.name}</Link>
          <br />
          <br />
          <Link to={'/posts'}>
            <button>Back to Posts</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default ShowPost;
