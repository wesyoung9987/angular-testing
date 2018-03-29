import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe = DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('', 'http://place-hold.it/300')).toBe('http://place-hold.it/300');
  });

  it('providing a value does not return the fallback', () => {
    expect(pipe.transform('http://place-hold.it/100', 'http://place-hold.it/300')).toBe('http://place-hold.it/100');
  });

  it('if forceHttps is enables, the returned value should contain https', () => {
    expect(pipe.transform('http://place-hold.it/100', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/100');
  });

});
