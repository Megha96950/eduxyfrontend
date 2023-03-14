import { TestBed } from '@angular/core/testing';

import { ChatpanelService } from './chatpanel.service';

describe('ChatpanelService', () => {
  let service: ChatpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
