import { LeadService } from './../../services/lead.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder } from '@angular/forms'; //imports
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  Leads: any;
  UpdateForm = {name: '', email: '', phone: '', id: ''};
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
    });
  }

  submit(form: FormGroup){
    var data = {
      name: this.leadForm.controls.name.value,
      email: this.leadForm.controls.email.value,
      phone: this.leadForm.controls.phone.value
    }
    this.leadSrv.createLeads(data).subscribe((res: any) => {
      if (res.message == "success") {
        this.toast.success('successfully add' , '' ,{
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

  singleOnclick(id){
    this.leadSrv.singleLeads(id).subscribe((res: any) => {
      // console.log(res);
      this.UpdateForm.name = res.data[0].name;
      this.UpdateForm.email = res.data[0].email;
      this.UpdateForm.phone = res.data[0].phone;
      this.UpdateForm.id = id;
    });
  }

  delete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.leadSrv.delete(id).subscribe((data: any) => {
          if (data.message == 'success') {
            this.toast.success('Deleted Successfully' , '' ,{
              timeOut: 2000,
              positionClass: 'toast-bottom-left',
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.leadSrv.getall().subscribe((res: any) => {
              this.Leads = res.data;
            });
          } else if(data.message == "lead added in compaign") {
            this.toast.success('This Lead is member of compaign Firstly You delete Compaign' , '' ,{
              timeOut: 3000,
              positionClass: 'toast-bottom-left',
              progressBar: true,
              progressAnimation: 'increasing'
            });
          }else{
            console.log('something went wrong');

          }
        });
      }
    });
  }

  Update(){
    if (this.UpdateForm.name == '' || this.UpdateForm.email == '' ||  this.UpdateForm.phone == '') {
      this.toast.error('Your Credentials is not correct' , '' ,{
        timeOut: 2000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.leadSrv.edit(this.UpdateForm).subscribe((data: any) => {
        console.log(data);
        if (data.message == 'success') {
          this.toast.success('Updated Successfully' , '' ,{
            timeOut: 2000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          this.leadSrv.getall().subscribe((res: any) => {
            this.Leads = res.data;
          });
          document.getElementById('closeUpdateModel1').click();
        } else if(data.message == "email already taken") {
          this.toast.success('This Email is already taken' , '' ,{
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
            progressAnimation: 'increasing'
          });
        }else{
          console.log('something went wrong');
        }
      })
    }
  }

}
