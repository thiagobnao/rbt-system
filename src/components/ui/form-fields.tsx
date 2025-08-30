"use client"

import * as React from "react"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// Base interface for all form field components
interface BaseFieldProps {
  name: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  error?: string
}

// Input Field Component
interface InputFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date" | "time" | "datetime-local"
  maxLength?: number
  minLength?: number
  pattern?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, label, description, placeholder, required, disabled, className, error, type = "text", ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(error && "border-destructive focus-visible:ring-destructive")}
          {...props}
        />
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
InputField.displayName = "InputField"

// Select Field Component
interface SelectFieldProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>
  emptyOption?: string
}

export const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  ({ name, label, description, placeholder, required, disabled, className, error, options, emptyOption = "Selecione uma opção" }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <Select disabled={disabled}>
          <SelectTrigger className={cn(error && "border-destructive focus-visible:ring-destructive")}>
            <SelectValue placeholder={placeholder || emptyOption} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
SelectField.displayName = "SelectField"

// Textarea Field Component
interface TextareaFieldProps extends BaseFieldProps {
  rows?: number
  maxLength?: number
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ name, label, description, placeholder, required, disabled, className, error, rows = 3, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <Textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(error && "border-destructive focus-visible:ring-destructive")}
          {...props}
        />
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
TextareaField.displayName = "TextareaField"

// Checkbox Field Component
interface CheckboxFieldProps extends BaseFieldProps {
  checked?: boolean
}

export const CheckboxField = React.forwardRef<HTMLButtonElement, CheckboxFieldProps>(
  ({ name, label, description, required, disabled, className, error, checked }, ref) => {
    return (
      <div className={cn("flex items-start space-x-2", className)}>
        <Checkbox
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          checked={checked}
          className={cn(error && "border-destructive")}
        />
        <div className="space-y-1">
          {label && (
            <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
              {label}
            </Label>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>
    )
  }
)
CheckboxField.displayName = "CheckboxField"

// Radio Group Field Component
interface RadioGroupFieldProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>
}

export const RadioGroupField = React.forwardRef<HTMLDivElement, RadioGroupFieldProps>(
  ({ name, label, description, required, disabled, className, error, options }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <RadioGroup disabled={disabled} className={cn(error && "border-destructive")}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
              <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
RadioGroupField.displayName = "RadioGroupField"

// Switch Field Component
interface SwitchFieldProps extends BaseFieldProps {
  checked?: boolean
}

export const SwitchField = React.forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ name, label, description, required, disabled, className, error, checked }, ref) => {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div className="space-y-1">
          {label && (
            <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
              {label}
            </Label>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <Switch
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          checked={checked}
          className={cn(error && "border-destructive")}
        />
      </div>
    )
  }
)
SwitchField.displayName = "SwitchField"

// Multi-Select Field Component (using badges)
interface MultiSelectFieldProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>
  selectedValues?: string[]
  onSelectionChange?: (values: string[]) => void
}

export const MultiSelectField = React.forwardRef<HTMLDivElement, MultiSelectFieldProps>(
  ({ name, label, description, required, disabled, className, error, options, selectedValues = [], onSelectionChange }, ref) => {
    const handleToggle = (value: string) => {
      if (disabled) return
      
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      
      onSelectionChange?.(newSelection)
    }

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <Badge
              key={option.value}
              variant={selectedValues.includes(option.value) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                !disabled && "hover:bg-primary hover:text-primary-foreground",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleToggle(option.value)}
            >
              {option.label}
              {selectedValues.includes(option.value) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
MultiSelectField.displayName = "MultiSelectField"

// Formatted Input Field Component (for CPF, phone, etc.)
interface FormattedInputFieldProps extends InputFieldProps {
  formatter: (value: string) => string
  onValueChange?: (value: string) => void
}

export const FormattedInputField = React.forwardRef<HTMLInputElement, FormattedInputFieldProps>(
  ({ name, label, description, placeholder, required, disabled, className, error, formatter, onValueChange, ...props }, ref) => {
    const [value, setValue] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const formattedValue = formatter(rawValue)
      setValue(formattedValue)
      onValueChange?.(formattedValue)
    }

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-destructive")}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(error && "border-destructive focus-visible:ring-destructive")}
          {...props}
        />
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
FormattedInputField.displayName = "FormattedInputField"
