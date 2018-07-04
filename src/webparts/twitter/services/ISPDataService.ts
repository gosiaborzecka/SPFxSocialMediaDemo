import { ITwitterList } from '../interace/ITwitterList';

export interface ISPDataService {
  GetList(): Promise<ITwitterList[]>;
}
