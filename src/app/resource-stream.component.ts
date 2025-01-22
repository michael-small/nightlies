import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, resource, signal } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounce, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-resource-stream',
  imports: [AsyncPipe, FormsModule, JsonPipe],
  template: `
    <h2><code>rxResource</code></h2>
    <div class="stream-and-resource">
        <code>response$ (BehaviorSubject): {{response$ | async}}</code>
        <code>res (rxResource): {{resRxResource.value()}}</code>
    </div>
    <button (click)="response$.next(response$.getValue() + 1)">Increment <code>resource$</code></button>

    <h2><code>resource</code></h2>
    @let value = $any(stream)().value;
    @let error = $any(stream)().error;
    <div class="stream-and-resource">
        @if (value) {
            <code>stream (signal): {{value}}</code>
            <code>res (resource): {{resResource.value()}}</code>
        } @else if (error) {
            <code>stream (signal): {{error}}</code>
            <code>res (resource): {{resResource.error()}}</code>
        }
    </div>
    <button (click)="stream.set({value: value + 1})">Increment <code>stream()</code></button>
    <button (click)="stream.set({error: 'oh no!'})">Set stream to errored</button>

    <h2>Typeaheads now work with resources!</h2>
    <label for="typeahead">Typeahead</label>
    <input name="typeahead" type="text" [(ngModel)]="typeaheadValue"/>
    <pre>typeaheadderivedoptions: {{typeaheadDerivedOptions.value() | json}}</pre>
  `,
  styles: `
    .stream-and-resource {
        display: flex;
        flex-direction: column;
    }
  `
})
export class ResourceStreamComponent {
    response$ = new BehaviorSubject(1);
    resRxResource = rxResource({
      loader: () => this.response$
    });

    stream = signal<{value: number} | {error: unknown}>({value: 1});
    resResource = resource({
      stream: async () => this.stream,
    });

    typeaheadValue = signal('')
    typeaheadOptionsStream$ = toObservable(this.typeaheadValue).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((res) => [`${res}1`, `${res}2`, `${res}3`])
    );

    typeaheadDerivedOptions = rxResource({
        loader: () => this.typeaheadOptionsStream$
    })
}
