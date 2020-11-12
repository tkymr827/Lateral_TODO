import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const SlideMenu: React.FC = () => {
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
                            <a href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SlideMenu;
