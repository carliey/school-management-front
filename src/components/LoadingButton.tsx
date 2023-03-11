import { Button, ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.loading}>
      {props.loading ? "Loading..." : props.children}
    </Button>
  );
}

export default LoadingButton;
