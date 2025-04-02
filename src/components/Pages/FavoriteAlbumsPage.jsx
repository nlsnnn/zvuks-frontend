import { Helmet } from "react-helmet"
import { FavoriteAlbums } from "../Favorite/FavoriteAlbums"

export const FavoriteAlbumsPage = () => {

    return (
        <>
        <Helmet>
            Любимые альбомы
        </Helmet>
        <FavoriteAlbums />
        </>
    )
}