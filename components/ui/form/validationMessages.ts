export const validationMessages = {
    required: "Field is required",
    minLength: (min: number) => `The field length must be at least ${min} characters`,
    maxLength: (max: number) => `The field length must be no more than ${max} characters`,
    phoneFormat: "Incorrect phone format",
    termsRequired: "You don't agree?",
    emailFormat: "Incorrect e-mail format",
};