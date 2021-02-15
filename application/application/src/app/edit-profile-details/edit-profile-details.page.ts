import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth/auth.service';
import { ProfileService } from '../api/profile.service';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-profile-details',
  templateUrl: './edit-profile-details.page.html',
  styleUrls: ['./edit-profile-details.page.scss'],
})
export class EditProfileDetailsPage implements OnInit {

  constructor(public ps: ProfileService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.ps.getUser().subscribe(
      data => {

        console.log(data);
        this.ps.user = data;

        console.log(this.ps.user)
        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
    //window.open(this.authService.logoutUrl);
  }

  updateUser(u: User) {
    //u.username = document.getElementById("username").innerText;
    //console.log(u.desc)
    //u.desc = document.getElementById("desc").innerText;
    //console.log(u.desc)

    console.log(u)

    this.ps.updateUser(u).subscribe(data => {
      //nach unpdate erneutes getAll
      console.log(data)
      this.ps.user = data;
    });
  }

}
