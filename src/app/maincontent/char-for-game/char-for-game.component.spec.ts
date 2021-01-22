import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharForGameComponent } from './char-for-game.component';

describe('CharForGameComponent', () => {
  let component: CharForGameComponent;
  let fixture: ComponentFixture<CharForGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharForGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharForGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
