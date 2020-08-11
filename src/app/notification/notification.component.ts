import { OnInit, Component, ViewChild, TemplateRef } from "@angular/core";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from "../_services/notify.service";
import { Message } from "../_models/message";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationsService,
    private toastrService: ToastrService,
    private notifySerivce: NotifyService,
  ) {
  }

  ngOnInit(){
	this.callNotificationEnteredText();
	this.callNotificationUnicastText();
  }

  callNotificationEnteredText() {
    this.notifySerivce.getNotifyEnteredText(this.toastrService);
  }
  
  callNotificationConnectedText() {
    this.notifySerivce.getNotifyConnectedText(this.toastrService);
  }
  
  callNotificationUnicastText() {
    this.notifySerivce.getNotifyUnicastText(this.toastrService);
  }
}

{
  //@ViewChild('notifyView', { read: TemplateRef, static: false }) notifyView: TemplateRef<any>;

  /*this.notifySerivce.getNotifyText()
        .then(function (message: Message) {
          this.notificationService.success(message.senderName, message.text, {
            position: ['bottom', 'right'],
            animate: 'fade',
            showProgressBar: false,
          });
        }).catch(function (err) {
          console.log(err.error);
          alert(err.error);
        });*/

/*this.notifySerivce.getNotifyText()
      .subscribe(message => {
        this.notificationService.info(message.senderName, message.text, {
          position: ['bottom', 'right'],
          animate: 'fade',
          showProgressBar: false,
        });
      }, error => {
        console.log(error.error);
        alert(error.error);
      });*/

/*let context: any = { text: 'A simple primary alert—check it out!' };;
  this.notificationService.html(this.notifyView, null, null, null, context);*/

/*this.notifySerivce.getNotifyText()
  .subscribe(message => {
    let context: any = { text: message.text };;
    this.notificationService.html(this.notifyView, null, {
      position: ['bottom', 'right'],
      animate: 'fade',
      showProgressBar: false,
    }, null, context);
  }, error => {
    console.log(error.error);
    alert(error.error);
  });*/
}
