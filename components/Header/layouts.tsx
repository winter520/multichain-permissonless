
import { styled } from "@nextui-org/react"
// import type { AppProps } from 'next/app'
export const Box = styled("div", {
  boxSizing: "border-box",
});
export const Layout = ({ children }:any) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </Box>
);