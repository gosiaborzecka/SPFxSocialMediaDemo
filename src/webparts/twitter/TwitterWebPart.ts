import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'TwitterWebPartStrings';
import Twitter from './components/Twitter';
import { ITwitterProps } from './components/ITwitterProps';
import { SPDataService } from './services/SPDataService';
import { ISPDataService } from './services/ISPDataService';
import { sp } from '@pnp/sp';
import { IODataList } from '@microsoft/sp-odata-types';

export interface ITwitterWebPartProps {
  twitterList: string;
}

export default class TwitterWebPart extends BaseClientSideWebPart<ITwitterWebPartProps> {
  private _spDataService: ISPDataService;

  private lists: IPropertyPaneDropdownOption[];
  private listsDropdownDisabled: boolean = true;

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
        spDataService: this._spDataService,
        twitterList: this.properties.twitterList
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
                PropertyPaneDropdown('twitterList', {
                  label: 'Select list: ',
                  options: this.lists,
                  disabled: this.listsDropdownDisabled
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private async loadLists(): Promise<IPropertyPaneDropdownOption[]> {
    let options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

    const data = sp.web.lists.get();
    const response = await data;
    response.map((list: IODataList) =>
    {
      if(list.Hidden === false) {
        options.push({key: list.Title, text: list.Title});
      }
    });

    return options;
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    this.loadLists()
      .then((listOptions: IPropertyPaneDropdownOption[]): void => {
        this.lists = listOptions;
        this.listsDropdownDisabled = false;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
  }
}
