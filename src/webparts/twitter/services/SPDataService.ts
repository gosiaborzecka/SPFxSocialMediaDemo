import { ITwitterList } from '../interace/ITwitterList';
import { ISPDataService } from './ISPDataService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Web } from '@pnp/sp';
export class SPDataService implements ISPDataService {

  private _webPartContext: IWebPartContext;

  constructor(webPartContext: IWebPartContext){
    this._webPartContext = webPartContext;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public async GetList(): Promise<ITwitterList[]>{
    var pageUrl = await this.webPartContext.pageContext.web.absoluteUrl;
    var newList: ITwitterList[] = [];

    var currentList = await this._getList(pageUrl);

    currentList.forEach(async element => {
      newList.push(element);
    });

    return newList;
  }

  private async _getList(webUrl: string): Promise<ITwitterList[]> {

    const w = new Web(webUrl);
    let list = w.lists.getByTitle('Twitter');
    let _items: ITwitterList[];

    await list.items.orderBy('CreatedAt', false)
    .select(`Id,Title,UserName, Location, ProfileImage, Language, ScreenName, CreatedAt`).get().then((items: ITwitterList[]) => {
      _items = items;
    });
    return _items;
  }

}
