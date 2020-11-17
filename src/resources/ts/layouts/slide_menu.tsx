import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

type Props = {
    toggleMenu: any;
};

const SlideMenu: React.FC<Props> = props => {
    const logout = async () => {
        try {
            await axios.post('/api/logout');
            location.reload();
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
                                ダッシュボード
                            </Link>
                        </li>
                        <li>
                            <Link to="/list" onClick={props.toggleMenu}>
                                一覧
                            </Link>
                        </li>
                        <li>
                            <Link to="/post" onClick={props.toggleMenu}>
                                投稿
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting" onClick={props.toggleMenu}>
                                設定
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={logout}>
                                ログアウト
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SlideMenu;
