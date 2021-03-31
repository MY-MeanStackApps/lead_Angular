import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompaignService } from 'src/app/services/compaign.service';
import { LeadService } from '../../services/lead.service';
import Swal from 'sweetalert2'
import { element } from 'protractor';

@Component({
  selector: 'app-comp-member',
  templateUrl: './comp-member.component.html',
  styleUrls: ['./comp-member.component.css']
})
export class CompMemberComponent implements OnInit {

  Leads = [];
  compaignId : any;
  members: any;
  singleCompaign : any;
  total_selected = [];
  searchText: '';
  p: number = 1;
  key = 'id';
  reverse:boolean = false;
  allSelected = false;
  send = [];
  LeadToCompaign = {lead : [] , compaign: ''};

  get name (){return this.leadForm.get('name')};
  get email (){return this.leadForm.get('email')};
  get phone (){return this.leadForm.get('phone')};

  constructor(
    private comSrv: CompaignService,
    private toast: ToastrService,
    public datepipe: DatePipe,
    private leadSrv: LeadService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute
    ) { }

    leadForm = this._fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]]
    })

  ngOnInit(): void {
    this.compaignId = this._route.snapshot.params['id'];
    this.LeadToCompaign.compaign = this.compaignId;
    this.leadSrv.getall().subscribe((res: any) => {
      res.data.forEach(element => {
      this.Leads.push({ element, selected: false});
      });
    });

      this.comSrv.singleCompaign(this.compaignId).subscribe((res: any) => {
        this.singleCompaign = res.data;
      });

    this.comSrv.AllCompaign_MemberBY_compaignid(this.compaignId).subscribe((data: any) => {
      this.members = data.data;
    })
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
        this.Leads = [];
        this.leadSrv.getall().subscribe((res: any) => {
          res.data.forEach(element => {
          this.Leads.push({ element, selected: false});
          });
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
        this.comSrv.deleteMember(id).subscribe((data: any) => {
          console.log(data)
          if (data.message == 'success') {
            this.toast.success('Deleted Successfully' , '' ,{
              timeOut: 2000,
              positionClass: 'toast-bottom-left',
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.comSrv.AllCompaign_MemberBY_compaignid(this.compaignId).subscribe((data: any) => {
              console.log(data);
              this.members = data.data;
            })
          } else{
            console.log('something went wrong');
          }
        });
      }
    });
  }

  onSingle_Checkox_select(id){
    this.total_selected = [];
    this.Leads.forEach((item: any) => {
      if (item.element._id == id) {
        item.selected = !item.selected ;
      }
    });
    this.total_selected = [];
    this.Leads.forEach((item: any) => {
      if (item.selected == true) {
        this.total_selected.push(item.element);
      }
    });
    if (this.total_selected.length != this.Leads.length) {
      this.allSelected = false;
    } else {
      this.allSelected = true;
    }
  }

  checkAll(){
    this.total_selected = [];
    this.Leads.forEach((item: any) => {
      if (item.selected) {
        item.selected = false;
        this.total_selected = [];
      } else {
        item.selected = true;
        this.total_selected.push(item.element);
      }
    });
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  emptyNext(){
    this.toast.error('PLease select any lead ' , '' ,{
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }
//   arrayWithDuplicates = [
//     {"type":"LICENSE", "licenseNum": "12345", state:"NV"},
//     {"type":"LICENSE", "licenseNum": "A7846", state:"CA"},
//     {"type":"LICENSE", "licenseNum": "12345", state:"OR"},
//     {"type":"LICENSE", "licenseNum": "10849", state:"CA"},
//     {"type":"LICENSE", "licenseNum": "B7037", state:"WA"},
//     {"type":"LICENSE", "licenseNum": "12345", state:"NM"}
// ];

removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

  AddLeadToCompaign(){
    // var arr = [];
    this.LeadToCompaign.lead = this.total_selected;
    // this.members.forEach(item => {
    //   this.send.push(item.lead);
    // });
    //   this.LeadToCompaign.lead.forEach(element => {
    //     this.send.push(element);
    // });
  // console.log(this.send);
  // var uniqueArray = this.removeDuplicates(this.send, "_id");
  // console.log(uniqueArray);
    this.comSrv.createMember(this.LeadToCompaign).subscribe((res: any) => {
      console.log(res);
      if (res.alert == 0) {
        this.toast.success('Leads Add to compaign' , 'Success' ,{
          timeOut: 2000,
          positionClass: 'toast-bottom-left',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.comSrv.AllCompaign_MemberBY_compaignid(this.compaignId).subscribe((data: any) => {
          this.members = data.data;
        });
        document.getElementById('addToCompaign').click();
        document.getElementById('closeModal2').click();
        this.Leads.forEach((item: any) => {
          if (item.selected) {
            item.selected = false;
            this.total_selected = [];
            this.allSelected = false;
          }
        });
      } else if (res.alert == 1) {
        document.getElementById('addToCompaign').click();
        document.getElementById('closeModal2').click();
        this.comSrv.AllCompaign_MemberBY_compaignid(this.compaignId).subscribe((data: any) => {
          this.members = data.data;
        });
        this.Leads.forEach((item: any) => {
          if (item.selected) {
            item.selected = false;
            this.total_selected = [];
            this.allSelected = false;
          }
        });
      }else{
        console.log('somthing went wrong')
      }
    })
  }

}
