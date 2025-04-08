import { Link } from "react-router-dom";

export const AlbumCard = ({ id, cover, name }) => {
  return (
    <>
    <Link to={'/album/' + id}>
      <div className="flex flex-col border border-black rounded hover:bg-gray-200 transition cursor-pointer ">
        <img src={cover} alt={name} className="w-30 h-30" />

        <div className="flex flex-col gap-2 p-1 ">
          <h3 className="text-center">{name}</h3>
          {/* <span>{artists}</span> */}
        </div>
      </div>
    </Link>
    </>
  );
};
