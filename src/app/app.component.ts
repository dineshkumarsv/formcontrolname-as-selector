import { Component, ElementRef } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormBuilder, FormGroup } from '@angular/forms';


const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
FormControlDirective.prototype.ngOnChanges = function () {
  this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return originFormControlNgOnChanges.apply(this, arguments);
};

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private nullCardNum: any;

  countries = [{'id':1, 'name':'India'}, {'id':2, 'name': 'USA'}, {'id':3, 'name': 'UK'}];

  name = 'Angular 6';
  paymentForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: null,
      a: null,
      country: null,
    })

  }

  isCardNumNull() {
    let cardNum = this.paymentForm.get('cardNumber').value;
    if (cardNum == null || cardNum == '') {
      (<any>this.paymentForm.get('cardNumber')).nativeElement.focus();
    }

  }
}
