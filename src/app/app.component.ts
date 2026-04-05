import { Component, VERSION } from '@angular/core';
import { FormsWithSignalsDocPage } from './signal-forms/basic-tutorial/forms-with-signals-doc-page';
import { FormModels } from './signal-forms/form-models/form-models';

@Component({
  selector: 'app-root',
  imports: [FormsWithSignalsDocPage, FormModels],
  template: `
    <pre>Version: {{ version.full }}</pre>
    <app-form-models />
    <app-forms-with-signals-doc-page />
  `,
})
export class AppComponent {
  protected version = VERSION;
}
