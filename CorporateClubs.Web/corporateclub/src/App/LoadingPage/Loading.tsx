import React from 'react';
import './Loading.scss'

export default class Loading extends React.Component<any,any>{
    render()
    {
        return(
            <div className="loaderPage">
            <div className="loader"></div>
            </div>
        );
    }
}