import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-admin-createseller',
  templateUrl: './admin-createseller.component.html',
  styleUrls: ['./admin-createseller.component.css']
})
export class AdminCreatesellerComponent implements OnInit {
  @Input()
  sellerData: any = {
    customerId: 0,
    sellerId: 0,
    fName: '',
    lName: '',
    phoneNumber: 0,
    email: '',
    pan: '',
    adhar: '',
    password: '',
  };
  constructor(private sellerService : CustomerService, private route : Router) { }

  ngOnInit(): void {
  }
errmsg : any;
  createSeller(){
    if(this.sellerData.password == null || this.sellerData.password == ""){
      this.errmsg = "password is required"
    }
    if(this.sellerData.email == null || this.sellerData.email == ""){
      this.errmsg = "Email is required"
    }
    if(this.sellerData.lName == null || this.sellerData.lName == ""){
      this.errmsg = "Last Name is required"
    }
    if(this.sellerData.fName == null || this.sellerData.fName == ""){
      this.errmsg = "first Name is required"
    }
    
    this.sellerService.createSeller(this.sellerData).subscribe(data=> this.route.navigate(['/adminmenu']),
    error=> this.errmsg = "Email Id is already Registered" 
    );
  }

}
