import { createFactory } from 'hono/factory';
import { zValidator } from '../template.validator';
import { UpdatePetsContext } from '../template.context';
import {
updatePetsBody,
updatePetsResponse
} from '../template.zod'

const factory = createFactory();


export const updatePetsHandlers = factory.createHandlers(
zValidator('json', updatePetsBody),
zValidator('response', updatePetsResponse),
async (c: UpdatePetsContext) => {

  },
);
