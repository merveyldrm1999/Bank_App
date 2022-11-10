import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && (
        <Box sx={{ display: "flex" }}>
          <AppBar component="nav">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, display: { sm: "none" } }}
              ></IconButton>

              <Button href="/hesaplama" sx={{ color: "#fff" }}>
                Hesaplama
              </Button>
              <Button href="/bank" sx={{ color: "#fff" }}>
                Banka Ekle
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      {children}
    </>
  );
};

export default Layout;
