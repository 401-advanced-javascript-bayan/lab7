const loggerMiddleware = require('../lib/logger.js');

// Tested middleware needs to either be exported from the server or a separate module
describe('logger middleware', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); 
  beforeEach(() => {
  
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
  
    consoleSpy.mockRestore();
  });

  it('properly logs some output', () => {
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('properly moves to the next middleware', () => {
    loggerMiddleware(req, res, next);
    
    expect(next).toHaveBeenCalledWith();
  });

});