import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/services/lead.service';
import { CompaignService } from '../../services/compaign.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compaign',
  templateUrl: './compaign.component.html',
  styleUrls: ['./compaign.component.css']
})
export class CompaignComponent implements OnInit {

  Compaigns: any;
  Leads: any;
  searchText: '';
  p: number = 1;
  key = 'id';
  reverse:boolean = false;
  LeadId: any;
  todayDate = this.datepipe.transform(Date.now() , 'yyyy-MM-dd');

  get name (){return this.leadForm.get('name')};
  get email (){return this.leadForm.get('email')};
  get phone (){return this.leadForm.get('phone')};

  compForm = {name: '', email: '', compaigndate: '' , lead: ''};
  UpdateForm = {name: '', email: '', id: ''};

  constructor(
    private _fb: FormBuilder,
    private comSrv: CompaignService,
    private toast: ToastrService,
    private leadSrv: LeadService,
    public datepipe: DatePipe
    ) { }


  leadForm = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  })


  ngOnInit(): void {

    this.comSrv.getallCompaigns().subscribe((res: any) => {
      this.Compaigns = res.data;
    });

    this.leadSrv.getall().subscribe((res: any) => {
      this.Leads = res.data;
    });

  }

  submit(){
    if (this.compForm.name == '' ||this.compForm.email == '' ||this.compForm.compaigndate == '') {
      this.toast.error('Please fill all fields' , '' ,{
        timeOut: 2000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.compForm.lead = this.LeadId;
    this.comSrv.createCompaigns(this.compForm).subscribe((res: any) => {
      if (res.message == "success") {
        this.toast.success('Successfully add' , '' ,{
          timeOut: 3000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.comSrv.getallCompaigns().subscribe((res: any) => {
          this.Compaigns = res.data;
        });
        document.getElementById('closeModal2').click();
        document.getElementById('closeModal3').click();
        this.compForm.name = '';
        this.compForm.email = '';
        this.compForm.compaigndate = '';
      }
    });
    }
  }

  submitLead(form: FormGroup){
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
        document.getElementById('leadModalClose').click();
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

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  Onselect(id){
    this.LeadId = id;
  }

  UpdateCompaign(){
    if (this.UpdateForm.name == '' || this.UpdateForm.email == '') {
      this.toast.error('Your Credentials is not correct' , '' ,{
        timeOut: 2000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.comSrv.edit(this.UpdateForm).subscribe((data: any) => {
        console.log(data);
        if (data.message == 'success') {
          this.toast.success('Updated Successfully' , '' ,{
            timeOut: 2000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          this.comSrv.getallCompaigns().subscribe((res: any) => {
            this.Compaigns = res.data;
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
  singleOnclick(id){
    this.comSrv.singleCompaign(id).subscribe((res: any) => {
      // console.log(res);
      this.UpdateForm.name = res.data[0].name;
      this.UpdateForm.email = res.data[0].email;
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
        this.comSrv.delete(id).subscribe((data: any) => {
          console.log(data)
          if (data.message == 'success') {
            this.toast.success('Deleted Successfully' , '' ,{
              timeOut: 2000,
              positionClass: 'toast-bottom-left',
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.comSrv.getallCompaigns().subscribe((res: any) => {
              this.Compaigns = res.data;
            });
          } else{
            console.log('something went wrong');
          }
        });
      }
    });
  }

}
