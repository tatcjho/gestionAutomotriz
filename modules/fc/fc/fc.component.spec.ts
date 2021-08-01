import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcComponent } from './fc.component';

describe('FcComponent', () => {
  let component: FcComponent;
  let fixture: ComponentFixture<FcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
