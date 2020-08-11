import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {operationStatusInfo} from '../_models/operationStatusInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /*file: File;
  fileName: string = "Choose file";*/
  fileInBase64: any;
  user: User;
  profileForm: FormGroup;
  loading = false;
  submitted = false;

  constructor (
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.currentUser);
    this.user.account.photo = "data:image/png;base64," + this.user.account.photo;
    this.fileInBase64 = this.user.account.photo;
    this.user.account.birthday = new Date(this.user.account.birthday);

    this.profileForm = this.formBuilder.group({
      lastName: [this.user.account.lastName, Validators.required],
      firstName: [this.user.account.firstName, Validators.required],
      nickName: [this.user.account.nickname, Validators.required],
      email: [this.user.account.email, Validators.required],
      birthday: [this.user.account.birthday, Validators.required],
      accessLevel: [this.user.accessLevel],
      active: [this.user.isActive]
	  
	  /*lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['', Validators.required]*/
    });
  }
  
  onFileChanged(event) {
    var profileComponent = this;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      var fr = new FileReader();
      fr.onload = function () {
        var split1 = fr.result.toString().split(":",2);
        var split2 = split1[1].split(";",2);
		
        profileComponent.user.account.photo = fr.result.toString();
		    profileComponent.fileInBase64 = fr.result.toString();
      }
      fr.readAsDataURL(file);
    }
  }

  EditProfile(){
	
	this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
	
    var newUser: User;
    newUser = this.user;
    if (this.profileForm.controls.lastName.value != null)
      newUser.account.lastName = this.profileForm.controls.lastName.value;
    if (this.profileForm.controls.firstName.value != null)
      newUser.account.firstName = this.profileForm.controls.firstName.value;
    if (this.profileForm.controls.nickName.value != null)
      newUser.account.nickname = this.profileForm.controls.nickName.value;
    if (this.profileForm.controls.email.value != null)
      newUser.account.email = this.profileForm.controls.email.value;
	  if (this.profileForm.controls.birthday.value != null)
      newUser.account.birthday = this.profileForm.controls.birthday.value;
    if (this.profileForm.controls.accessLevel.value != null)
      newUser.accessLevel = this.profileForm.controls.accessLevel.value;
    if (this.profileForm.controls.active.value != null)
      newUser.isActive = this.profileForm.controls.active.value;
    if (this.fileInBase64 != null) {
      var splitted = this.fileInBase64.split(",", 2);
      newUser.account.photo = splitted[1];
    }
    newUser.account.modifyTime = new Date();

    var th = this;
	this.authenticationService.invokeUpdateAccountInfo(newUser)
    .then(function (operationStatus: operationStatusInfo) {
      if (operationStatus.operationStatus == 1) {
		var message = "User info updated successfully";
        console.log(message);
        alert(message);
        localStorage.setItem('currentUser', JSON.stringify(operationStatus.attachedObject));
        th.router.navigate(['/']);
      }
      else {
        alert(operationStatus.attachedInfo);
      }
    }).catch(function(err) {
      console.log("Error while updating user info");
      alert(err);
	  th.loading = false;
    });
  }
  
  enableBtn():boolean {
		if(this.profileForm.controls.lastName.value.length > 0 && this.profileForm.controls.firstName.value.length > 0
			&& this.profileForm.controls.nickName.value.length > 0 && this.profileForm.controls.email.value.length > 0
      && this.profileForm.controls.birthday.value != null)
			return true;
		return false;
	}
}

/*this.authenticationService.invokeUpdateAccountInfo(newUser)
      .subscribe(result => {
        var message = "User info updated successfully";
        console.log(message);
        alert(message);
        localStorage.setItem('currentUser', JSON.stringify(result));
        th.router.navigate(['/dhome']);
      }, error => {
        console.log(error.error);
          alert(error.error);
          th.loading = false;
      });*/
