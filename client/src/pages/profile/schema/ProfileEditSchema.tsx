import { z } from 'zod';
import { Gender } from '@/shared/types';

const ProfileEditSchema = z
    .object({
        email: z.string().email({
            message: 'Invalid email address.',
        }),
        username: z
            .string()
            .min(3, {
                message: 'Username must be at least 3 characters long.',
            })
            .max(32),
        password: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long.',
            })
            .max(32, {
                message: 'Password must be at most 32 characters long.',
            })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, {
                message:
                    'Password must be between 8 and 32 characters, and include at least one lowercase letter, one uppercase letter, one number, and one special character.',
            }),
        confirmPassword: z.string(),
        name_details: z.object({
            first_name: z
                .string()
                .min(2, {
                    message: 'First name must be at least 2 characters long.',
                })
                .max(32, {
                    message: 'First name must be at most 32 characters long.',
                })
                .regex(/^[A-Za-z]+$/, {
                    message: 'First name must contain only letters.',
                }),
            middle_name: z
                .string()
                .min(2, {
                    message: 'Middle name must be at least 2 characters long.',
                })
                .max(32, {
                    message: 'Middle name must be at most 32 characters long.',
                })
                .regex(/^[A-Za-z]+$/, {
                    message: 'Middle name must contain only letters.',
                })
                .optional()
                .nullable()
                .or(z.literal('')),
            last_name: z
                .string()
                .min(2, {
                    message: 'Last name must be at least 2 characters long.',
                })
                .max(32, {
                    message: 'Last name must be at most 32 characters long.',
                })
                .regex(/^[A-Za-z]+$/, {
                    message: 'Last name must contain only letters.',
                }),
        }),
        address: z.object({
            street: z
                .string()
                .min(2, {
                    message: 'Street must be at least 2 characters long.',
                })
                .max(32, {
                    message: 'Street must be at most 32 characters long.',
                }),
            city: z
                .string()
                .min(2, {
                    message: 'City must be at least 2 characters long.',
                })
                .max(32, {
                    message: 'City must be at most 32 characters long.',
                })
                .regex(/^[A-Za-z]+$/, {
                    message: 'City must contain only letters.',
                }),
            country: z
                .string()
                .min(2, {
                    message: 'Country must be at least 2 characters long.',
                })
                .max(16, {
                    message: 'Country must be at most 16 characters long.',
                })
                .regex(/^[A-Za-z]+$/, {
                    message: 'Country must contain only letters.',
                }),
        }),
        gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER], {
            message: 'Gender must be either female, male or other',
        }),
        phone: z
            .string()
            .nullable()
            .optional()
            .refine((phone) => phone == null || phone.length === 0 || /^\d{10}$/.test(phone), {
                message: 'Phone number must be 10 digits long and contain only digits.',
            }),
        birthday: z
            .string()
            .nullable()
            .optional()
            .refine(
                (date) => {
                    if (!date) return true;
                    const today = new Date();
                    const birthday = new Date(date);
                    const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
                    return birthday <= thirteenYearsAgo;
                },
                {
                    message: 'You must be at least 13 years old.',
                }
            )
            .transform((date) => {
                if (date === '') return null;
                else return date;
            }),
    })
    .refine((data) => data.password.trim().length > 0 && data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export default ProfileEditSchema;
