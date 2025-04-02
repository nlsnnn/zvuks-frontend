import { Helmet } from "react-helmet"
import { FavoriteSongs } from "../Favorite/FavoriteSongs"

export const FavoriteSongsPage = () => {

    return (
        <>
        <Helmet>
            Любимые треки
        </Helmet>
        <FavoriteSongs />
        </>
    )
}