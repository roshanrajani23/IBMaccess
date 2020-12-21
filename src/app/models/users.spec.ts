import { Users } from './users';

describe('Users', () => {
  it('should create an instance', () => {
    const login = 'roshanrajani';
    const avatar_url = 'https://avatars0.githubusercontent.com/u/1?v=4';
    expect(new Users(login, avatar_url)).toBeTruthy();
  });
});
