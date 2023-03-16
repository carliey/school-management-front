import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useState } from "react";

function Layout() {
  const drawerWidth = 240;

  const [pageTitle, setPageTitle] = useState("Welcome");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} pageTitle={pageTitle} />
      <Sidebar drawerWidth={drawerWidth} setPageTitle={setPageTitle} />
      <MainContent />
    </Box>
  );
}

export default Layout;
