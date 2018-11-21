import { ITwitterList } from '../interace/ITwitterList';

export interface ISPDataService {
  GetList(twitterList: string): Promise<ITwitterList[]>;
}
