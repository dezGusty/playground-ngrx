import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlaviewComponent } from './blaview.component';

describe('BlaviewComponent', () => {
  let component: BlaviewComponent;
  let fixture: ComponentFixture<BlaviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlaviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlaviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
