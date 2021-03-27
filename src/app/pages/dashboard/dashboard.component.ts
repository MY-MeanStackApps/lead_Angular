import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  leadsCount =  [];
  leadNum: number;
  constructor(
    private leadSrv: LeadService
  ) { }

  ngOnInit(): void {
    this.leadSrv.getall().subscribe((res: any) => {
      this.leadsCount = res.data;
      console.log(res);
      this.leadNum = this.leadsCount.length;
    })
  }

}
