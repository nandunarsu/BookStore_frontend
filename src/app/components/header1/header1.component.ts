import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component implements OnInit {

  constructor(private dialog:MatDialog ,private router:Router,private data:DataService){}
  loginclick:boolean=false
  loggedin:boolean=false

  ngOnInit(): void {
  }

}
