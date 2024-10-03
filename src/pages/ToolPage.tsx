import axiosInstance from "@api/axiosInstance"
import APIKeyInput from "@components/ui/APIKeyInput"
import { Icon } from "@iconify/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

const STATUS_NAME = [
  "pending",
  "preprocessing",
  "voice_cloning",
  "lipsyncing",
  "completed",
  // "failed",
]

const PROGRESS_STEP = 100 / STATUS_NAME.length

const ToolPage = () => {
  const [uploadedVideo, setUploadedVideo] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<any>(1)
  const [deepfakeVideo, setDeepfakeVideo] = useState<any>(null)
  const [generationUuid, setGenerationUuid] = useState<any>()
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<any>(null)
  const [mediaRecorder, setMediaRecorder] = useState<any>(null)
  const [file, setFile] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { data, isError } = useQuery<
    | {
        data: {
          status: string
          file_url: string
          metadata: {
            extracted_audio: string
            lipsyncing_starting_time: number
            preprocessing_time: number
            source_video: string
            source_video_duration: number
            sync_time: number
            voice_clone_audio: string
            voice_cloning_time: number
          }
        }
      }
    | undefined
  >({
    queryKey: ["/api/v1/generation/{generation_uuid}"],
    queryFn: () => axiosInstance.get(`/generation/${generationUuid}`),
    enabled: !!generationUuid,
    retry: 1,
    refetchInterval: progress + 1 === STATUS_NAME.length ? false : 1000,
  })

  const { mutateAsync, isPending: isDownloading } = useMutation({
    mutationKey: ["/api/v1/generation/{generation_uuid}/download"],
    mutationFn: () =>
      axiosInstance.get(`/generation/${generationUuid}/download`, {
        responseType: "blob",
      }),
    onSuccess: async response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "video/mp4" })
      )

      const link = document.createElement("a")
      link.href = url

      const fileName =
        data?.data?.metadata?.source_video?.split("/").pop() || "download.mp4"
      link.setAttribute("download", `deepfake-${fileName}`)

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
  })

  const handleUpload = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) setUploadedVideo(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = new FormData()
    const videoFile = videoRef.current?.src.startsWith("blob:")
      ? file
      : e.target.video.files[0]
    const text = e.target.script.value
    data.append("video", videoFile)
    data.append("text", text)
    setIsProcessing(true)
    const response = await axiosInstance.post<{
      generation_uuid: string
    }>("/generation", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the Content-Type to multipart/form-data
      },
    })
    setProgress(0)
    setGenerationUuid(response.data.generation_uuid)
  }

  const handleDownload = () => {
    mutateAsync()
  }

  const handleRecord = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        setIsRecording(true)
        videoRef.current!.srcObject = stream
        const recordedChunks: Blob[] = [] // Array to store video chunks
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9",
        })

        mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data) // Push chunks to array
          }
        }

        mediaRecorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop())
          const blob = new Blob(recordedChunks, { type: "video/webm" })
          const videoURL = URL.createObjectURL(blob)
          setFile(
            new File([blob], "recorded-video.webm", {
              type: "video/webm",
            })
          )
          videoRef.current!.srcObject = null
          videoRef.current!.src = videoURL
        }

        mediaRecorder.start()
        setMediaRecorder(mediaRecorder)
      })
  }

  const handleStopRecord = () => {
    setIsRecording(false)
    mediaRecorder.stop()
  }

  const handleResetAll = () => {
    setUploadedVideo(null)
    setDeepfakeVideo(null)
    setGenerationUuid(null)
    setProgress(0)
    setError(null)
  }

  useEffect(() => {
    if (isError) {
      setError("Failed to generate deepfake")
      setIsProcessing(false)
    }
    if (!data) return
    const { status, file_url } = data.data
    const currentStatusIdx = STATUS_NAME.findIndex(i => i === status)
    setProgress(currentStatusIdx)
    setDeepfakeVideo(file_url)
    if (status === "completed") {
      setIsProcessing(false)
    }
  }, [data, isError])

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Deepfake Generator
        </h1>
        <APIKeyInput />

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                ref={videoRef}
                autoPlay={isRecording}
                controls
                src={uploadedVideo}
                muted
                playsInline
              />
            </div>
            <div className="flex justify-center gap-2">
              <label
                className="flex bg-emerald-500 items-center px-4 py-2 rounded-full text-white transition-colors cursor-pointer "
                htmlFor="upload-file"
              >
                <Icon
                  icon={uploadedVideo ? "fa-solid:upload" : "lucide:upload"}
                  className="mr-2 size-5"
                />
                {!uploadedVideo ? "Upload" : "Change"}
              </label>
              <button
                type="button"
                className="flex bg-indigo-500 items-center px-4 py-2 rounded-full text-white transition-colors data-[state=recording]:bg-red-500 data-[state=recording]:hover:bg-red-600"
                onClick={isRecording ? handleStopRecord : handleRecord}
                data-state={isRecording ? "recording" : "idle"}
              >
                <Icon icon="lucide:video" className="mr-2 size-5" />
                {isRecording ? "Stop" : "Record"}
              </button>
              <input
                id="upload-file"
                type="file"
                name="video"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              name="script"
              placeholder="Enter your script here..."
              className="w-full h-40 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isProcessing}
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors data-[status=disable]:bg-gray-300 data-[status=disable]:cursor-not-allowed"
              disabled={isProcessing || (!uploadedVideo && !file)}
              data-status={
                isProcessing || (!uploadedVideo && !file) ? "disable" : "enable"
              }
            >
              Generate Deepfake
            </button>
          </div>
        </form>

        {isProcessing && (
          <div className="mt-6 space-y-2">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {STATUS_NAME[progress]}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {(progress + 1) * PROGRESS_STEP}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${(progress + 1) * PROGRESS_STEP}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out"
                ></div>
                <div
                  style={{ width: `${100 - (progress + 1) * PROGRESS_STEP}%` }}
                  className="transition-all duration-500 ease relative"
                >
                  <div className="animate-progress-bar bg-blue-500 bg-opacity-25 h-full absolute inset-0"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {deepfakeVideo && (
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl font-semibold">Generated Deepfake</h2>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video
                src={deepfakeVideo}
                className="w-full h-full object-cover"
                controls
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Icon icon="fa-solid:download" className="mr-2" /> Download
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleResetAll}
          className="mt-8 flex items-center mx-auto px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          <Icon icon="lucide:refresh-cw" className="mr-2" /> Reset All
        </button>
      </div>
      {(isDownloading || isProcessing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold">Processing...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ToolPage
