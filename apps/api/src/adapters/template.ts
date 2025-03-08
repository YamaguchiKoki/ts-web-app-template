/**
 * Generated by orval v7.6.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import {
  Hono
} from 'hono';


import { listPetsHandlers } from './handler/listPets';
import { createPetsHandlers } from './handler/createPets';
import { updatePetsHandlers } from './handler/updatePets';
import { showPetByIdHandlers } from './handler/showPetById';


const app = new Hono()

/**
 * @summary List all pets
 */

app.get('/pets',...listPetsHandlers)


/**
 * @summary Create a pet
 */

app.post('/pets',...createPetsHandlers)


/**
 * @summary Update a pet
 */

app.put('/pets',...updatePetsHandlers)


/**
 * @summary Info for a specific pet
 */

app.get('/pets/:petId',...showPetByIdHandlers)


export default app