import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
//import './Toggle.scss';
import './Toggle.scss'

export default class MyToggle extends React.Component<any,any> {
  public render(): JSX.Element {
    return (
      <span >
        <Toggle 
          defaultChecked={true}
          label="Enabled and checked"
          onText="Public Club"
          offText="Private Club"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onBlur called')}
        />
       
      </span>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}