import { isRequestSuccessful } from "@utils/utils"
import { useCallback } from "react"
import { FieldValues, FormProvider, useForm } from "react-hook-form"

interface HookFormWrapperProps<T extends FieldValues, P = T>
  extends React.HTMLAttributes<HTMLFormElement> {
  ref?: React.Ref<HTMLFormElement>
  children?: React.ReactNode
  formId?: string
  validate?: (data: T) => boolean
  mutateAsyncFn?: (params: P) => Promise<any>
  mapDataToParams?: (data: T) => P
  onSuccessful?: (data: any) => void
  onError?: (error: any) => void
  onSubmitCustom?: (data: T) => void
}

const HookFormWrapper = <T extends FieldValues, P = T>({
  children,
  validate,
  onChange,
  mutateAsyncFn,
  onSuccessful,
  mapDataToParams,
  onSubmitCustom,
  onError,
  formId,
  ref,
  className,
  ...rest
}: HookFormWrapperProps<T, P>) => {
  const methods = useForm<T>()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(
    async (data: any) => {
      if (!mutateAsyncFn) {
        return
      }

      if (validate && !validate(data)) {
        return
      }

      const mappedData = mapDataToParams ? mapDataToParams(data) : data

      const response: any = await mutateAsyncFn?.(mappedData)

      if (isRequestSuccessful(response)) {
        onSuccessful?.(response.data?.data)
      } else {
        onError?.(response?.response?.data?.detail)
      }
    },
    [mapDataToParams, mutateAsyncFn, onError, onSuccessful, validate]
  )

  return (
    <FormProvider {...methods}>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <form
        ref={ref}
        className={className}
        onChange={onChange}
        onSubmit={handleSubmit(onSubmitCustom ? onSubmitCustom : onSubmit)}
        {...(formId ? { id: formId } : {})}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default HookFormWrapper
