import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { operationStatusInfo } from '../_models/operationStatusInfo';
import { NotifyService } from '../_services/notify.service';
import { Message } from '../_models/message';
import {HubConnectionState} from '@microsoft/signalr';
import {SignalRService} from '../_services/signalR.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;
  messageText: string;
  notifyForm: FormGroup;

  users: User[];

  users2: User[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
	private serviceClient: SignalRService,
    private notifySerivce: NotifyService,
    private formBuilder: FormBuilder
  ) {
  }

  async ngOnInit(): Promise<void>{
    this.user = JSON.parse(localStorage.currentUser);
	
	if(this.serviceClient.hubConnection.state == HubConnectionState.Connected){
	  await this.getAllUsers()
    }
    else {
      setTimeout(async () => {
		  await this.getAllUsers()
		}, 500);
    }

    this.notifyForm = this.formBuilder.group({
      messageText: [this.messageText],
    });
  }

  async getAllUsers() {
    var th = this;
    
	await this.authenticationService.getAllUsers()
	  .then(function (operationStatus: operationStatusInfo) {
		var users = operationStatus.attachedObject;
        for (let user of users) {
          user.account.photo = 'data:image/png;base64,' + user.account.photo;
        }
        th.users = users;
        console.log(th.users);
        sessionStorage.setItem("users", JSON.stringify(users));
        th.users2 = JSON.parse(sessionStorage.users).map(i => ({
          idx: i,
          id: i.id,
          account: i.account,
          login: i.login,
          password: i.password,
          isActive: i.isActive,
          accessLevel:i.accessLevel
        }));
      }).catch(function(err) {
        console.log("Error while adding new user");
        alert(err);
      });
  }

  getAccessLevel(accessLevel) {
    var s = "";

    switch (accessLevel) {
      case 1:
        s = "Analitic";
        break;
      case 2:
        s = "Student";
        break;
      case 3:
        s = "Teacher";
        break;
      case 4:
        s = "Administrator";
        break;
    }

    return s;
  }

  getActive(isActive) {
    var s = "";

    switch (isActive) {
      case true:
        s = "Active";
        break;
      case false:
        s = "Banned";
        break;
    }

    return s;
  }

  openEdit(user) {
    this.router.navigate(['/fullprofile/:id']);
  }

  deleteUser(user) {
    var th = this;
	this.authenticationService.deleteUser(user.id)
	  .then(function (operationStatus: operationStatusInfo) {
		console.log(operationStatus.attachedObject);
        if (JSON.stringify(operationStatus.attachedObject))
          window.location.reload();
      }).catch(function(err) {
        console.log("Error while deleting the user");
        alert(err);
      });
  }

  openAdd() {
    this.router.navigate(['/register']);
  }

  sendNotifyAllText() {
    var th = this;

    var message: Message;
    message = new Message();
    message.senderName = this.getAccessLevel(this.user.accessLevel);
    message.text = this.notifyForm.controls.messageText.value;
	
	this.notifySerivce.sendNotifyAllEnteredText(message)
	  .then(function (operationStatus: operationStatusInfo) {
		console.log("Message is sent:" + th.notifyForm.controls.messageText.value);
        th.messageText = "";
        th.notifyForm.controls.messageText.reset();
      }).catch(function(err) {
        console.log(err);
        alert(err);
      });
  }
}

/*this.authenticationService.getAllUsers()
      .subscribe(result => {
        var users = result;
        for (let user of users) {
          user.account.photo = 'data:image/png;base64,' + user.account.photo;
        }
        th.users = users;
        console.log(th.users);
        localStorage.setItem("users", JSON.stringify(users));
        th.users2 = JSON.parse(localStorage.users).map(i => ({
          idx: i,
          id: i.id,
          account: i.account,
          login: i.login,
          password: i.password,
          isActive: i.isActive,
          accessLevel:i.accessLevel
        }));
      }, error => {
        console.log(error.error);
      });*/
	  
/*this.authenticationService.deleteUser(user.id)
      .subscribe(result => {
        console.log(result);
        if (result)
          window.location.reload();
      }, error => {
        console.log(error.error);
        alert(error.error);
      });*/
	  
/*this.notifySerivce.sendNotifyText(message)
      .subscribe(() => {
        console.log("Message is sent:" + th.notifyForm.controls.messageText.value);
        th.messageText = "";
        th.notifyForm.controls.messageText.reset();
      }, error => {
        console.log(error.error);
        alert(error.error);
      });*/