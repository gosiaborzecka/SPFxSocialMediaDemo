import { IWebPartContext } from "@microsoft/sp-webpart-base";

interface ITweetListProps {
  Id: string;
  Title: string;
  UserName: string;
  Location: string;
  ProfileImage: string;
  Language: string;
  ScreenName: string;
  CreatedAt: string;
  WebPartContext: IWebPartContext;
}

export default ITweetListProps;
