import { FaPlay, FaForward, FaBackward, FaHeart } from "react-icons/fa";

export const Player = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 px-4 md:px-6 flex items-center justify-between shadow-md flex-nowrap sm:flex-wrap gap-y-2">
      {/* Левая часть */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src="/hamster.jpg"
          alt="Обложка"
          className="w-12 h-12 object-cover rounded"
        />
        <div className="text-sm">
          <div className="font-medium text-gray-900">Название трека</div>
          <div className="text-gray-600">Артист</div>
        </div>
      </div>

      {/* Центр */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-4 mb-1">
          <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaBackward />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer">
            <FaPlay />
          </button>
          <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaForward />
          </button>
        </div>
        <input
          type="range"
          className="w-full max-w-xs h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer hidden sm:block"
        />
      </div>

      {/* Правая часть */}
      <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto justify-end">
        <button className="text-gray-500 hover:text-red-500 cursor-pointer">
            <FaHeart />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          className="h-1 w-24 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </footer>
  );
};
