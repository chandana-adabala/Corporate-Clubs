import React from 'react'

import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import Icon from 'react-icons-kit';
import {shield} from 'react-icons-kit/entypo/shield'
import {check} from 'react-icons-kit/metrize/check'
import {cross} from 'react-icons-kit/metrize/cross'
import { connect } from 'react-redux';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'; 
import './NonClubUser.scss'
import { acceptRequest, rejectRequest, fetchMyClubInfo } from '../../actions/homeActions';
export default class NonClubUser extends React.Component<any,any>{
    constructor(props)
    {
        super(props)
        this.state={defaultChecked:false}
    }
  handleChange=(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean)=>{
        this.props.select(checked,this.props.user);
        this.setState({defaultChecked:checked})
        
  }

  componentWillReceiveProps(nextProps)
  {
      if(nextProps.user!=this.props.user)
      this.setState({defaultChecked:false})
  }
    render(){
 
          
        return(
            <div className="nonUser">
            
                <div className="nonUserprofilePic"> 
                <Checkbox onChange={this.handleChange} checked={this.state.defaultChecked}/>
                        <img src={this.props.user.profilePic} ></img>
                </div>
                <div className="details">
                        <div className="userName">
                        
                                {this.props.user.displayName} 
                        </div>
                        <div className="email" style={{display:'flex'}}>
                                    {this.props.user.email}
                        
                        </div>
             
                </div>
            </div>
        );
    }
}
