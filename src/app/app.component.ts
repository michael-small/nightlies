import { JsonPipe } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <pre>{{version | json}}</pre>
  `,
  imports: [JsonPipe]
})
export class AppComponent {
  version = VERSION;
}
