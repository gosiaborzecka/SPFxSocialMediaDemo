import * as React from 'react';
import ITweetListProps from './ITweetListProps';

export default class TweeetList extends React.Component<ITweetListProps, {}>{

  constructor(props: ITweetListProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <div>{this.props.Id}</div>
        <div>{this.props.Title}</div>
        <div>{this.props.UserName}</div>
        <div>{this.props.Location}</div>
        <div>{this.props.ProfileImage}</div>
        <div>{this.props.Language}</div>
        <div>{this.props.ScreenName}</div>
        <div>{this.props.CreatedAt}</div>
      </div>
    );
  }
}
