import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { formatDate } from "../../utils";

export const Message = ({ content, time, sender }) => {
  const [isSender, setIsSender] = useState();
  const [formattedDate, setFormattedDate] = useState(''); 

  useEffect(() => {
    if (sender === userStore.user.id) {
      setIsSender(true);
    } else {
      setIsSender(false);
    }
    setFormattedDate(formatDate(time))
  });

  return (
    <>
      {isSender && (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div
              className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"
            >
              <p className="text-sm">{content}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">{formattedDate}</span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-300"></div>
        </div>
      )}
      {!isSender && (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">{content}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">{formattedDate}</span>
          </div>
        </div>
      )}
    </>
  );
};
