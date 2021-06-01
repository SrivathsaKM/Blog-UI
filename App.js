import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './Home';
import Users from './Users';
import Posts from './Posts';
import ShowUser from './ShowUser';
import ShowPost from './ShowPost';

const App = (props) => {
  return (
    <div style={{ fontFamily: 'Arvo, serif' }}>
      <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none' }}>
        <li>
          <Link to='/' style={{ textDecoration: 'none', padding: '0.5em' }}>
            Home
          </Link>
        </li>
        |
        <li>
          <Link to='/users' style={{ textDecoration: 'none', padding: '0.5em' }}>
            Users
          </Link>
        </li>
        |
        <li>
          <Link to='/posts' style={{ textDecoration: 'none', padding: '0.5em' }}>
            Posts
          </Link>
        </li>
      </ul>
      <Route path='/' component={Home} exact={true} />
      <Route path='/posts' component={Posts} exact={true} />
      <Route path='/posts/:id' component={ShowPost} />
      <Route path='/users' component={Users} exact={true} />
      <Route path='/users/:id' component={ShowUser} />
    </div>
  );
};

export default App;
