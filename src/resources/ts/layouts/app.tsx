import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import List from '../list/list';
import Post from '../post/post';

import GlobalMenu from './global_menu';

const App: React.FC = () => {
    const [user, setUser] = useState({ name: '' });
    const [menu_open, setMenu_Open] = useState(false);
    useEffect(() => {
        const getUsername = async () => {
            try {
                const response = await axios.get('/api/user_auth');
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getUsername();
    }, []);

    return (
        <>
            <nav className="nav">
                <div className="nav_left">
                    <a href="#">TodoList</a>
                </div>
                <div className="nav_right">
                    <div className="user_name">{user.name}</div>
                    <div className="menu_btn" onClick={() => setMenu_Open(state => !state)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            {menu_open && <GlobalMenu />}
            {/* <Router>
                <ul>
                    <Link to="/list">
                        <li>LIST</li>
                    </Link>
                    <Link to="/post">
                        <li>POST</li>
                    </Link>
                </ul>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/list" component={List} />
                    <Route path="/post" component={Post} />
                </Switch>
            </Router> */}
        </>
    );
};

if (document.getElementById('app')) {
    render(<App />, document.getElementById('app'));
}
