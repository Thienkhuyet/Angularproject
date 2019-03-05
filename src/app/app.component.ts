import { Component, OnInit,  } from '@angular/core';
import { UserServiceService } from './user-service.service';
import {map} from'rxjs/Operators'
import { read } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'New Form';
  constructor(
    private uerService:UserServiceService
  ){}
  ngOnInit(): void {
    this.uerService.getUserDetile().pipe(map((res)=>{res.carrierUserRequirements.map(item=>{
      return item;
    })
    console.log(res.firstName);
    
  })).subscribe(res=>{
      console.log(res);
    })
   
  }
}
