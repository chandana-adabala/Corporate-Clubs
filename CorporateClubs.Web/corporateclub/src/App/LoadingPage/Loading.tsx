import React from 'react';
import './Loading.scss'
import { Icon } from 'react-icons-kit'
import {chatbubbles} from 'react-icons-kit/ionicons/chatbubbles';

export default class Loading extends React.Component<any,any>{
    render()
    {
        return(
            <div className="loaderPage">
            <div className="loader"><Icon size={50} icon={chatbubbles} className="logo"/></div>
            </div>
        );
    }
}