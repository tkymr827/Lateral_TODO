import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard'
import List from '../list/list'
import Post from '../post/post'

const App: React.FC = () => {
    const hoge = 'testtt11';

    return (
        <Router>
            <h1>{hoge}</h1>
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
        </Router>
    )
}

if (document.getElementById('app')) {
    render(<App />, document.getElementById('app'))
}
