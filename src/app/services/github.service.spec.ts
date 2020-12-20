import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;4
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
  });

  const dummyUserListResponse = {
    data: [
      { login: 1, avatar_url:"https://avatars0.githubusercontent.com/u/1?v=4" },
    ],
  };  
  
  it('getUsers() should return data', () => {
      service.getUsers().subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });
  
      httpMock = TestBed.get(HttpTestingController);
      service = TestBed.get(GithubService);
      const req = httpMock.expectOne('https://api.github.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUserListResponse);
    });
  
});
