import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  /**
   * Reactive signal that holds the application's display name.
   *
   * Acts as the single source of truth for the site title used in UI (headers, footers),
   * page titles, and SEO metadata. Consumers should read the current value reactively and
   * update it when configuration or user preferences change.
   *
   * Initial value: 'Default Site Name'
   *
   * Example usage:
   * - Read current value: siteName()
   * - Update value: siteName.set('My Cool Site')
   *
   * @remarks
   * Persist or load an updated value from external configuration or an API as needed.
   *
   * @default 'Default Site Name'
   */
  siteName = signal('Default Site Name');

  /**
   * Signal that stores the site's author/display name.
   *
   * A reactive (writable) signal containing the canonical author name used across
   * the frontend (e.g., meta tags, bylines, and site footer). Read the current
   * value by calling the signal as a function and update it via set/update.
   *
   * @type {WritableSignal<string>}
   * @default "Default Site Author Name"
   *
   * @example
   * // Read the current author
   * const author = siteAuthorName();
   *
   * // Update the author
   * siteAuthorName.set('Jane Doe');
   *
   * @remarks
   * Use a human-readable full name for SEO and accessibility.
   */
  siteAuthorName = signal('Default Site Author Name');

  /**
   * Signal storing the year when the site's copyright began.
   *
   * This value is used to generate the copyright range shown in the UI (for example: "2000–2025").
   *
   * @default 2000
   * @type WritableSignal<number>
   * @example
   * // Read the start year:
   * const start = siteCopyrightStartYear();
   *
   * // Compose a copyright label:
   * const current = new Date().getFullYear();
   * const label = start === current ? `${current}` : `${start}–${current}`;
   */
  siteCopyrightStartYear = signal(2025);

  /**
   * Signal that holds the year used as the end of the site's copyright range.
   *
   * Initialized to the current calendar year (via new Date().getFullYear()).
   * Intended for use in UI templates and components to render dynamic copyright
   * ranges (e.g. "2020–2025" or just "2025" when start year equals end year).
   *
   * The signal's value is a number representing the full year (e.g. 2025).
   * Read or subscribe to the value using the signal API; update it if the
   * displayed end year needs to change.
   *
   * @example
   * // read current end year
   * const endYear = siteCopyrightEndYear();
   *
   * // update end year
   * siteCopyrightEndYear.set(2026);
   *
   * @type {import("@angular/core").Signal<number>}
   */
  siteCopyrightEndYear = signal(new Date().getFullYear());
}
