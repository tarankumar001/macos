import { createContext } from "react";

interface UseContextType {
  runCatVideo: boolean;
  setRunCatVideo: (value: boolean) => void;
}

const UseContext = createContext<UseContextType>({
  runCatVideo: false,
  setRunCatVideo: () => {}
});

export default UseContext;
