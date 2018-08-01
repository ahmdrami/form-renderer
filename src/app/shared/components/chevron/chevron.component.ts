import { Component, Input } from '@angular/core';

@Component({
    selector: 'z-chevron',
    template: `
    <span class="chevron" [ngClass]="collapsed ? 'chevron--up' : 'chevron--down' ">
        <svg preserveAspectRatio="xMaxYMax" 
        [style.height]="_height" [style.width]="_width" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g class="chevron__container">
                <svg:path class="chevron__line1" d="M10 50h40"/><path class="chevron__line2" d="M90 50H50"/>
            </g>
        </svg>
    </span>
  `,
    styleUrls: ['./chevron.component.scss']
})
export class ChevronComponent {
    _height: string;
    _width: string;

    @Input('height')
    set height(value: number) {
        this._height = value ? `${value}px` : '25px';
    }
    @Input('width')
    set width(value: number) {
        this._width = value ? `${value}px` : '25px';
    }

    @Input() collapsed: boolean;
}
