import z from 'zod';

export const CreateGameDTO = z.object({
    name: z
        .string()
        .min(3, 'Name must have at least 3 characters')
        .max(100, 'Name must have at most 100 characters'),

    price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),

    category: z 
        .string()
        .min(3, 'Category must have ate least 3 characters')  
        .max(100, 'Category must have at most 100 characters'),

    rental_days: z 
        .number()
        .min(1, 'It must has at least 1 rental day')
        
})