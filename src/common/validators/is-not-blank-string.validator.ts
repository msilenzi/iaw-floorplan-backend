import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsNotBlankString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlankString',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} should not be blank`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim() !== ''
        },
      },
    })
  }
}
