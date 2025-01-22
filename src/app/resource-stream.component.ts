import { AsyncPipe } from '@angular/common';
import { Component, computed, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resource-stream',
  imports: [AsyncPipe],
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
}
