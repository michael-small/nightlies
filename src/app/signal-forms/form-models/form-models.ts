import { Component, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Todo, TodoAllCRUDService } from '../../todo.service';
import { firstValueFrom } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-models',
  imports: [JsonPipe],
  template: `
    <h1>Form Models</h1>
    <a href="https://angular.dev/guide/forms/signals/models" target="_blank">Form Models</a>

    <blockquote>
      <p>
        Forms require managing data that changes over time. Without a clear structure, this data can
        become scattered across component properties, making it difficult to track changes, validate
        input, or submit data to a server. Form models solve this by centralizing form data in a
        single writable signal. When the model updates, the form automatically reflects those
        changes. When users interact with the form, the model updates accordingly.
      </p>
    </blockquote>

    <blockquote>
      <p>
        For optional fields, explicitly set them to an empty value or null. Native text controls
        like "input type=text" and "textarea" don't support null, use '' to represent an empty
        value. Fields set to undefined are excluded from the field tree. A model with "value:
        undefined" behaves identically to an empty object - accessing the field returns undefined
        rather than a FieldTree.
      </p>
    </blockquote>

    <pre>todoModel value: {{ todoModel() | json }}</pre>
    <pre>todoForm value: {{ todoForm().value() | json }}</pre>
  `,
})
export class FormModels {
  readonly #userService = inject(TodoAllCRUDService);

  protected todoModel = signal<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  protected todoForm = form(this.todoModel);

  constructor() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const todoData = await firstValueFrom(this.#userService.getOne(1));
    this.todoModel.set(todoData);
  }
}
