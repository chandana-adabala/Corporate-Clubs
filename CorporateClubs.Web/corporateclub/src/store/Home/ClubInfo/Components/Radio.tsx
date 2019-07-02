
import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';


interface IChoiceGroupBasicExampleState {
    imageKey: string;
  }
  
  export default class MyRadio extends React.Component<any, IChoiceGroupBasicExampleState> {
    constructor(props: {}) {
      super(props);
  
      this.state = {
        imageKey: ''
      };
    }
    
    
    public render() {
      console.log(this.props.onChange,'change',this.props.hide,"hide");
      return (
        <div>
          <ChoiceGroup
            className="defaultChoiceGroup"
            defaultSelectedKey="B"
            options={[
              {
                key: 'A',
                text: 'Open Club',
                'data-automation-id': 'auto1'
              } as IChoiceGroupOption,
              {
                key: 'B',
                text: 'Closed Club'
              },
            
            ]}
            onChange={this.props.onChange}
            label="Pick one"
            required={true}
            hidden={this.props.hide}
          />
        </div>
      );
    }
  
    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
      console.dir(option);
    };
  }
  