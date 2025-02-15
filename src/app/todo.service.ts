import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoAllCRUDService {
  private readonly http = inject(HttpClient);

  private url = `https://jsonplaceholder.typicode.com/todos`;

  getOne(id: number) {
    return this.http.get<Todo>(`${this.url}/${id}`);
  }

  getAll(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.url)
      .pipe(map((todos) => todos.filter((td) => td.id < 3)));
  }

  create(value: Todo) {
    return this.http.post<Todo>(this.url, { value });
  }

  update(value: Todo) {
    return this.http.put<Todo>(`${this.url}/${value.id}`, value);
  }

  delete(value: Todo) {
    return this.http.delete(`${this.url}/${value.id}`);
  }
}
