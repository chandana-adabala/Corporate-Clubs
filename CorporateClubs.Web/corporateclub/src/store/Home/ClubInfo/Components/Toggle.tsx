import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';


export default class MyToggle extends React.Component<any,any> {
  constructor(props){
    super(props);
    this.state={
      checked:this.props.checked
    }
  }
componentWillReceiveProps(){
  console.log(this.state.checked,this.props.checked);
  
  this.setState({
      checked:this.props.checked
  });
}

  public render(): JSX.Element {
   
    return (
     
      <div >
        <Toggle 
          defaultChecked={this.state.checked}
          label="Enabled and checked"
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={(ev, checked: boolean|undefined) =>{ 
                   if(checked){
                   
                   }          
        }}
        />
       
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}