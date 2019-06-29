import React from 'react';
import '../../Admin/DeactivateUser.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
interface Iprops{
    name?:string;
}
const DeactivateUser: React.FC<Iprops> = (props:Iprops)  => {
    return(
        
        <div className="DeactivateUser" >
            <header className="DeacivateUser_head">
        <text>Deactivate {props.name}</text>
        <Link to="/Admin">
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
            <h3>What Happens next?</h3>
            <ul>
                <li>This user will be disabled and remaining users will not be able to contact him.</li>
                <li>This user will be shown as inactive user in all the clubs he/she is part of.</li>
            </ul>
            <p>Reason:</p>
            <textarea rows={5}/>
            <span className="buttons">
            <Link to="/Admin">
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
                <button className="addclub"><text>Confirm</text></button>
            </span>
       
    
    </div>
</div>
    );
}

DeactivateUser.defaultProps={
    name:'Surya Krishna'
}
export default DeactivateUser;