import { LinearProgress, Box, styled } from "@mui/material";

const MyLoaderBox = styled(Box)(() => ({
  // margin: '0.5rem auto',
  padding: "0 1rem",
  height: "0.5rem",
}));

interface I_MyLoader {
  variant?: "indeterminate" | "query";
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  loading: boolean;
}

export const MyLoader = ({
  variant = "indeterminate",
  loading,
  color = "secondary",
  ...props
}: I_MyLoader) => {
  return (
    <MyLoaderBox>
      {loading && <LinearProgress {...props} color={color} />}
    </MyLoaderBox>
  );
};
