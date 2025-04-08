import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRibbonComponent } from './content-ribbon.component';

describe('ContentRibbonComponent', () => {
  let component: ContentRibbonComponent;
  let fixture: ComponentFixture<ContentRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentRibbonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
