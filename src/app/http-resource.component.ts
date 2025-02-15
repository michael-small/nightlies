import { JsonPipe, SlicePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Todo } from './todo.service';
import { createNotifier } from './create-notifier';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe, SlicePipe],
  template: `
    @for (todo of todos.value() | slice:0:3; track $index) {
        <pre>{{todo | json}}</pre>
    }
    <button (click)="makeTodoNotifier.notify()">"Create" a TODO w/POST</button>
    @if(makeTodo.value()) {
        <pre>{{makeTodo.value() | json}}</pre>
    }
  `,
  styles: ``
})
export class HttpResourceComponent {
    private url = `https://jsonplaceholder.typicode.com/todos`;

    // For more examples, see the tests from the PR: 
    // https://github.com/angular/angular/pull/59876/files#diff-a3ccb3778a1821be2d303f932f53036a5ff507cda412db0ed800fa55dba698bdR14

    // Default GET
    todos = httpResource<Todo[]>(this.url, {defaultValue: []})


    makeTodoNotifier = createNotifier();
    // From what I can initially tell, this is how to make something like a POST be on demand?
    // https://github.com/angular/angular/pull/59876/files#diff-a3ccb3778a1821be2d303f932f53036a5ff507cda412db0ed800fa55dba698bdR47
    // `it('should not make backend requests if the request is undefined',`
    makeTodo = httpResource<Todo>(() => (
        this.makeTodoNotifier.listen() ? {url: this.url, method: 'POST', body: {title: 'test', completed: true, userId: 1}}: undefined)
    )
}
