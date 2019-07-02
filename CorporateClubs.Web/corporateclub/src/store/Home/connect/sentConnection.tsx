import React from 'react'
import {Icon} from 'react-icons-kit';
import {library} from 'react-icons-kit/icomoon/library';
import {ic_mail} from 'react-icons-kit/md/ic_mail';
import {phone} from 'react-icons-kit/icomoon/phone'
export default class sentConnection extends React.Component<any,any>{

    render(){
        return(
            <div className="reqWindow">
                <div className='profilePic'>

                </div>
                <div className='body'> 
                    <p>You Have requested {} to Connect !</p>
                    <p className="mutualClubs">
                         <Icon icon={library}/>
                         {}  in mutual
                    </p>
                    <p className="contact">
                        <span className='mail'>
                            <Icon icon={ic_mail}></Icon>
                            {}
                        </span>
                        <span className='phone'>
                            <Icon icon={phone}/>
                            {}
                        </span>
                    </p>
                    <p className='mutualContacts'>
                            <span>You and {} know</span>
                            <span>{}</span>
                    </p>
                    <p className="wating">Waiting for {} to respond</p>
                </div>
            </div>
        );
    }
}