import { Component, VERSION } from '@angular/core';
import { FormsWithSignalsDocPage } from './signal-forms/forms-with-signals-doc-page';

@Component({
  selector: 'app-root',
  imports: [FormsWithSignalsDocPage],
  template: `
    <pre>Version: {{ version.full }}</pre>
    <app-forms-with-signals-doc-page />
  `,
})
export class AppComponent {
  protected version = VERSION;
}
