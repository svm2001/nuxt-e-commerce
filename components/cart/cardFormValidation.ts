import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {validationMessages} from "~/components/ui/form/validationMessages";
import {EmailRegex, PhoneRegex} from "~/components/ui/form/validationRegExp";

export const cardFormValidation = toTypedSchema(
    z.object({
        name: z
            .string({ required_error: validationMessages.required })
            .min(2, validationMessages.minLength(2))
            .max(50, validationMessages.maxLength(50)),
        phone: z
            .string({ required_error: validationMessages.required })
            .refine((value) => PhoneRegex.safeParse(value).success, {
                message: validationMessages.phoneFormat,
            }),
        email: z
            .string({ required_error: validationMessages.required })
            .refine((value) => EmailRegex.safeParse(value).success, {
                message: validationMessages.emailFormat,
            }),
        location: z
            .string({ required_error: validationMessages.required }),
        street: z
            .string({ required_error: validationMessages.required })
            .min(2, validationMessages.minLength(2))
            .max(50, validationMessages.maxLength(50)),
        house: z
            .number({ required_error: validationMessages.required })
            .min(1, validationMessages.minLength(1))
            .max(1000, validationMessages.maxLength(1000)),
        apartment: z
            .number({ required_error: validationMessages.required })
            .min(1, validationMessages.minLength(1))
            .max(2000, validationMessages.maxLength(2000)),
        floor: z
            .number({ required_error: validationMessages.required })
            .min(1, validationMessages.minLength(1))
            .max(200, validationMessages.maxLength(200)),
        date: z
            .string({ required_error: validationMessages.required }),
        hours: z
            .string({ required_error: validationMessages.required })
            .refine((value) => ['8:00 - 11:00', '11:00 - 14:00', '14:00 - 17:00', '17:00 - 20:00'].includes(value)),
    })
);