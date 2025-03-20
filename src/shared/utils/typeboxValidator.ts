// src/shared/utils/typebox-validator.ts
// import Ajv from 'ajv';
// import addFormats from 'ajv-formats';
// import { TSchema } from '@sinclair/typebox';

// const ajv = new Ajv({ allErrors: true });
// addFormats(ajv);

// export function validateSchema<T>(schema: TSchema, data: unknown): { valid: boolean; errors?: string[] } {
//   const validate = ajv.compile(schema);
//   const valid = validate(data);
//   if (!valid && validate.errors) {
//     const errors = validate.errors.map((err) => {
//       return `${err.instancePath} ${err.message}`;
//     });
//     return { valid: false, errors };
//   }
//   return { valid: true };
// }
