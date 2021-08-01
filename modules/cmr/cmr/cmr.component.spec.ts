import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrComponent } from './cmr.component';

describe('CmrComponent', () => {
  let component: CmrComponent;
  let fixture: ComponentFixture<CmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
