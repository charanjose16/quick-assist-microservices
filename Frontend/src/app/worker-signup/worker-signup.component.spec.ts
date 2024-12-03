import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSignupComponent } from './worker-signup.component';

describe('WorkerSignupComponent', () => {
  let component: WorkerSignupComponent;
  let fixture: ComponentFixture<WorkerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
