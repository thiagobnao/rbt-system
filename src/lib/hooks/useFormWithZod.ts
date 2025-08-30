import { useForm, UseFormProps, FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

interface UseFormWithZodOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: z.ZodSchema
  onSuccess?: (data: T) => void | Promise<void>
  onError?: (error: any) => void
  successMessage?: string
  errorMessage?: string
}

export function useFormWithZod<T extends FieldValues>({
  schema,
  onSuccess,
  onError,
  successMessage = 'Operação realizada com sucesso!',
  errorMessage = 'Erro ao processar a operação',
  ...formOptions
}: UseFormWithZodOptions<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    ...formOptions,
  })

  const handleSubmit = async (data: T) => {
    try {
      if (onSuccess) {
        await onSuccess(data)
      }
      
      if (successMessage) {
        toast.success(successMessage)
      }
    } catch (error: any) {
      console.error('Form submission error:', error)
      
      const errorMsg = error?.message || errorMessage
      toast.error(errorMsg)
      
      if (onError) {
        onError(error)
      }
    }
  }

  const resetForm = (values?: Partial<T>) => {
    form.reset(values)
  }

  const setFieldError = (field: Path<T>, message: string) => {
    form.setError(field, {
      type: 'manual',
      message,
    })
  }

  const clearFieldError = (field: Path<T>) => {
    form.clearErrors(field)
  }

  const isFormValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting
  const errors = form.formState.errors

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetForm,
    setFieldError,
    clearFieldError,
    isFormValid,
    isSubmitting,
    errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
    getValues: form.getValues,
    trigger: form.trigger,
  }
}

// Hook para validação em tempo real
export function useFormValidation<T extends FieldValues>(
  form: ReturnType<typeof useForm<T>>,
  schema: z.ZodSchema<T>
) {
  const validateField = async (fieldName: Path<T>, value: any) => {
    try {
      // Criar um objeto temporário com apenas o campo sendo validado
      const tempData = { [fieldName]: value } as Partial<T>
      
      // Validar apenas esse campo
      await schema.pick({ [fieldName]: true }).parseAsync(tempData)
      
      // Se chegou aqui, a validação passou
      form.clearErrors(fieldName)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path.includes(fieldName))
        if (fieldError) {
          form.setError(fieldName, {
            type: 'manual',
            message: fieldError.message,
          })
        }
      }
      return false
    }
  }

  const validateForm = async () => {
    try {
      const values = form.getValues()
      await schema.parseAsync(values)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          const fieldName = err.path[0] as Path<T>
          form.setError(fieldName, {
            type: 'manual',
            message: err.message,
          })
        })
      }
      return false
    }
  }

  return {
    validateField,
    validateForm,
  }
}

// Hook para formatação de campos
export function useFormattedField<T extends FieldValues>(
  form: ReturnType<typeof useForm<T>>,
  fieldName: Path<T>,
  formatter: (value: string) => string
) {
  const value = form.watch(fieldName) as string

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatter(rawValue)
    form.setValue(fieldName, formattedValue as any)
  }

  return {
    value,
    handleChange,
  }
}

// Hook para campos com validação em tempo real
export function useFormField<T extends FieldValues>(
  form: ReturnType<typeof useForm<T>>,
  fieldName: Path<T>,
  schema?: z.ZodSchema<T>
) {
  const value = form.watch(fieldName)
  const error = form.formState.errors[fieldName]
  const isTouched = form.formState.touchedFields[fieldName]

  const handleChange = (newValue: any) => {
    form.setValue(fieldName, newValue, { shouldValidate: true })
  }

  const validateField = async () => {
    if (schema) {
      try {
        const fieldSchema = schema.pick({ [fieldName]: true })
        await fieldSchema.parseAsync({ [fieldName]: value })
        form.clearErrors(fieldName)
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find(err => err.path.includes(fieldName))
          if (fieldError) {
            form.setError(fieldName, {
              type: 'manual',
              message: fieldError.message,
            })
          }
        }
        return false
      }
    }
    return true
  }

  return {
    value,
    error: error?.message,
    isTouched,
    handleChange,
    validateField,
  }
}
