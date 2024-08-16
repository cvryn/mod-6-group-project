import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { thunkCollectionAlbumCount } from "../../redux/collection"
import "./UserProfile.css"
import { useEffect } from "react"


function Collection() {
  const currentUser = useSelector(state => state.session.user)
  const album_in_collection = currentUser.album_in_collection;
  const albumCountObj = useSelector(state => state.collection);
  const albumCountArr = Object.values(albumCountObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkCollectionAlbumCount())
  }, [dispatch]);

  if (!currentUser) return null

  return album_in_collection ? (
    <div id="container-album-listing-wishlist">
      {album_in_collection?.map(album => {
        const albumCount = albumCountArr.find(countAlbum => countAlbum.id === album.id)?.count || 0;

        return (
          <Link
            to={`/albums/${album.id}`}
            key={album.id}
            id="container-album-wishlist"
          >
            <img
              src={album.album_art[0]?.album_art}
              style={{ width: "220px", aspectRatio: "1/1" }}
              alt="album-cover-image"
            />
            <span style={{ paddingTop: "10px" }}>{album.name}</span>
            <span style={{ fontSize: "0.75rem" }}>by {album.user_username}</span>
            {albumCount === 1
              ? <span style={{ marginTop: "auto", fontSize: "0.75rem" }}>appears in {albumCount} collection</span>
              : <span style={{ marginTop: "auto", fontSize: "0.75rem" }}>appears in {albumCount} collections</span>
            }
          </Link>
        )
      })}
    </div>
  ) : (<div style={{ minHeight: "800px" }}></div >);
}


export default Collection
