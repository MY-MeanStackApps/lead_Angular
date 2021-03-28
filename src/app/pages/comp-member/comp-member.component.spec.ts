import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMemberComponent } from './comp-member.component';

describe('CompMemberComponent', () => {
  let component: CompMemberComponent;
  let fixture: ComponentFixture<CompMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
