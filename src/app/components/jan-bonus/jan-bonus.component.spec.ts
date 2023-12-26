import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanBonusComponent } from './jan-bonus.component';

describe('JanBonusComponent', () => {
  let component: JanBonusComponent;
  let fixture: ComponentFixture<JanBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JanBonusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JanBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
