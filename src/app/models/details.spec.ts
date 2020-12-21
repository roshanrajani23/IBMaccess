
import { Details } from './details';

describe('Details', () => {
    
  it('should create an instance', () => {
    expect(new Details('fullName', 'avatar_url', 'type', 'location','organization')).toBeTruthy();
  });
});