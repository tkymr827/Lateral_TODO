import React, { useState, useContext } from 'react';
import SlideMenu from './slide_menu';
import { User } from './app';

const GlobalMenu: React.FC = () => {
    const [menuopen, setMenuopen] = useState(false);
    const user = useContext(User);

    const toggleMenu = () => {
        setMenuopen(state => !state);
    };

    return (
        <>
            <nav className="nav">
                <div className="nav_left">
                    <a href="#">TodoList</a>
                </div>
                <div className="nav_right">
                    <div className="user_name">{user.name}さん</div>
                    <div className="menu_btn" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            {menuopen && <SlideMenu toggleMenu={toggleMenu} />}
        </>
    );
};

export default GlobalMenu;
