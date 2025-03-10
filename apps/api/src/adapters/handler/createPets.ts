import { createFactory } from 'hono/factory';
import { zValidator } from '../template.validator';
import { CreatePetsContext } from '../template.context';
import {
createPetsBody,
createPetsResponse
} from '../template.zod'

const factory = createFactory();


export const createPetsHandlers = factory.createHandlers(
zValidator('json', createPetsBody),
zValidator('response', createPetsResponse),
async (c: CreatePetsContext) => {

  },
);
