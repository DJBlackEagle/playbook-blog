import { Component } from '@angular/core';
import { Timeline } from '../../../shared/components/timeline/timeline';
import { TimelineControl } from '../../../shared/components/timeline/timeline-control.model';
import { TimelineItem } from '../../../shared/components/timeline/timeline-item.model';

@Component({
  selector: 'app-storybook-timeline',
  imports: [Timeline],
  templateUrl: './storybook-timeline.html',
  styleUrl: './storybook-timeline.scss',
})
export class StorybookTimeline {
  controlItems: TimelineControl[] = [];
  timelineItems: TimelineItem[] = [];

  constructor() {
    this.controlItems = [
      { title: 'Education', category: 'education' },
      { title: 'Work', category: 'work' },
      { title: 'Projects', category: 'project' },
      { title: 'Fun', category: 'funny' },
    ];

    this.timelineItems = [
      {
        category: 'education',
        icon: '🎓',
        yearFrom: 1996,
        yearTo: 2000,
        title: 'Primary education',
        description:
          'Developed foundational skills in literacy and numeracy, including reading, writing, and basic arithmetic. Gained an introduction to science, art, and social studies, establishing a broad educational base.',
        achievements: ['Graduated with distinction', 'Won first place in school spelling bee'],
      },
      {
        category: 'education',
        icon: '🎓',
        yearFrom: 2000,
        yearTo: 2005,
        title: 'Lower secondary education',
        description:
          'Expanded on foundational knowledge with advanced studies in mathematics, including algebra and geometry, and sciences such as biology, chemistry, and physics. Developed critical thinking and analytical skills through literature and social studies, while also beginning foreign language education.',
        achievements: ['Graduated with honors', 'Member of the school science club'],
      },
      {
        category: 'education',
        icon: '🎓',
        yearFrom: 2005,
        yearTo: 2007,
        title: 'University of Applied Sciences',
        company: 'XY Vocational college',
        description:
          'Completed foundational studies in electrical engineering and information technology, building a strong technical base for future specialization in software development.',
      },
      {
        category: 'education',
        icon: '🎓',
        yearFrom: 2007,
        yearTo: 2010,
        title: 'Apprenticeship as IT-Fachinformatiker',
        company: 'Company XY',
        description:
          'Focus on development of custom business security software solutions. Gained hands-on experience in software development, project management, and client communication.',
      },
      {
        category: 'education',
        icon: '🎓',
        yearFrom: 2010,
        yearTo: 2014,
        title: "Bachelor's Degree in Computer Science",
        company: 'Uni Köln',
        description:
          'Graduated Magna Cum Laude with a focus on Human-Computer Interaction and Software Engineering. Developed strong foundations in algorithms, data structures, and user-centered design principles.',
      },
      {
        category: 'work',
        icon: '💼',
        yearFrom: 2014,
        yearTo: 2016,
        title: 'Junior Fullstack Developer',
        company: 'Some Company',
        description:
          'Contributed to the development of a comprehensive medical software platform used by doctors to create and manage patient therapies. My role involved working on both the front-end interface for clinicians and the back-end services that handled therapy logic and patient data, ensuring a secure and reliable application.',
        skills: ['C/C++', 'Delphi', 'Windows', 'SVN'],
        achievements: [
          'Reduced page load times by 40%',
          'Built 15+ responsive landing pages',
          'Mentored 2 junior interns',
        ],
      },
      {
        category: 'work',
        icon: '💼',
        yearFrom: 2017,
        yearTo: 2020,
        title: 'Senior Fullstack Developer',
        company: 'NodeJS Experts Inc.',
        description:
          'Led the design and implementation of scalable backend systems using Node.js. Architected and developed microservices, managed cloud infrastructure, and mentored junior developers. Focused on enhancing application performance and ensuring high availability of services.',
        skills: ['Node.js', 'TypeScript', 'Express.js', 'Docker', 'AWS', 'Microservices'],
      },
      {
        category: 'work',
        icon: '💼',
        yearFrom: 2020,
        yearTo: 2022,
        title: 'Senior Backend Developer',
        company: 'HealthTech Solutions',
        description:
          'Specialized in developing secure and compliant backend services for medical applications using Node.js. Responsible for designing and implementing APIs for patient data management, ensuring adherence to healthcare standards like HIPAA. Focused on creating a robust, scalable, and secure infrastructure for sensitive medical data.',
        skills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'HIPAA'],
      },
      {
        category: 'work',
        icon: '💼',
        yearFrom: 2022,
        yearTo: 2025,
        title: 'Senior DevOps Engineer',
        company: 'Cloud Innovators',
        description:
          'Pioneered the adoption of DevOps practices, automating deployment pipelines and enhancing infrastructure security. Led the migration to a containerized architecture using Docker and Kubernetes, significantly improving scalability and reducing deployment times. Focused on infrastructure as code (IaC) and continuous monitoring to ensure high availability.',
        skills: ['Azure', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'IaC'],
      },
      {
        category: 'work',
        icon: '💼',
        yearFrom: 2025,
        yearTo: 'Present',
        title: 'Senior DevOps Engineer',
        company: 'Innovate & Secure Ltd.',
        description:
          'Leading advanced DevOps strategies with a deep focus on infrastructure security and cost optimization. Architecting and implementing DevSecOps pipelines, integrating robust security scanning and compliance checks. Driving the adoption of GitOps for declarative infrastructure management and enhancing cloud-native security posture across multi-cloud environments.',
        skills: [
          'DevSecOps',
          'GitOps',
          'Cloud Security',
          'Cost Optimization',
          'Multi-Cloud',
          'Kubernetes',
        ],
      },
      {
        category: 'project',
        icon: '🔬',
        yearFrom: 2025,
        yearTo: 'Present',
        title: 'Medical Effection Study',
        company: 'Personal Project',
        description:
          'Initiated and developed a platform for the "Medical Effection" study, enabling patients and doctors to input and track medical data collaboratively. The collected data formed the basis of a research study that was later published.',
        skills: ['NestJS', 'Angular', 'Node.js', 'MySQL', 'Data Analysis', 'GCP'],
      },
      {
        category: 'funny',
        icon: '😂',
        yearFrom: 2014,
        title: 'Professional Googler & Stack Overflow Archaeologist',
        company: 'The Internet',
        description:
          'Spent countless hours deciphering cryptic error messages and excavating ancient Stack Overflow threads for solutions that were deprecated three versions ago. Mastered the art of copy-pasting code snippets and pretending to understand them.',
        skills: [
          'Advanced Googling',
          'Ctrl+C, Ctrl+V',
          'Hope-Driven Development',
          'Rubber Duck Debugging',
        ],
      },
    ];
  }
}
