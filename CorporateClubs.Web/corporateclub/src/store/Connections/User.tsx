import React from 'react';
import {Icon} from 'react-icons-kit';
import {caretDown} from 'react-icons-kit/fa/caretDown';
import {ic_refresh} from 'react-icons-kit/md/ic_refresh';
import {search} from 'react-icons-kit/fa/search';
import './Connections.scss';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {connect} from 'react-redux';
import {ic_home} from 'react-icons-kit/md/ic_home';
import {library} from 'react-icons-kit/icomoon/library';
import {ic_mail} from 'react-icons-kit/md/ic_mail';
import {phone} from 'react-icons-kit/icomoon/phone'
class User extends React.Component<any,any>{
    render()
    {
        return(
                <div className="User">
                    <div className="profile-pic">
                    <img src={require('../HeadNav/damon.png')}/>
                    </div>
                    <div className="det">
                        <div className="headuser">
                        <h4>Rakesh Misra</h4>
                    <p>Always and forever</p>
                    </div>
                    
                    <div className="sub-head">
                        <Icon icon={library}/>
                        <text>22 in mutual</text>
                    </div>
                    <div className="sub-head">
                        <Icon icon={ic_mail}/>
                        <text>susri@tlkhyj.fglllllll</text>
                    </div>
                    <div className="sub-head">
                        <Icon icon={phone}/>
                        <text>+91-9494966699</text>
                    </div>
                    </div>
                    
                </div>
        );
    }
}
export default User;