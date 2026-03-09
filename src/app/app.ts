import { FormsModule } from '@angular/forms';
import { Component, Resource, signal, VERSION } from '@angular/core';

import { debounced } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Nightly as of 3/9/26: 22.0.0-next.1+sha-b918bed -->
    <pre>Version: {{version.full}}</pre>

    <p>
      <a 
        href="https://github.com/angular/angular/pull/67044" 
        target="_blank">feat(core): allow debouncing signals #67044
      </a>
    </p>

    <label>
      Source
      <input [(ngModel)]="source" />
    </label>

    <p>source value: {{source()}}</p>
    <p>debouncedRes (a resource) value: {{debouncedRes.value()}}</p>
  `,
  imports: [FormsModule]
})
export class App {
  protected version = VERSION;

  protected source = signal('value')

  protected debouncedRes: Resource<string> = debounced(this.source, 1000);
}
