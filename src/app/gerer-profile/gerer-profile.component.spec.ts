import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererProfileComponent } from './gerer-profile.component';

describe('GererProfileComponent', () => {
  let component: GererProfileComponent;
  let fixture: ComponentFixture<GererProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
