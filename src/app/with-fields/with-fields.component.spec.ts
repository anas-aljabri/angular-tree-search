import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithFieldsComponent } from './with-fields.component';

describe('WithFieldsComponent', () => {
  let component: WithFieldsComponent;
  let fixture: ComponentFixture<WithFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
