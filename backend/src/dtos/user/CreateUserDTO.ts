import z from 'zod';

export const CreateUserDTO = z.object({
    name: z
        .string()
        .min(3, 'Name must have at least 3 characters')
        .max(100, 'Name must have at most 100 characters'),

    email: z
        .email('Invalid email'),

    password: z
    .string()
    .min(3, 'Password must have ate least 3 characters'),

    cpf: z.string().regex(
        /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
        "CPF inválido"
      )
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;