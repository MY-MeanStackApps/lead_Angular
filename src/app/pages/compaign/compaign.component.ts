import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/services/lead.service';
import { CompaignService } from '../../services/compaign.service';
import Swal from 'sweetalert2'

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
  get compaigndate (){return this.compForm.get('compaigndate')};
  get lead (){return this.compForm.get('lead')};

  constructor(
    private _fb: FormBuilder,
    private comSrv: CompaignService,
    private toast: ToastrService,
    private leadSrv: LeadService
    ) { }

  compForm = this._fb.group({
    compaigndate: ['', [Validators.required]],
  })

  ngOnInit(): void {

    this.comSrv.getallCompaigns().subscribe((res: any) => {
      this.Compaigns = res.data;
    });

    this.leadSrv.getall().subscribe((res: any) => {
      this.Leads = res.data;
    });

  }

  submit(form: FormGroup){
    var data = {
      compaigndate : this.compForm.controls.compaigndate.value,
      lead : this.LeadId
    }
    this.comSrv.createCompaigns(data).subscribe((res: any) => {
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
        document.getElementById('closeModal3').click();
        document.getElementById('closeModal2').click();
        this.compForm.reset();
      }else if (res.message == "lead already") {
        this.toast.error('This Lead is already member of Compaign' , '' ,{
          timeOut: 3000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  Onselect(id){
    this.LeadId = id;
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
