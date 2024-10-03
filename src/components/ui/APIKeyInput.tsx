import axiosInstance from "@api/axiosInstance"
import { Input } from "@components/ui/Input"
import useDebounce from "@hooks/useDebounce"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { getToken } from "@utils/auth"
import { useEffect, useState } from "react"

export interface APIKeyInputProps {}

const mapStatusToIcon = {
  idle: "icon-park-outline:flashlamp",
  valid: "iconamoon:check-bold",
  invalid: "material-symbols:error-outline",
}

const APIKeyInput = () => {
  const [apiKey, setApiKey] = useState<string>(() => getToken() || "")
  const [apiKeyStatus, setApiKeyStatus] = useState<
    "valid" | "invalid" | "idle"
  >("idle")
  const iconByStatus = mapStatusToIcon[apiKeyStatus]
  const debounceAPIKey = useDebounce({ value: apiKey, delay: 500 })

  const { data, isError, isSuccess, isFetching } = useQuery<any>({
    queryKey: ["/api/v1/auth/verify", debounceAPIKey],
    queryFn: () =>
      axiosInstance.get("/auth/verify", {
        headers: {
          ["X-API-KEY"]: debounceAPIKey,
        },
      }),
    enabled: !!debounceAPIKey && debounceAPIKey.length > 5,
    retry: false,
  })

  useEffect(() => {
    if (isError) {
      setApiKeyStatus("invalid")
    }

    if (isSuccess) {
      localStorage.setItem("api_key", apiKey)
      setApiKeyStatus("valid")
    }
  }, [apiKey, data, isError, isSuccess])

  return (
    <div className="flex items-center gap-2">
      <Input
        className="max-w-[300px]"
        placeholder="API Key"
        value={apiKey}
        onChange={e => {
          setApiKey(e.target.value)
          setApiKeyStatus("idle")
        }}
      />
      <Icon
        icon={isFetching ? "line-md:loading-twotone-loop" : iconByStatus}
        className="size-7 data-[status=valid]:text-green-500 data-[status=invalid]:text-red-500 text-yellow-400"
        data-status={apiKeyStatus}
      />
    </div>
  )
}

export default APIKeyInput
