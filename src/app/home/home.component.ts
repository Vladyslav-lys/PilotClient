import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {operationStatusInfo} from '../_models/operationStatusInfo';
import {Note} from '../_models/note';
import {User} from '../_models/user';
import {SignalRService} from '../_services/signalR.service';
import {HubConnectionState} from '@microsoft/signalr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: Note[];

  constructor(
    private serviceClient: SignalRService,
    private authenticateService: AuthenticationService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {

    if(this.serviceClient.hubConnection.state == HubConnectionState.Connected){
      await this.GetNotes();
    }
    else {
      setTimeout(async () => await this.GetNotes(), 500);
    }

  }

  async GetNotes() {
    var th = this;
    var user: User = JSON.parse(localStorage.currentUser);
    await this.authenticateService.getNotesByAccountId(user.account.id).then(function (operationStatus: operationStatusInfo){
      if (operationStatus.operationStatus == 1) {
        var nts = operationStatus.attachedObject;
        for (let note of nts){
          note.image = 'data:image/png;base64,' + note.image;
        }
        th.notes = nts;
        console.log(th.notes);
        localStorage.setItem("notes", JSON.stringify(nts));
      }
      else {
        console.log(operationStatus.attachedInfo);
        localStorage.setItem("notes", JSON.stringify(""));
        alert(operationStatus.attachedInfo);
      }
    }).catch(function(err) {
      console.log("Error loading notes");
      alert(err);
    });
  }

  LoadFullNote(note: number){
    this.router.navigate(['/note',note]);
  }

}
