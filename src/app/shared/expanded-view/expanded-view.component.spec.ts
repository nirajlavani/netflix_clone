import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedViewComponent } from './expanded-view.component';

describe('ExpandedViewComponent', () => {
  let component: ExpandedViewComponent;
  let fixture: ComponentFixture<ExpandedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandedViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
