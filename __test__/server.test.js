'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe(' test my server ', () => {
///////////////////// Errors /////////////////
  it('responds with a 500 on error', () => {
    return mockRequest
      .get('/real-error')
      .then(data => {
        expect(data.status).toBe(500);
      }).catch(e => console.error(e));
  }); 

  it('responds with a 404 if a route is not found ', () => {
    return mockRequest
      .get('/dosent-exist')
      .then(data => {
        expect(data.status).toBe(404);
      }).catch(e => console.error(e));
  }); 

  
  it('404 Error , Invalid method ', () => {
    return mockRequest
      .delete('/')
      .then(data => {
        expect(data.status).toBe(404);
      }).catch(e => console.error(e));
  }); 

  ///////////////////// categories /////////////////
  it('Routes , Valid route test  ', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  });

  it('Routes , Valid route test with ID ', () => {
    return mockRequest
      .get('/api/v1/categories/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  });

  it('Routes , Valid route test  ', () => {
    return mockRequest
      .post('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(201);
      }).catch(e => console.error(e));
  });

  it('Routes , Valid route test  ', () => {
    return mockRequest
      .put('/api/v1/categories/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); 

  


  //////////////////// Products////////////////
  it('Routes , Valid route test  ', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); 

  it('Routes , Valid route test with ID ', () => {
    return mockRequest
      .get('/api/v1/products/2')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); 

    
});  