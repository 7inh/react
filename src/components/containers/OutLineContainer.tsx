import { cn } from "@lib/utils"

export interface OutLineContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const OutLineContainer = ({
  className,
  children,
  ...props
}: OutLineContainerProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center border p-2 justify-center rounded-md cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default OutLineContainer
