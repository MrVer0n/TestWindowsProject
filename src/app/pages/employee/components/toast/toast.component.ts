import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeToast } from '../../enums/type-toast.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() toastType!: TypeToast;
  @Output() onCancellation = new EventEmitter;
  
  constructor() { }

  ngOnInit() {
    
  }
}
