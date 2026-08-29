import z from 'zod';
import { CreateGameDTO } from './CreateGameDTO';

export const UpdateGameDTO = CreateGameDTO.partial()

export type UpdateGameDTO = z.infer<typeof UpdateGameDTO>;