import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit() {
    //show spinner
    this.SpinnerService.show();

    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;  
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; 

        //hide method
      this.SpinnerService.hide();
      }
    );
  }
}
