import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecordsFound } from './no-records-found';

describe('NoRecordsFound', () => {
  let component: NoRecordsFound;
  let fixture: ComponentFixture<NoRecordsFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRecordsFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoRecordsFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
