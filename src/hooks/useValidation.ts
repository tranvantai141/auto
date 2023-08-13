import React from "react";

export type ValidationType = {
  rule: ValidationRule;
  errorMessage: string;
  meta?: any;
  path?: string;
  stopCheckingOthersIfInvalid?: boolean;
};

export type ValidationResultType = {
  isValid: boolean;
  messages?: string[];
};

export type ValidatorAction = (value: string | number, meta?: any) => boolean;

export enum ValidationRule {
  Required,
  Email,
  Number,
  Phone,
  NoSpaces,
  Regex,
  MinimumLength,
  MaximumLength,
  Remote,
}

export const validateCustomInput = (value: string | number, validations?: ValidationType[]): ValidationResultType => {
  if (!validations || !validations.length) {
    return { isValid: true };
  }

  let isValid = true;
  const validationMessages = [];

  for (const validation of validations) {
    let valueToValidate = value;
    if (valueToValidate && validation.path) {
      valueToValidate = (valueToValidate as any)[validation.path];
    }
    const passesValidation = validatorMap[validation.rule](valueToValidate, validation.meta);
    isValid = isValid && passesValidation;

    if (!passesValidation) {
      validationMessages.push(validation.errorMessage);
      if (validation.stopCheckingOthersIfInvalid) {
        break;
      }
    }
  }

  return {
    isValid,
    messages: validationMessages,
  };
};

const requiredValidator: ValidatorAction = (value: string | number) =>
  value !== undefined && value !== null && value.toString().trim().length > 0;

const emailValidator: ValidatorAction = (value: string | number) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value as string);
};

const numberValidator: ValidatorAction = (value: string | number) => !isNaN(Number(value));

const phoneValidator: ValidatorAction = (value: string | number) => {
  const mobilePhoneRegex = /^(\+[0-9]+)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\3([0-9]{4})$/;
  return mobilePhoneRegex.test(value as string);
};

const noSpaceValidator: ValidatorAction = (value: string | number) => {
  return (value as string).indexOf(" ") > -1;
};

const maxLengthValidator: ValidatorAction = (value: string | number, meta?: number) => {
  if (!meta) {
    console.log(
      "📢 [maxLengthValidator]",
      "Length was not provided to MaximumLength Validator. Please provide length as the meta property",
    );
    return false;
  }
  return (value as string).length <= meta;
};

const minLengthValidator: ValidatorAction = (value: string | number, meta?: number) => {
  if (!meta) {
    console.log(
      "📢 [minLengthValidator]",
      "Length was not provided to MinimumLength Validator. Please provide length as meta property",
    );
    return false;
  }
  return (value as string).length >= meta;
};

const regexValidator: ValidatorAction = (value: string | number, meta: RegExp) => {
  if (!meta) {
    console.log(
      "📢 [regexValidator]",
      "A regular expression was not provided to Regex Validator. Please provide it as the meta property",
    );
    return false;
  }

  return meta.test(value as string);
};

const remoteValidator: ValidatorAction = (value: string | number, meta: (value: string | number) => boolean) => {
  return meta(value);
};

const validateForm = <T>(
  formToValidate: T,
  validationRules: Partial<Record<keyof T, ValidationType[]>>,
): Partial<Record<keyof T, ValidationResultType>> => {
  const result: Partial<Record<keyof T, ValidationResultType>> = {};
  Object.keys(validationRules).forEach((key) => {
    const rules = validationRules[key as keyof T];
    if (!rules) {
      return;
    }
    result[key as keyof T] = validateCustomInput(
      formToValidate[key as keyof T] as unknown as string | number,
      validationRules[key as keyof T],
    );
  });

  return result;
};

const validatorMap: Record<ValidationRule, ValidatorAction> = {
  [ValidationRule.Required]: requiredValidator,
  [ValidationRule.Email]: emailValidator,
  [ValidationRule.Number]: numberValidator,
  [ValidationRule.Phone]: phoneValidator,
  [ValidationRule.NoSpaces]: noSpaceValidator,
  [ValidationRule.Regex]: regexValidator,
  [ValidationRule.MaximumLength]: maxLengthValidator,
  [ValidationRule.MinimumLength]: minLengthValidator,
  [ValidationRule.Remote]: remoteValidator,
};

export type UseValidationReturnType<T> = {
  validationResult: Partial<Record<keyof T, ValidationResultType>>;
  isValidated: boolean;
  isFormValid: (form: T) => boolean;
  validateAll: (form: T) => Partial<Record<keyof T, ValidationResultType>>;
  clearValidations: () => void;
  validateForm: <T>(
    formToValidate: T,
    validationRules: Partial<Record<keyof T, ValidationType[]>>,
  ) => Partial<Record<keyof T, ValidationResultType>>;
};

const useValidation = <T>(
  formToValidate: T,
  validationRules: Partial<Record<keyof T, ValidationType[]>>,
): UseValidationReturnType<T> => {
  const [validationResult, setValidationResult] = React.useState<Partial<Record<keyof T, ValidationResultType>>>({});

  const [isValidated, setIsValidated] = React.useState(false);

  const validateAll = React.useCallback(
    (form: T) => {
      const result = validateForm(form, validationRules);
      setValidationResult(result);
      setIsValidated(true);
      return result;
    },
    [validationRules],
  );

  const isFormValid = React.useCallback(
    (form: T) => {
      const validationResult = validateAll(form);
      return !Object.keys(validationResult).some((key) => !validationResult[key as keyof T]?.isValid);
    },
    [validateAll],
  );

  const clearValidations = React.useCallback(() => {
    setValidationResult({});
  }, []);

  return {
    isValidated,
    isFormValid,
    validateAll,
    validateForm,
    validationResult: (() => {
      if (isValidated) {
        return validationResult;
      }
      const result = validateForm(formToValidate, validationRules);
      return result;
    })(),
    clearValidations,
  };
};

export default useValidation;
