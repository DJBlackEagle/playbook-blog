import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TimelineControl } from './timeline-control.model';
import { TimelineItem } from './timeline-item.model';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline implements AfterViewInit {
  /** The filter controls displayed above the timeline. */
  @Input() controlItems: TimelineControl[] = [];
  /** The list of events or items to display in the timeline. */
  @Input({ required: true }) timelineItems: TimelineItem[] = [];

  /** A reference to the main timeline container element. */
  @ViewChild('timelineContainer') timelineContainer!: ElementRef<HTMLElement>;
  /** A reference to the element that shows the scroll progress. */
  @ViewChild('timelineProgress') timelineProgress!: ElementRef<HTMLElement>;
  /** A list of all timeline item elements in the view. */
  @ViewChildren('timelineItemEl') timelineItemElements!: QueryList<ElementRef<HTMLElement>>;

  /** The currently active filter category. Defaults to 'all'. */
  activeFilter = signal<string>('all');
  /** A set containing the indices of items that have been scrolled into view. */
  visibleItems = signal<Set<number>>(new Set());

  /** A computed signal that returns the items matching the active filter. */
  filteredTimelineItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.timelineItems;
    }
    return this.timelineItems.filter((item) => item.category === filter);
  });

  ngAfterViewInit(): void {
    this.updateTimelineProgress();
    // Use a timeout to ensure elements are rendered before checking visibility.
    setTimeout(() => this.updateTimelineItemsVisibility(), 0);

    console.log('timelineContainer:', this.timelineContainer);
    console.log('timelineProgress:', this.timelineProgress);
    console.log('timelineItemElements:', this.timelineItemElements);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateTimelineProgress();
    this.updateTimelineItemsVisibility();
  }

  /**
   * Sets the active filter for the timeline items.
   * @param filter The category to filter by.
   */
  setFilter(filter: string): void {
    this.activeFilter.set(filter);
    // After filtering, re-check visibility as the elements in the DOM have changed.
    setTimeout(() => this.updateTimelineItemsVisibility(), 0);
  }

  /**
   * Scrolls the corresponding timeline item into the center of the view.
   * @param itemIndex The index of the timeline item to scroll to.
   */
  scrollToItem(itemIndex: number): void {
    // Find the actual DOM element corresponding to the item index in the filtered list
    const itemToFind = this.filteredTimelineItems()[itemIndex];
    const overallIndex = this.timelineItems.indexOf(itemToFind);
    const itemEl = this.timelineItemElements.get(overallIndex)?.nativeElement;

    if (itemEl) {
      itemEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  /**
   * Updates the height of the timeline progress bar based on scroll position.
   */
  private updateTimelineProgress(): void {
    if (!this.timelineContainer?.nativeElement || !this.timelineProgress?.nativeElement) {
      return;
    }

    const containerEl = this.timelineContainer.nativeElement;
    const containerRect = containerEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (containerRect.top < windowHeight && containerRect.bottom > 0) {
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - containerRect.top) / (containerRect.height + windowHeight)),
      );
      this.timelineProgress.nativeElement.style.height = `${progress * 100}%`;
    }
  }

  /**
   * Checks which timeline items are in the viewport and adds them to the visible set
   * to trigger their initial appearance animation.
   */
  private updateTimelineItemsVisibility(): void {
    this.timelineItemElements.forEach((itemRef, index) => {
      if (this.visibleItems().has(index)) {
        return;
      }

      const rect = itemRef.nativeElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible) {
        setTimeout(() => {
          this.visibleItems.update((currentSet) => new Set(currentSet.add(index)));
        }, index * 200); // Staggered animation
      }
    });
  }
}
