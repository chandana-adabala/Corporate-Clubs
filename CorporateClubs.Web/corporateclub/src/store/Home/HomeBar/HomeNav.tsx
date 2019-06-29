import React from 'react';
import './HomeNav.scss';

const HomeNav: React.FC = () => {
    let displayPage:Number=1;
    return(
        <div>
            <nav className="home-nav">
                <a className="home-nav-options">My Clubs</a>
                <a className="home-nav-options">My Threads</a>
                
            </nav>
   
        </div>
    );

    
}

export default HomeNav;