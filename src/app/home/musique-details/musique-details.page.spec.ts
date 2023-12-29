import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusiqueDetailsPage } from './musique-details.page';

describe('MusiqueDetailsPage', () => {
  let component: MusiqueDetailsPage;
  let fixture: ComponentFixture<MusiqueDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MusiqueDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
