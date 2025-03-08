import { createFactory } from 'hono/factory';
import { zValidator } from '../template.validator';
import { ShowPetByIdContext } from '../template.context';
import {
showPetByIdParams,
showPetByIdResponse
} from '../template.zod'

const factory = createFactory();


export const showPetByIdHandlers = factory.createHandlers(
zValidator('param', showPetByIdParams),
zValidator('response', showPetByIdResponse),
async (c: ShowPetByIdContext) => {

  },
);
