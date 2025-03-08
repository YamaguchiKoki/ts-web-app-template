import { createFactory } from 'hono/factory';
import { zValidator } from '../template.validator';
import { ListPetsContext } from '../template.context';
import {
listPetsQueryParams,
listPetsResponse
} from '../template.zod'

const factory = createFactory();


export const listPetsHandlers = factory.createHandlers(
zValidator('query', listPetsQueryParams),
zValidator('response', listPetsResponse),
async (c: ListPetsContext) => {

  },
);
