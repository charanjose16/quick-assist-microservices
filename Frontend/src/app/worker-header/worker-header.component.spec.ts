import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerHeaderComponent } from './worker-header.component';

describe('WorkerHeaderComponent', () => {
  let component: WorkerHeaderComponent;
  let fixture: ComponentFixture<WorkerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
