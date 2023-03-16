import { AppBar as MuiAppBar } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router-dom";

type Props = {
  drawerWidth: number;
  pageTitle: string;
};

const Appbar = ({ drawerWidth, pageTitle }: Props) => {
  const location = useLocation();

  console.log(location);
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {/* {location.pathname === "/"
            ? "Dashboard"
            : location.pathname.substring(1)} */}
          {pageTitle}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default Appbar;
