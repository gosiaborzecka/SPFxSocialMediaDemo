import * as React from 'react';
import styles from './Twitter.module.scss';
import { ITwitterProps, ITwitterPropsState } from './ITwitterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { mockData } from '../../../../lib/webparts/twitter/services/mockData';
import TweeetList from './TweetList/TweetList';

export default class Twitter extends React.Component<ITwitterProps, ITwitterPropsState> {

  constructor(props: ITwitterProps) {
    super(props);

    this.state = {
      data: []
    };
  }

  public render(): React.ReactElement<ITwitterProps> {
    return (
      <div>
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
      </div>
    );
  }

  public async componentDidMount() {
    this.getMockData();
  }

  private getMockData() {
    this.setState({
      data: mockData
    })
  }

}
