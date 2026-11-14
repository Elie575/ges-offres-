import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargementCVComponent } from './telechargement-cv.component';

describe('TelechargementCVComponent', () => {
  let component: TelechargementCVComponent;
  let fixture: ComponentFixture<TelechargementCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelechargementCVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelechargementCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
