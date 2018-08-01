import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
   const domSanitizer = jasmine.createSpyObj(['asd']);
   it('create an instance', () => {
      const pipe = new SanitizePipe(domSanitizer);
      expect(pipe).toBeTruthy();
   });
});
