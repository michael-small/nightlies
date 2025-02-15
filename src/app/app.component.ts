import { Component, VERSION } from '@angular/core';
import { UntaggedTemplatesComponent } from './untagged-templates.component';
import { ResourceStreamComponent } from "./resource-stream.component";
import { HttpResourceComponent } from "./http-resource.component";

@Component({
  selector: 'app-root',
  template: `
    <!-- <a href="https://github.com/angular/angular/pull/59230" target="_blank"><h1>Support untagged template literals in expressions #59230</h1></a>
    <app-untagged-templates />

    <a href="https://github.com/angular/angular/pull/59573" target="_blank"><h1>feat(core): support multiple responses in resource() #59573</h1></a>
    <app-resource-stream /> -->

    <app-http-resource />

    <hr />
    <pre>Version: {{version.full}}</pre>
  `,
  imports: [UntaggedTemplatesComponent, ResourceStreamComponent, HttpResourceComponent]
})
export class AppComponent {
  version = VERSION;
}
