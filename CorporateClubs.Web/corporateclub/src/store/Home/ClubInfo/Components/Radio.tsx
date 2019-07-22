
import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';


interface IChoiceGroupBasicExampleState {
    imageKey: string;
    publicClubType:string
  }
  
  export default class MyRadio extends React.Component<any, IChoiceGroupBasicExampleState> {
    constructor(props: {}) {
      super(props);
  
      this.state = {
        imageKey: '',
        publicClubType:''
      };

      this.onchange=this.onchange.bind(this);

    }
    
    onchange(event)
    {
      debugger
      if(event.text=='Open Club')
      this.setState({publicClubType:'A'})
      else
      this.setState({publicClubType:'B'})
      this.props.onChange(event)
    }

    componentDidMount()
    {
        this.setState({publicClubType:this.props.publicClubType})
    }
    componentWillReceiveProps(nextProps)
    {
      this.setState({publicClubType:this.props.publicClubType})
    }
    public render() {
       //(this.props.onChange,'change',this.props.hide,"hide");
      return (
        <div>
          <ChoiceGroup
            className="defaultChoiceGroup"
            selectedKey={this.state.publicClubType}
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
  