import { ITwitterList } from '../interace/ITwitterList';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPDataService } from '../services/ISPDataService';

export interface ITwitterProps {
  webPartContext: IWebPartContext;
  spDataService: ISPDataService;
}

export interface ITwitterPropsState {
  data: ITwitterList[];
}
