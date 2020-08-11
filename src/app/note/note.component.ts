import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Note } from '../_models/note';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import {operationStatusInfo} from '../_models/operationStatusInfo';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  currentNoteId: number;
  currentNote: Note;
  currentImage: any;
  noteForm: FormGroup;
  fileInBase64: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              this.currentNoteId = +this.route.snapshot.paramMap.get('id');
              this.LoadNoteInfo(this.currentNoteId);
            });
        }
      });

  }

  ngOnInit(): void {
	this.fileInBase64 = this.currentNote.image;
	  
    this.noteForm = this.formBuilder.group({
      title: [this.currentNote.title],
      text: [this.currentNote.text]
    });
  }
  
  onFileChanged(event) {
    var noteComponent = this;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      var fr = new FileReader();
      fr.onload = function () {
        var split1 = fr.result.toString().split(":",2);
        var split2 = split1[1].split(";",2);
		
        noteComponent.currentNote.image = fr.result.toString();
        noteComponent.fileInBase64 = fr.result.toString();
      }
      fr.readAsDataURL(file);
    }
  }

  LoadNoteInfo(currentNoteId: number){
    var th = this;
    var notes = JSON.parse(sessionStorage.notes);
    notes.forEach(function (item: Note){
      if(item.id == currentNoteId){
        th.currentNote = item;
		th.currentImage = item.image;
        console.log(item);
      }
    });
  }

  async EditNote() {
    if(this.noteForm.controls.title.value == this.currentNote.title
          && this.noteForm.controls.text.value == this.currentNote.text
		  && this.currentImage == this.currentNote.image){
      alert("No data has been changed!");
      return;
    }

    this.currentNote.text =  this.noteForm.controls.text.value;
    this.currentNote.title =  this.noteForm.controls.title.value;

    var splitted = this.fileInBase64.split(",", 2);
    this.currentNote.image = splitted[1];
    this.currentNote.modifyTime = new Date();

    var th = this;
	await this.authenticationService.editNote(this.currentNote)
	.then(function (note: Note){
		alert("Note info updated successfully");
        th.router.navigate(['/']);
    }).catch(function(err) {
      console.log("Error updating note");
      alert(err);
    });
  }
}

/*this.authenticationService.editNote(this.currentNote)
      .subscribe(result => {
        alert("Note info updated successfully");
        th.router.navigate(['/dhome']);
      }, error => {
          console.log(error.error);
          alert(error.error);
      });*/
	  
/*this.authenticationService.editNote(this.currentNote).then(function (operationStatus: operationStatusInfo){
      if (operationStatus.operationStatus == 1) {
		alert("Note info updated successfully");
        th.router.navigate(['/dhome']);
      }
      else {
        console.log(operationStatus.attachedInfo);
        alert(operationStatus.attachedInfo);
      }
    }).catch(function(err) {
      console.log("Error updating note");
      alert(err);
    });*/