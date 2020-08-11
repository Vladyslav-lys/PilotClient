import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { SignalRService } from '../_services/signalR.service';
import { ActivatedRoute, Router } from '@angular/router';
import { operationStatusInfo } from '../_models/operationStatusInfo';
import { AlertService } from '../_services/alert.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private serviceConnectionClient: SignalRService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    var th = this;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
	  .then(function (operationStatus : operationStatusInfo){
      if (operationStatus.operationStatus == 1) {
        localStorage.setItem('currentUser', JSON.stringify(operationStatus.attachedObject));
        th.authenticationService.setAuth(true);
        console.log(operationStatus.attachedObject);
        th.router.navigate(['/']);
      }
      else {
        th.alertService.error(operationStatus.attachedInfo);
        th.loading = false;
      }
    }).catch(err => {
      console.log(err);
      this.alertService.error(err.toString());
      this.loading = false;
    });
  }
	
	enableBtn():boolean {
		if(this.f.username.value.length > 0 && this.f.password.value.length > 0)
			return true;
		return false;
	}
}
/*this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        th.authenticationService.setAuth(true);
        th.router.navigate(['/dhome']);
      }, error => {
          console.log(error);
          th.alertService.error(error.error);
          th.loading = false;
      });*/