import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBookingsComponent } from './worker-bookings.component';

describe('WorkerBookingsComponent', () => {
  let component: WorkerBookingsComponent;
  let fixture: ComponentFixture<WorkerBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
