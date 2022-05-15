import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ColorToasts } from '../../enums/color-toasts.enum';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit {
  @Input() textMessage!: string;
  @Input() time = '2000';
  @Input() colorToasts = ColorToasts.Default;
  @Output() closeToasts = new EventEmitter();

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.closeToasts.emit();
    }, Number(this.time));
  }
}
