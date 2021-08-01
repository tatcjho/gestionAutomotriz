import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRoadsideComponent } from './request-roadside.component';

describe('RequestRoadsideComponent', () => {
  let component: RequestRoadsideComponent;
  let fixture: ComponentFixture<RequestRoadsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRoadsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRoadsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
