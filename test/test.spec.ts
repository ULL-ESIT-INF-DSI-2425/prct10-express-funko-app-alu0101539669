import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { addFunko, updateFunko, deleteFunko, getFunko, listFunkos } from '../src/manager';
import { FunkoPop } from '../src/types';
import request from 'supertest';

import app from '../src/server';

const testUser = 'test_user';
const testBasePath = path.resolve(__dirname, '../database', testUser);

const exampleFunko: FunkoPop = {
    id: 1,
    name: 'Goku',
    description: 'Goku from Dragon Ball Z',
    type: 'Pop!',
    genre: 'Animación',
    franchise: 'Dragon Ball',
    number: 1,
    exclusive: false,
    specialFeatures: 'None',
    marketValue: 20,
};

beforeEach(async () => {
  await fs.rm(testBasePath, { recursive: true, force: true });
});

afterEach(async () => {
  await fs.rm(testBasePath, { recursive: true, force: true });
});

describe('Funko Manager', () => {
  test('should add a new Funko', async () => {
    const res = await addFunko(testUser, exampleFunko);
    expect(res.success).toBe(true);
  });

  test('should not add a Funko with the same ID twice', async () => {
    await addFunko(testUser, exampleFunko);
    const res = await addFunko(testUser, exampleFunko);
    expect(res.success).toBe(false);
  });

  test('should update an existing Funko', async () => {
    await addFunko(testUser, exampleFunko);
    const updatedFunko = { ...exampleFunko, marketValue: 30 };
    const res = await updateFunko(testUser, updatedFunko);
    expect(res.success).toBe(true);
  });

  test('should not update a non-existent Funko', async () => {
    const res = await updateFunko(testUser, exampleFunko);
    expect(res.success).toBe(false);
  });

  test('should retrieve a Funko by ID', async () => {
    await addFunko(testUser, exampleFunko);
    const res = await getFunko(testUser, exampleFunko.id);
    expect(res.success).toBe(true);
    if (res.funkoPop) {
      expect(res.funkoPop.name).toBe('Goku');
    } else {
      throw new Error('FunkoPop is undefined');
    }
  });

  test('should return an error for getting non-existent Funko', async () => {
    const res = await getFunko(testUser, 999);
    expect(res.success).toBe(false);
  });

  test('should list all Funkos for a user', async () => {
    await addFunko(testUser, exampleFunko);
    await addFunko(testUser, { ...exampleFunko, id: 2, name: 'Vegeta' });
    const res = await listFunkos(testUser);
    expect(res.success).toBe(true);
    if (res.funkoPops) {
      expect(res.funkoPops.length).toBe(2);
    } else {
      throw new Error('funkoPops is undefined');
    }
  });

  test('should delete a Funko', async () => {
    await addFunko(testUser, exampleFunko);
    const res = await deleteFunko(testUser, exampleFunko.id);
    expect(res.success).toBe(true);
  });

  test('should return an error when deleting non-existent Funko', async () => {
    const res = await deleteFunko(testUser, 999);
    expect(res.success).toBe(false);
  });
});


describe('Express Server', () => {
    test('should add a Funko via POST', async () => {
        const response = await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        expect(response.body.success).toBe(true);
    });
    test('should update a Funko via PATCH', async () => {
        await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        const updatedFunko = { ...exampleFunko, marketValue: 30 };
        const response = await request(app)
          .patch('/funkos?user=test_user')
          .send(updatedFunko);
    
        expect(response.body.success).toBe(true);
    });
    test('should delete a Funko via DELETE', async () => {
        await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        const response = await request(app)
          .delete('/funkos?user=test_user&id=1');
    
        expect(response.body.success).toBe(true);
    });
    test('should get a Funko via GET', async () => {
        await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        const response = await request(app)
          .get('/funkos?user=test_user&id=1');
    
        expect(response.body.success).toBe(true);
        expect(response.body.funkoPop.name).toBe('Goku');
    });
    test('should list all Funkos via GET', async () => {
        await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
        await request(app)
          .post('/funkos?user=test_user')
          .send({ ...exampleFunko, id: 2, name: 'Vegeta' });
    
        const response = await request(app)
          .get('/funkos?user=test_user');
    
        expect(response.body.success).toBe(true);
        expect(response.body.funkoPops.length).toBe(2);
    });
    test('should return an error when getting non-existent Funko', async () => {
        const response = await request(app)
          .get('/funkos?user=test_user&id=999');
    
        expect(response.body.success).toBe(false);
    });
    test('should return an error when deleting non-existent Funko', async () => {
        const response = await request(app)
          .delete('/funkos?user=test_user&id=999');
    
        expect(response.body.success).toBe(false);
    });
    test('should return an error when updating non-existent Funko', async () => {
        const response = await request(app)
          .patch('/funkos?user=test_user')
          .send(exampleFunko);
    
        expect(response.body.success).toBe(false);
    });
    test('should return an error when adding a Funko with the same ID', async () => {
        await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        const response = await request(app)
          .post('/funkos?user=test_user')
          .send(exampleFunko);
    
        expect(response.body.success).toBe(false);
    });
});
