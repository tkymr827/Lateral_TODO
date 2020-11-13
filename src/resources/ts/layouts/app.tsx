import React, { useState, useEffect, createContext } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import List from '../list/list';
import Post from '../post/post';
import Setting from '../setting/setting';

import GlobalMenu from './global_menu';

const initialState = {
    id: '',
    name: '',
    email: '',
};

export const User = createContext(initialState);

const App: React.FC = () => {
    const [user, setUser] = useState(initialState);
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
        <Router>
            <User.Provider value={user}>
                <GlobalMenu />
                <main>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/list" component={List} />
                        <Route path="/post" component={Post} />
                        <Route path="/setting" component={Setting} />
                    </Switch>
                </main>
            </User.Provider>
        </Router>
    );
};

if (document.getElementById('app')) {
    render(<App />, document.getElementById('app'));
}
