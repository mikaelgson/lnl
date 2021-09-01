import type { AppProps } from "next/app"
import Link from "next/link"
import React, { ReactElement } from "react"
import { Box, Flex, NavLink, ThemeProvider } from "theme-ui"
import { theme } from "../theme"

export default function _app({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Box sx={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Flex sx={{ flexDirection: "column", height: "100%", alignItems: "center" }}>
          <Flex
            as="header"
            p={4}
            sx={{
              alignItems: "center",
              maxWidth: "1200px",
              mx: "auto",
              my: 0,
              width: "100%",
            }}
          >
            <Link href={`/`} passHref>
              <NavLink sx={{ fontSize: 4 }}>Store</NavLink>
            </Link>
            <Flex
              as="ul"
              sx={{ flexGrow: 1, listStyle: "none", justifyContent: "flex-end", gap: 4 }}
            >
              {pageProps?.categories?.map((category) => (
                <Box as="li" key={category}>
                  <Link href={`/category/${category}`} passHref>
                    <NavLink>{category}</NavLink>
                  </Link>
                </Box>
              ))}
            </Flex>
          </Flex>

          <Box sx={{ flex: 1, p: 4, maxWidth: "1024px", mx: "auto", my: 0, width: "100%" }}>
            <Component {...pageProps} />
          </Box>

          <Flex as="footer" p={4} sx={{ justifyContent: "center" }}>
            © 2021 Store AB
          </Flex>
        </Flex>
      </ThemeProvider>
    </Box>
  )
}
