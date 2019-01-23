import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {DataService} from "../data.service";
import {Note} from "../note";

declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() note;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter();
  form: FormGroup;

  constructor(fb: FormBuilder, private dataService: DataService) {

    this.form = fb.group({
      "title": new FormControl("", Validators.required),
      "text": new FormControl("", Validators.required)
    });
  }


  ngAfterViewInit() {
        $('#edit').modal('show');

    $('#edit').on('hidden.bs.modal', (e) => {
      this.modalClosed.emit();
    });
  }

  ngOnInit() {
    if(this.note) {
      this.form.controls["title"].setValue(this.note.title);
      this.form.controls["text"].setValue(this.note.text);
    }
  }


  onSubmit() {
    console.log(this.form);
    let title = this.form.controls["title"].value;
    let text = this.form.controls["text"].value;

    if(this.note) {
      let note: Note = {id: this.note.id, title: title, text: text};

      this.dataService.editNote(note)
        .then(resp => {
          $('#edit').modal('close');
        }).catch(errResp => {
          //error handling here
      });
    } else {
      this.dataService.addNote(title, text)
        .then(resp => {
          $('#edit').modal('close');
        }).catch(errResp => {
          //error handling here
      });
    }

  }
}
