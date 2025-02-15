import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { Todo } from './todo.service';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe],
  template: `
    <pre>{{todos.value() | json}}</pre>
  `,
  styles: ``
})
export class HttpResourceComponent {
    private url = `https://jsonplaceholder.typicode.com/todos`;

    // For more examples, see the tests from the PR: 
    // https://github.com/angular/angular/pull/59876/files#diff-a3ccb3778a1821be2d303f932f53036a5ff507cda412db0ed800fa55dba698bdR14

    // Default GET
    todos = httpResource<Todo[]>(this.url, {defaultValue: []})
}
