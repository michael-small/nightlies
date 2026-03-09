import { FormsModule } from '@angular/forms';
import { Component, Resource, signal, VERSION } from '@angular/core';

import { debounced } from '@angular/core'; // in the nightly as of 3/9/26

@Component({
  selector: 'app-root',
  template: `
    <pre>Version: {{version.full}}</pre>

    <label>
      Source
      <input [(ngModel)]="source" />
    </label>

    <p>Source: {{source()}}</p>
    <p>Debounced: {{debounced.value()}}</p>
  `,
  imports: [FormsModule]
})
export class App {
  protected version = VERSION;

  protected source = signal('value')

  protected debounced: Resource<string> = debounced(this.source, 1000);
}
