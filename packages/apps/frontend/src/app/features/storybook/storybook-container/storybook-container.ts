import { Component } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { CardProgress } from '../../../shared/components/card-progress/card-progress';
import { Container } from '../../../shared/components/container/container';
import { ContainerItem } from '../../../shared/components/container/container-item.model';
import { ContainerList } from '../../../shared/components/container/container-list';

@Component({
  selector: 'app-storybook-container',
  imports: [Button, Container, ContainerList],
  templateUrl: './storybook-container.html',
  styleUrl: './storybook-container.scss',
})
export class StorybookContainer {
  container01: ContainerItem;
  container02: ContainerItem;
  container02_01: ContainerItem;
  container02_02: ContainerItem;
  containers: ContainerItem[] = [];

  constructor() {
    // this.container01 = {
    //   title: 'Container Component',
    //   subTitle: 'This is a subtitle for the container component.',
    //   content:
    //     'This is the content of the container component. It can include text, images, or other components as needed.',
    // };

    const x = new CardProgress();
    x.cardProgressItem = { title: 'Progress Example', precentage: 75 };

    this.container01 = {
      title: 'First Container',
      subTitle: 'Subtitle for the first container.',
      content: {
        component: CardProgress,
        inputs: {
          cardProgressItem: {
            title: '📢 Single Card Title #1 (Single)',
            content: '📄 This is a description for Card 1.',
            precentage: 75,
          },
        },
      },
    };

    this.container02 = {
      title: 'Second Container',
      subTitle: 'Subtitle for the second container.',
      content:
        'Content for the second container component. You can customize this content as required.',
    };

    this.container02_01 = {
      title: 'Nested Container 1',
      subTitle: 'Subtitle for nested container 1.',
      content:
        'Content for the first nested container component. This demonstrates nesting of containers.',
    };

    this.container02_02 = {
      title: 'Nested Container 2',
      subTitle: 'Subtitle for nested container 2.',
      content:
        'Content for the second nested container component. Nesting helps in organizing content hierarchically.',
    };

    this.containers = [
      {
        title: 'Another Container',
        subTitle: 'Subtitle for another container.',
        content:
          'Content for the second container component. You can add as many containers as needed.',
      },
      {
        title: 'Third Container',
        subTitle: 'Subtitle for the third container.',
        content:
          'Content for the third container component. This demonstrates multiple container usage.',
      },
      {
        title: 'Fourth Container',
        subTitle: 'Subtitle for the fourth container.',
        content:
          'Content for the fourth container component. Containers help organize content effectively.',
      },
    ];
  }
}
