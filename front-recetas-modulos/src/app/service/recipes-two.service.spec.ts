import { TestBed } from '@angular/core/testing';

import { RecipesTwoService } from './recipes-two.service';

describe('RecipesTwoService', () => {
  let service: RecipesTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
