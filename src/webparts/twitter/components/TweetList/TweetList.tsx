import * as React from 'react';
import ITweetListProps from './ITweetListProps';
import styles from './TweetList.module.scss';

export default class TweeetList extends React.Component<ITweetListProps, {}>{

  constructor(props: ITweetListProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.twitterList}>
        <div className={styles.row}>
          <div className={styles.columns6}>
            <div className={styles.title}>{this.props.Title}</div>
            <div className={styles.createdAt}>{this.props.CreatedAt}</div>
            <div className={styles.language}>Language: {this.props.Language}</div>
          </div>
          <div className={styles.columns6}>
            <img className={styles.profileImage} src={this.props.ProfileImage} />
            <br />
            <div className={styles.userName}>{this.props.UserName} | @{this.props.ScreenName}</div>
            <div className={styles.location}>{this.props.Location}</div>
          </div>
        </div>
      </div>
    );
  }
}
