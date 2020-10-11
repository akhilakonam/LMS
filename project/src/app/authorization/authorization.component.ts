import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({ templateUrl: 'authorization.component.html',
            styleUrls: ['authorization.css'] })
export class AuthorizationComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  otp: string;

  authData = new Map()
  .set('1111111111', '111111')
  .set('9827012012', '123456')
  .set('8991741921', '891472')
  .set('8501285921', '985284')
  .set('9425010231', '899242')
  .set('9818123237', '147294')
  .set('9308712123', '834921')
  .set('9425012345', '477293')
  .set('9928410231', '122821')
  .set('9121212421', '248891');


  onOtpChange(otp){
    this.otp = otp;
  }

  onClickSubmit(data){
    if(data && this.otp && this.authData.get(data.mobileNumber) === this.otp){
      document.getElementById('error').innerHTML = "";
      document.getElementById('success').innerHTML = "Success...logging in...";
      setTimeout(()=>{
        this.router.navigate(['/home', {'id': data.mobileNumber}]);
      }, 2000);
    }
    else{
      document.getElementById('success').innerHTML = "";
      document.getElementById('error').innerHTML = "Login failed..please try again.";
    }
  }

}
