import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TwitterWebPartStrings';
import Twitter from './components/Twitter';
import { ITwitterProps } from './components/ITwitterProps';
import { SPDataService } from './services/SPDataService';
import { ISPDataService } from './services/ISPDataService';

export interface ITwitterWebPartProps {
  description: string;
}

export default class TwitterWebPart extends BaseClientSideWebPart<ITwitterWebPartProps> {
  private _spDataService: ISPDataService;

  public onInit(): Promise<void> {
    if (DEBUG && Environment.type === EnvironmentType.Local){

    } else {
      this._spDataService = new SPDataService(this.context);
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ITwitterProps > = React.createElement(
      Twitter,
      {
        webPartContext: this.context,
        spDataService: this._spDataService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
