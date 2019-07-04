import React from 'react';
import './Toggle.scss';
const Toggle: React.FC = () => {
    return(
        <label className="switch">
            <input type="checkbox" checked/>
            <span className={"slider round"}></span>
        </label>
    );
}
export default Toggle;