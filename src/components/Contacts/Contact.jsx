import { useNavigate } from "react-router-dom";

export const Contact = ({ username, id, avatar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chats/${id}`);
  };

  return (
    <>
      <div 
      className="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black"
      onClick={handleClick}>
        <img
          src={avatar}
          alt={username}
          className="rounded-full w-12 h-12 object-cover"
        />
        <span>{username}</span>
      </div>
    </>
  );
};
