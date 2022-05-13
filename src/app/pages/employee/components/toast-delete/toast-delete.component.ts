import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeToast } from '../../enums/type-toast.enum';

@Component({
  selector: 'app-toast-delete',
  templateUrl: './toast-delete.component.html',
  styleUrls: ['./toast-delete.component.scss']
})
export class ToastDeleteComponent implements OnInit {

  @Input() toastType!: TypeToast;
  @Output() onCancellation = new EventEmitter;
  
  constructor() { }

  ngOnInit() {
    
  }
}
