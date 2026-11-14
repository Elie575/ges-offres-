import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionCandidatComponent } from './discussion-candidat.component';

describe('DiscussionCandidatComponent', () => {
  let component: DiscussionCandidatComponent;
  let fixture: ComponentFixture<DiscussionCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
