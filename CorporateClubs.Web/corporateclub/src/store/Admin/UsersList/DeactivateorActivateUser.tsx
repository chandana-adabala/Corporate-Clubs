import React from 'react';
import './DeactivateorActivateUser.scss';
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { activateUser, deactivateUser,FetchUsers } from '../Actions/Actions';
import { getNativeProps } from '@uifabric/utilities';

interface Iprops {
    name?: string;
}
class DeactivateorActiveUser extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = { reason: "" }
        this.reasonHandle = this.reasonHandle.bind(this);
        this.confirmButtonHandle = this.confirmButtonHandle.bind(this);
    }

    reasonHandle(event) {
        debugger;
        var Reason = event.target.value;
        this.setState({ reason: Reason })
    }



    async confirmButtonHandle(event) {
        debugger;
        if (this.props.isActive)
        {
            await this.props.dispatch(deactivateUser(this.props.userID, this.state.reason))
            this.props.dispatch(FetchUsers())
        }
        else
        {
           await  this.props.dispatch(activateUser(this.props.userID, this.state.reason))
            this.props.dispatch(FetchUsers())
        }

    }


    render() {
        return (

            <div className="DeactivateUser" >
                <header className="DeacivateUser_head">
                    <text>{this.props.isActive ? "Deactivate" : "Reactivate"} {this.props.displayName}</text>
                    <Link to={this.props.to}>
                        <Icon icon={ic_close} size={30} />
                    </Link>
                </header>
                <div id="content">
                    <h3>What Happens next?</h3>

                    {this.props.isActive ? (<ul><li>This user will be disabled and remaining users will not be able to contact him.</li>
                        <li>This user will be shown as inactive user in all the clubs he/she is part of</li></ul>) : <ul><li>This user will be activated and remaining users will be able to contact him.</li>
                            <li>This user will be shown as active user in all the clubs he/she is part of</li></ul>}

                    <p>Reason:</p>
                    <textarea rows={5} value={this.state.reason} onChange={this.reasonHandle} />
                    <span className="buttons">
                        <Link to={this.props.to}>
                            <button className="cancelbutton"><text>Cancel</text></button>
                        </Link>
                        <Link to={this.props.to}>
                        <button className="addclub" onClick={this.confirmButtonHandle}><text>Confirm</text></button>
                        </Link>
                    </span>


                </div>
            </div>
        );
    }
}



export default connect()(DeactivateorActiveUser);