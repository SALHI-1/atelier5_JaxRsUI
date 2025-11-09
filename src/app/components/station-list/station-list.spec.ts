import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StationListComponent } from './station-list';
import { ApiService } from '../../services/api';

describe('StationListComponent', () => {
  let component: StationListComponent;
  let fixture: ComponentFixture<StationListComponent>;

  const apiMock: Partial<ApiService> = {
    getStations: () => of([]),
    createStation: () => of({} as any)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationListComponent],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
