import { Component } from '@angular/core';

@Component({
  selector: 'app-untagged-templates',
  imports: [],
  template: 'Message: {{`Hello, ${name} - ${value}`}}',
  styles: ``
})
export class UntaggedTemplatesComponent {
    // https://github.com/angular/angular/pull/59230/files#diff-99c6fe239750aedeef322f1ac5b9e8b21ca914b48afc52787f5fd45736128f3cR2718
    name = 'Michael';
    value = 'Small';
}
