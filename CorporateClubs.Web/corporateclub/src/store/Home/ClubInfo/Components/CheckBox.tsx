import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'; 

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export default class MyCheckbox extends React.Component<{}, ICheckboxBasicExampleState> {
    _onCheckboxChange: any;
  constructor(props: {}) {
    super(props);

    this._onCheckboxChange = () => console.log('onBlur called');
  }

  public render(): JSX.Element {
    return (
      <div>
        <Checkbox label="Standard checkbox" onChange={this._onCheckboxChange} />
      </div>
    );
  }
}