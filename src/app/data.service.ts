import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Note} from './note';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }


//   GET /notes
//   GET /notes/{id}
// POST /notes
// PUT /notes/{id}
// DELETE /notes/{id}


  getNotes(): Promise<any> {
    return this.http.get('http://private-9aad-note10.apiary-mock.com/notes')
      .toPromise()
      .then(response => {
        return response;
      });
  }

  getNote(id: number): Promise<any> {
    return this.http.get<Note>('http://private-9aad-note10.apiary-mock.com/notes/' + id)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  editNote( note: Note) {
    const body = {...note};
    return this.http.put('http://private-9aad-note10.apiary-mock.com/notes/' + note.id, body)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  addNote(title: string, text: string) {

    // this is how we add headers to request
    const headers =  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    const body = {title: title, text: text};
    return this.http.post('http://private-9aad-note10.apiary-mock.com/notes', body, headers)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  deleteNote(id: number): Promise<any> {
    return this.http.delete('http://private-9aad-note10.apiary-mock.com/notes/' + id)
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
