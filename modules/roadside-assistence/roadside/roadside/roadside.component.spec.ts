import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsideComponent } from './roadside.component';

describe('RoadsideComponent', () => {
  let component: RoadsideComponent;
  let fixture: ComponentFixture<RoadsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
