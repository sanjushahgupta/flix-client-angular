import { Component, OnInit, Input } from '@angular/core';
//to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
//to display notification
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    userName: '',
    password: '',
    email: '',
    birth: '',
  };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  registerUser(): void {
    this.fetchApiData.registration(this.userData).subscribe(
      (response) => {
        console.log('response is', response);
        this.dialogRef.close(); //will close the modal on success
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log('response is', response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
