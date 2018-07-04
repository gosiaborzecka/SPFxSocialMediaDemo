import * as React from 'react';
import { ITwitterProps, ITwitterPropsState } from './ITwitterProps';
import { mockData } from '../services/mockData';
import TweeetList from './TweetList/TweetList';
import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { ITwitterList } from '../interace/ITwitterList';
import { Fabric } from "office-ui-fabric-react/lib/Fabric";

export default class Twitter extends React.Component<ITwitterProps, ITwitterPropsState> {

  constructor(props: ITwitterProps) {
    super(props);

    this.state = {
      data: []
    };
  }

  public render(): React.ReactElement<ITwitterProps> {
    return (
      <Fabric>
         {
          this.state.data.map(
            (item, index) => (
             <TweeetList
             Id={item.Id}
              Title={item.Title}
              UserName={item.UserName}
              Location={item.Location}
              ProfileImage={item.ProfileImage}
              Language={item.Language}
              ScreenName={item.ScreenName}
              CreatedAt={item.CreatedAt}
              WebPartContext={this.props.webPartContext}
             />
            )
          )
        }
      </Fabric>
    );
  }

  public async componentDidMount() {
    if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      this.getData();
    }
    else {
      this.getMockData();
    }
  }

  private getMockData() {
    this.setState({
      data: mockData
    })
  }

  private async getData() {
    let _items: ITwitterList[];

    _items = await this.props.spDataService.GetList();

    this.setState({
      data: _items
    });
  }

}
