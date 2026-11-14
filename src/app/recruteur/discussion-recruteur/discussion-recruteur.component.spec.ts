import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionRecruteurComponent } from './discussion-recruteur.component';

describe('DiscussionRecruteurComponent', () => {
  let component: DiscussionRecruteurComponent;
  let fixture: ComponentFixture<DiscussionRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionRecruteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
