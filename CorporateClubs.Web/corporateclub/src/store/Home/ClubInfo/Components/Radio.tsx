
import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';


interface IChoiceGroupBasicExampleState {
    imageKey: string;
  }
  
  export default class MyRadio extends React.Component<{}, IChoiceGroupBasicExampleState> {
    constructor(props: {}) {
      super(props);
  
      this.state = {
        imageKey: ''
      };
    }
  
    public render() {
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
            onChange={() => console.log('onBlur called')}
            label="Pick one"
            required={true}
          />
        </div>
      );
    }
  
    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
      console.dir(option);
    };
  }
  