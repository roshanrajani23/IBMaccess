import { Repos } from './repos';

describe('Repos', () => {
  it('should create an instance', () => {
    
    let firstName = 'Roshan';
    let lastName = 'Rajani';
    let numOfRepos = 23;
    let avatar_url = 'https://avatars0.githubusercontent.com/u/1?v=4';
    let login = 'login';
    let id = 23;
    let following = 'following';
    let location = 'location';
    expect(new Repos(firstName, lastName, numOfRepos, avatar_url, login, id, following, location)).toBeTruthy();
  });
});