import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <pre>Version: {{version.full}}</pre>
  `,
})
export class AppComponent {
  protected version = VERSION;
}
