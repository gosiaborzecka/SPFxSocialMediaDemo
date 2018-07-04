import { ITwitterList } from '../interace/ITwitterList';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface ITwitterProps {
  webPartContext: IWebPartContext;
}

export interface ITwitterPropsState {
  data: ITwitterList[];
}
