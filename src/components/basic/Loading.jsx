import { SyncLoader } from "react-spinners";
import useTheme from "../../hooks/useTheme";

const Loading = () => {
  const { isDark } = useTheme();
  
  return <SyncLoader color={isDark ? "#ffffff" : "#000000"} margin={5} />;
};

export default Loading;
