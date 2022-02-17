import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import * as $ from 'jquery';
enum CheckBoxType { BUYER, SELLER, NONE };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  check_box_type = CheckBoxType;

  currentlyChecked!: CheckBoxType;

  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  constructor(private buyerService : CustomerService, private route : Router) { }
  ngOnInit(): void {
  }

  @Input()
  accData : any = {
    "customerId" : 0,
    "fName" : '' ,
    "lName" : '',
    "phoneNumber" : '',
    "email" : '' ,
    "pan" : '',
    "adhar" : '',
    "password" : '' 
  }

  



public set! : string ;
typeOfUser(val:string){
  if(val=="seller")
  {
    this.set="seller"
  }
  else{
    this.set="buyer"
  }
}
errmsg : any;
createAccount(){
  this.errmsg = ""
  if(this.accData.fName == null || this.accData.fName == ""){
    this.errmsg = "first Name is required"
    throw new Error
  }
  
  if(this.accData.lName == null || this.accData.lName == ""){
    this.errmsg = "Last Name is required"
    throw new Error
  }
  if(this.accData.email == null || this.accData.email == ""){
    this.errmsg = "Email is required"
    throw new Error
  }
  if (this.accData.phoneNumber <= 999999999 || this.accData.phoneNumber >= 99999999999 ) {
    this.errmsg = 'Enter valid mobile number';
    throw new Error();
  }
  if (this.accData.pan == '' || this.accData.pan == null) {
    this.errmsg = 'Enter valid PAN';
    throw new Error();
  }
  if (this.accData.adhar == '' || this.accData.adhar == null) {
    this.errmsg = 'Enter valid adhar';
    throw new Error();
  }
  if(this.accData.password == null || this.accData.password == ""){
    this.errmsg = "password is required"
    throw new Error
  }
  if(this.set == null || this.set == ""){
    this.errmsg = "select your Role!"
    throw new Error
  } 
  if(this.set=="buyer"){
      this.buyerService.createBuyer(this.accData).subscribe(data=> this.route.navigate(['/login']),
      error=> this.errmsg = "Email Id is already Registered"   )
  }
  else if(this.set=="seller")
  {
    this.buyerService.createSeller(this.accData).subscribe(data=> this.route.navigate(['/login']),
    error=> this.errmsg = "Email Id is already Registered" )
  }
}
}