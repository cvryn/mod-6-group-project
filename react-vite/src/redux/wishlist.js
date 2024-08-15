const GET_COUNT = "albumsInWishlist/GET_ALBUM_COUNT";
const GET_ALBUMS = "getAlbumsInWishlist/GET_ALBUMS";
const ADD_ALBUM = "addAlbumToWishList/ADD_TO_WISHLIST";
const REMOVE_ALBUM = "removeAlbumFromWishlist/REMOVE_ALBUM";


const getAlbumCount = (albums) => ({
  type: GET_COUNT,
  payload: albums
});

const getAlbumsInWishlist = (albums) => ({
  type: GET_ALBUMS,
  payload: albums
})

const addToWishlist = (albumData) => ({
  type: ADD_ALBUM,
  payload: albumData
});


const removeAlbumFromWishlist = (wishlistId) => ({
  type: REMOVE_ALBUM,
  payload: wishlistId
})

export const thunkWishlistAlbumCount = () => async (dispatch) => {
  const res = await fetch("/api/wishlist/counts");
  if (res.ok) {
    const data = await res.json();
    dispatch(getAlbumCount(data));
  }
};

export const thunkWishlistAlbums = (userId) => async (dispatch) => {
  const res = await fetch(`/api/wishlist/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getAlbumsInWishlist(data));
  }
};

export const thunkWishlistAlbumAdd = (albumData) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumData.album_id}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(albumData)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addToWishlist(data));
  }
};

export const thunkWishlistAdlbumRemove = (albumId) => async (dispatch) => {
  const res = await fetch(`/api/wishlist/${albumId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    // const data = await res.json();
    dispatch(removeAlbumFromWishlist({ id: albumId }));
  }
};

const initialState = {};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_COUNT: {
      const newState = { ...state };
      action.payload.forEach(album => {
        newState[album.id] = album
      });
      return newState
    }

    case GET_ALBUMS: {
      const newState = { ...state };
      action.payload.forEach(album => {
        newState[album.id] = album
      });
      return newState
    }

    case ADD_ALBUM: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState
    }

    case REMOVE_ALBUM: {
      const newState = { ...state };
      delete newState[action.payload.id]
      return newState
    }

    default:
      return state;
  }
};


export default wishlistReducer
