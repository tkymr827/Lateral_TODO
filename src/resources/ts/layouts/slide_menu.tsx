import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

const SlideMenu: React.FC = () => {
    const logout = () => {
        try {
            const response = axios.post('/api/logout');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="globalmenu">
                <div className="slide_menu">
                    <ul>
                        <li>
                            <Link to="/">DASHBOARD</Link>
                        </li>
                        <li>
                            <Link to="/list">LIST</Link>
                        </li>
                        <li>
                            <Link to="/post">POST</Link>
                        </li>
                        <li>
                            <Link to="/setting">Setting</Link>
                        </li>
                        <li>
                            <a href="/login" onClick={logout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SlideMenu;
