export interface TimelineItem {
  icon?: string;
  category: string;
  yearFrom: number;
  yearTo?: number | 'Present';
  title: string;
  company?: string;
  description: string;
  skills?: string[];
  achievements?: string[];
}
