import { Component } from '@angular/core';
import {DataService} from './data.service';
import {Note} from './note';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  notes: Note[] = [];
  selectedNote: Note;
  opened: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.dataService.getNotes()
      .then(resp => {
        this.notes = resp;
      }).catch(errResp => {
      // process error here
    });
  }

  closeNote() {
    this.selectedNote = null;
    this.opened = null;
  }

  openNoteAdd() {
    this.opened = "add";
    this.selectedNote = null;
  }

  openNoteDetail(note: Note) {
    this.dataService.getNote(note.id)
      .then(resp => {
        //api always return same result so we cant count on it
        this.selectedNote = note;
        this.opened = "detail";
      }).catch(errResp => {
      // process error here
    });
  }

  openNoteEdit(note: Note) {
    this.dataService.getNote(note.id)
      .then(resp => {
        this.selectedNote = note;
        this.opened = "edit";
      }).catch(errResp => {
        // process error here
    });
  }

  deleteNote(note: Note) {
    if(confirm('Are you sure you want to delete ' + note.title)) {
      this.dataService.deleteNote(note.id)
        .then(resp => {
          // this is just to make sure than modal is closed
          this.selectedNote = null;
          this.getNotes();
        }).catch(errResp => {
        // process error here
      });
    }
  }


}
