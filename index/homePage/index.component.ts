import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/services/authService/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Users } from 'app/interfaces/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  
  public user: Users;
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {

  }

}