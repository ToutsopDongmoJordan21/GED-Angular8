import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_services/user';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    //show spinner
    this.SpinnerService.show();
  

    this.userService.getUser(this.id)
    .subscribe(data => {
      console.log(data)
      this.user = data;
    }, error => console.log(error));
    //hide method
    this.SpinnerService.hide();
  }

  updateUser() {
     //show spinner
     this.SpinnerService.show();

    this.userService.updateUser(this.id, this.user)
      .subscribe(data => {
        console.log(data);
        this.user = new User();
        this.gotoList();
        alert('successful update');
      }, error => console.log(error));
      //hide method
      this.SpinnerService.hide();
  }

  onSubmit() {
    this.updateUser();
  }

  gotoList() {
    this.router.navigate(['/profile']);
  }

}
