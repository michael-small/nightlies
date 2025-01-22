import { Component, VERSION } from '@angular/core';
import { UntaggedTemplatesComponent } from './untagged-templates.component';

@Component({
  selector: 'app-root',
  template: `
    <app-untagged-templates />
    <pre>{{version.full}}</pre>
  `,
  imports: [UntaggedTemplatesComponent]
})
export class AppComponent {
  version = VERSION;
}
