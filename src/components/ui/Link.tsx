import { Link as RRDLinkP, LinkProps as RRDLinkProps } from "react-router-dom"

export interface LinkProps extends RRDLinkProps {}

const Link = (props: LinkProps) => {
  return <RRDLinkP {...props} />
}

export default Link
