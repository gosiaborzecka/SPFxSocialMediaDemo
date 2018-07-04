import * as React from 'react';
import ITweetListProps from './ITweetListProps';
import styles from './TweetList.module.scss';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';

export default class TweeetList extends React.Component<ITweetListProps, {}>{

  constructor(props: ITweetListProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Fabric className={styles.twitterList}>
        <div className={styles.row}>
          <div className={styles.columns6}>
            <Label className={styles.title}>{this.props.Title}</Label>
            <Label className={styles.createdAt}>{this.props.CreatedAt}</Label>
            <Label className={styles.language}>Language: {this.props.Language}</Label>
          </div>
          <div className={styles.columns6}>
            <Image
              src={this.props.ProfileImage}
              alt={this.props.UserName}
            />
            <Label className={styles.userName}>{this.props.UserName} | @{this.props.ScreenName}</Label>
            <Label className={styles.location}>{this.props.Location}</Label>
          </div>
        </div>
      </Fabric>
    );
  }
}
