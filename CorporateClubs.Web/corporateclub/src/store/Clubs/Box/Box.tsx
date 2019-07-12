import React from 'react'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import './Box.scss'
export class Box extends React.Component<any, any>
{
  render() {
    return (
      <div className="box" >
        <span>{this.props.name}</span>
        <span onClick={this.props.close} id={this.props.name}><Icon size={'1rem'} icon={ic_close}/></span>
      </div>
    )
  }
}