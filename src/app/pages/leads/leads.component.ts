import { LeadService } from './../../services/lead.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder } from '@angular/forms'; //imports
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  Leads: any;

  get name (){return this.leadForm.get('name')};
  get email (){return this.leadForm.get('email')};
  get phone (){return this.leadForm.get('phone')};

  constructor(
    private _fb: FormBuilder,
    private leadSrv: LeadService,
    private toast: ToastrService
    ) { }
  leadForm = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  })
  ngOnInit(): void {
    this.leadSrv.getall().subscribe((res: any) => {
      this.Leads = res.data;
      console.log(res);
    })
  }

  submit(form: FormGroup){
    var data = {
      name: this.leadForm.controls.name.value,
      email: this.leadForm.controls.email.value,
      phone: this.leadForm.controls.phone.value
    }
    this.leadSrv.createLeads(data).subscribe((res: any) => {
      if (res.message == "success") {
        this.toast.error('successfully add' , '' ,{
          timeOut: 1000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.leadSrv.getall().subscribe((res: any) => {
          this.Leads = res.data;
        });
        document.getElementById('closeModal1').click();
        this.leadForm.reset();
      }else if (res.message == "email already") {
        this.toast.error('Email is alreday exist' , '' ,{
          timeOut: 2000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    })
  }

}
