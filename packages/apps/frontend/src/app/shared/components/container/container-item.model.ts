import { Type } from '@angular/core';

export interface DynamicComponentData {
  component: Type<any>;
  inputs?: { [key: string]: any };
}

export interface ContainerItem {
  title: string;
  subTitle?: string;
  content: string | DynamicComponentData;
}
