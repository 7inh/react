import Error404 from "@components/ui/Error404"

const PageNotFound = () => {
  return (
    <Error404
      onGoBack={() => window.history.back()}
      onTakeMeHome={() => window.location.replace("/")}
    />
  )
}

export default PageNotFound
