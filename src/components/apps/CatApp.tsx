import { useContext } from "react";
import UseContext from "~/Context";

function CatApp() {
  const { setRunCatVideo } = useContext(UseContext);

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold text-center">🐱 Cat Video</div>
      <img src="/cat.gif" alt="cat" className="w-32 h-32 rounded-lg" />
      <button
        onClick={() => setRunCatVideo(true)}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
      >
        Play Cat Video
      </button>
    </div>
  );
}

export default CatApp;
