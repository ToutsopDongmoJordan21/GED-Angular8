import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(private userService: UserService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();

    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;

        //hide method
      this.SpinnerService.hide();
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
