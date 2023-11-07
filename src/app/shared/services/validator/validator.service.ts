import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }

    const errorObject = errors as Record<string, { requiredLength: number; actualLength: number }>;
    const errorMessages = Object.keys(errorObject).map((key: keyof ValidationErrors) => {
      switch (key) {
        case 'required':
          return 'Field is required. ';

        case 'minlength':
          return `Field min length is ${errorObject[key].requiredLength}.
            Actual length is ${errorObject[key].actualLength}. `;

        case 'maxlength':
          return `Field max length is ${errorObject[key].requiredLength}.
            Actual length is ${errorObject[key].actualLength}. `;

        default:
          return "Field isn't valid. ";
      }
    });

    return errorMessages.join(' ');
  }
}
