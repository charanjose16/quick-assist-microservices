import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerReviewsComponent } from './worker-reviews.component';

describe('WorkerReviewsComponent', () => {
  let component: WorkerReviewsComponent;
  let fixture: ComponentFixture<WorkerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
