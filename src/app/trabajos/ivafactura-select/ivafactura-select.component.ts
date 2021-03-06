import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ivafactura-select',
  templateUrl: './ivafactura-select.component.html',
  styleUrls: ['./ivafactura-select.component.scss']
})
export class IvafacturaSelectComponent implements OnInit {

  @Input() object: any;
  @Input() placeHolder: string;
  @Input() id: string;
  @Input() desc: string;
  @Input() addEmptyOption: boolean;
  @Input() required: boolean;

  @Output() onChange: EventEmitter<{id: number, desc: string}> = new EventEmitter<{id: number, desc: string}>();

  public lista: Array<{id: number, desc: string}>;
  public fc: FormControl = new FormControl();

  constructor() {
    this.lista = new Array();
    const ivaEx: {id: number, desc: string} = {id: 0, desc: '0 %'};
    const ivaMin: {id: number, desc: string} = {id: 10, desc: '10 %'};
    const ivaBas: {id: number, desc: string} = {id: 22, desc: '22 %'};
    this.lista.push(ivaEx);
    this.lista.push(ivaMin);
    this.lista.push(ivaBas);
   }

  ngOnInit() {
    if (this.required) {
      this.fc.setValidators([Validators.required]);
    }
  }

  onChangeValue(evt) {
    this.onChange.emit(this.lista.find((x) => x.id === evt.value));
  }
}
