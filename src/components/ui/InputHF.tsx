import { Input } from "@components/ui/Input"
import { Label } from "@components/ui/Label"
import { InputHTMLAttributes } from "react"
import { Controller, UseControllerProps, useFormContext } from "react-hook-form"

export interface InputHFProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  rules?: UseControllerProps["rules"]
  helperText?: string
  label?: string
  placeholder?: string
  type?: string
}

const InputHF = ({
  label,
  placeholder,
  name,
  helperText,
  type,
  rules,
  ...other
}: InputHFProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              {...field}
              value={field.value || ""}
              onChange={e => field.onChange(e.target.value)}
              type={type}
              id={name}
              placeholder={placeholder}
              required
              {...other}
            />
          </div>
          {error ? (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          ) : (
            helperText && (
              <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )
          )}
        </div>
      )}
    />
  )
}

export default InputHF
