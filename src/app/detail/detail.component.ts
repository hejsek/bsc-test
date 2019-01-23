import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() note;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("detail opened");
    console.log(this.note);
    $("#detail").modal("show");


    $('#detail').on('hidden.bs.modal', (e) => {
      this.modalClosed.emit();
    });

  }

  ngOnDestroy() {
    console.log("detail closed");
  }
}
