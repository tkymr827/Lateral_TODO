import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

type Props = {
    toggleMenu: any;
};

const SlideMenu: React.FC<Props> = props => {
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
                            <Link to="/" onClick={props.toggleMenu}>
                                DASHBOARD
                            </Link>
                        </li>
                        <li>
                            <Link to="/list" onClick={props.toggleMenu}>
                                LIST
                            </Link>
                        </li>
                        <li>
                            <Link to="/post" onClick={props.toggleMenu}>
                                POST
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting" onClick={props.toggleMenu}>
                                Setting
                            </Link>
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
