import { useState } from 'react';

// Reglas de validación opcionales, por ejemplo, longitud mínima por campo
interface ValidationRules<T> {
  minLength?: Partial<Record<keyof T, number>>;
}

// Hook personalizado para manejar formularios
export const useForm = <T extends object>(
  initState: T,
  requiredFields: Array<keyof T> = [],
  validationRules: ValidationRules<T> = {}
) => {
  const [state, setState] = useState<T>(initState);

  // Maneja los cambios en los inputs del formulario
  const onChange = (value: string, field: keyof T): void => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Restablece todo el formulario al estado inicial
  const reset = (): void => {
    setState(initState);
  };

  // Limpia un campo específico
  const clearField = (field: keyof T): void => {
    setState((prevState) => ({
      ...prevState,
      [field]: initState[field],
    }));
  };

  // Verifica si un valor tiene estructura { value: string }
  const isFieldWithValue = (field: unknown): field is { value: string } => {
    return (
      typeof field === 'object' &&
      field !== null &&
      'value' in field &&
      typeof (field as { value: unknown }).value === 'string'
    );
  };

  // Verifica si el formulario es válido
  const isValid = (): boolean => {
    return requiredFields.every((field) => {
      const value = state[field];

      // Validación para arrays: deben tener al menos un elemento
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      // Validación para campos tipo { value: string }
      if (isFieldWithValue(value)) {
        const minLength = validationRules.minLength?.[field] ?? 0;
        return value.value.trim().length >= minLength;
      }

      // Validación para strings normales
      if (typeof value === 'string') {
        const minLength = validationRules.minLength?.[field] ?? 0;
        return value.trim().length >= minLength;
      }

      // Validación genérica para valores no nulos ni undefined
      return value !== null && value !== undefined;
    });
  };

  return {
    ...state,          // También puedes acceder a cada campo individualmente
    form: state,       // Acceso completo al estado del formulario
    onChange,
    reset,
    clearField,
    isValid,
  };
};
