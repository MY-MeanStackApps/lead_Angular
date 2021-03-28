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
  searchText: '';
  p: number = 1;
  key = 'id';
  reverse:boolean = false;
  todayDate = this.datepipe.transform(Date.now() , 'yyyy-MM-dd');

  compForm = {name: '', email: '', compaigndate: ''};
  UpdateForm = {name: '', email: '', id: ''};

  constructor(
    private comSrv: CompaignService,
    private toast: ToastrService,
    public datepipe: DatePipe
    ) { }


  ngOnInit(): void {
    this.comSrv.getallCompaigns().subscribe((res: any) => {
      this.Compaigns = res.data;
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
        document.getElementById('add_Compaign_MOdal').click();
        this.compForm.name = '';
        this.compForm.email = '';
        this.compForm.compaigndate = '';
      }
    });
    }
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
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
