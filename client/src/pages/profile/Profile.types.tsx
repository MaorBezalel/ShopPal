import * as z from 'zod';
import ProfileEditSchema from './schema/ProfileEditSchema';

export type ProfileEditFormFields = z.infer<typeof ProfileEditSchema>;
