import { ITwitterList } from '../interace/ITwitterList';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPDataService } from '../services/ISPDataService';

export interface ITwitterProps {
  webPartContext: IWebPartContext;
  spDataService: ISPDataService;
  twitterList: string;
}

export interface ITwitterPropsState {
  data: ITwitterList[];
}
