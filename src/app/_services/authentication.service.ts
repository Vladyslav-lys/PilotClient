import { Injectable } from '@angular/core';
import { SignalRService } from './signalR.service';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
      private serviceClient: SignalRService,
	  private router: Router
    ) {
    }

    public getAuth(): boolean {
      var result: boolean;
      if(localStorage.getItem('isLoggedIn') != null)
        result = JSON.parse(localStorage.isLoggedIn);
      else
        result = false;
      return result;
    }

    public setAuth(value: boolean){
      localStorage.setItem('isLoggedIn', JSON.stringify(value));
    }
	
	public getAccessProfile(): boolean {
      var result: boolean;
      if(localStorage.getItem('isAllowedProfile') != null)
        result = JSON.parse(localStorage.isAllowedProfile);
      else
        result = false;
      return result;
    }

    public setAccessProfile(value: boolean){
      localStorage.setItem('isAllowedProfile', JSON.stringify(value));
    }
	
	public getAccessTeacher(): boolean {
      var result: boolean;
      if(localStorage.getItem('isAllowedTeacher') != null)
        result = JSON.parse(localStorage.isAllowedTeacher);
      else
        result = false;
      return result;
    }

    public setAccessTeacher(value: boolean){
      localStorage.setItem('isAllowedTeacher', JSON.stringify(value));
    }

    login(username, password, serviceClient = this.serviceClient) {
      var th = this;
        return new Promise(function (resolve, reject) {
          serviceClient.hubConnection.invoke("Login", username, password)
            .then(function (operationStatus) {
              resolve(operationStatus);
            }).catch(function (err) {
              reject(err);
          });
      });
    }

  async getNotesByAccountId(AccountId, serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("getNotesByAccountId", AccountId)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }

  editNote(note, serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("editNoteById", note)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }

  invokeUpdateAccountInfo(user, serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("UpdateUser", user)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  getAllUsers(serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("GetAllUsers")
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  getAllStudents(serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("GetAllStudents")
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  getAllLoggedInUsers(serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("GetAllLoggedInUsers")
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  getAllLoggedInStudents(serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("GetAllLoggedInStudents")
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }

  addUser(user, serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("RegistrationUser", user)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }

  deleteUser(id, serviceClient = this.serviceClient) {
    return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("DeleteUser", id)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  activateUser(id, serviceClient = this.serviceClient) {
	return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("ActivateUser", id)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  deactivateUser(id, serviceClient = this.serviceClient) {
	return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("DeactivateUser", id)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
        reject(err);
      });
    });
  }
  
  changeUserStatus(id, status, serviceClient = this.serviceClient) {
	return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("DeactivateUser", id, status)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
          reject(err);
      });
    });
  }

  logout(id, serviceClient = this.serviceClient) {
	this.setAuth(null);
	this.setAccessProfile(null);
	this.setAccessTeacher(null);
	localStorage.setItem('currentUser', JSON.stringify(null));
	this.router.navigate(['/']);
	
	return new Promise(function (resolve, reject) {
      serviceClient.hubConnection.invoke("Logout", id)
        .then(function (operationStatus) {
          resolve(operationStatus);
        }).catch(function (err) {
		  reject(err);
      });
    });
    }
}
