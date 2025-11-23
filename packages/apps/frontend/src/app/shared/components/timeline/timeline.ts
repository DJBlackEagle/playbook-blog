import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimelineControl } from './timeline-control.model';
import { TimelineItem } from './timeline-item.model';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  @Input() controlItems: TimelineControl[] = [];
  @Input() timelineItems: TimelineItem[] = [];

  // constructor() {
  //   this.controlItems = [
  //     { title: 'Education', category: 'education' },
  //     { title: 'Work', category: 'work' },
  //     { title: 'Projects', category: 'project' },
  //     { title: 'Fun', category: 'funny' },
  //   ];

  //   this.timelineItems = [
  //     {
  //       node: '💡',
  //       yearFrom: 2010,
  //       yearTo: 2014,
  //       title: 'Started University',
  //       description: 'Began my studies in Computer Science at XYZ University.',
  //       category: 'education',
  //       achievements: ["Dean's List 2011, 2012, 2013"],
  //     },
  //     {
  //       node: '🎯',
  //       yearFrom: 2014,
  //       yearTo: 2015,
  //       title: 'First Job',
  //       company: 'ABC Corp',
  //       description: 'Landed my first job as a Junior Developer at ABC Corp.',
  //       category: 'work',
  //       skills: ['JavaScript', 'HTML', 'CSS'],
  //       achievements: ['Employee of the Month'],
  //     },
  //     {
  //       node: '🚀',
  //       yearFrom: 2016,
  //       yearTo: 'Present',
  //       title: 'Launched Personal Project',
  //       description: 'Developed and launched my first personal project, a task management app.',
  //       category: 'project',
  //       skills: ['Angular', 'TypeScript', 'Firebase'],
  //     },
  //     {
  //       node: '🏞',
  //       yearFrom: 2018,
  //       title: 'Hiking Adventure',
  //       description: 'Completed a month-long hiking trip across the Appalachian Trail.',
  //       category: 'funny',
  //     },
  //   ];
  // }
}
