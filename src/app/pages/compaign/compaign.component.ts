import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/services/lead.service';
import { CompaignService } from '../../services/compaign.service';

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
      console.log(res.data);
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
        this.toast.error('successfully add' , '' ,{
          timeOut: 1000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.comSrv.getallCompaigns().subscribe((res: any) => {
          this.Compaigns = res.data;
        });
        document.getElementById('closeModal1').click();
        document.getElementById('closeModal2').click();
        this.compForm.reset();
      }else if (res.message == "lead already") {
        this.toast.error('This Lead alreday member of compaign' , '' ,{
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

}
