import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteAlbum, thunkGetAlbums } from "../../redux/albumReducer"
// import { useParams } from "react-router-dom";
import './ManageAlbum.css'
import CreateAlbumButton from "../HomePage/CreateAlbumButton";
import UpdateAlbumButton from "./UpdateAlbumButton";



export default function ManageAlbum() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    const albumArr = useSelector(state => state.albums.album?.filter(el => el.user_id == userId))
    // console.log(userId)
    useEffect(() => {
        const func = async () => {
            await dispatch(thunkGetAlbums())
        }
        func()
    }, [dispatch]);

    if (!userId) return (<h2>Please log in or sign up</h2>)
    if (!Array.isArray(albumArr)) {
        return <p>No albums available.</p>;
    }
    // console.log('where am i ?',data)
    // const albumArr = data?.filter(el => el.user_id == userId);
    // console.log('logged in user als',albums)

    const handleDelete = async (id) => {
        await dispatch(thunkDeleteAlbum(id))
    }
    // console.log(albumArr)
    if (albumArr.length !== 0) {
        return (
            <div>
                <div className="container-manage-als" >
                    {
                        albumArr?.map(el => {
                            return (
                                <div className="manage-als" key={el.id}>
                                    {/* {el.album_art ? <img style={{ width: '300px' }} src={el.album_art[0].album_art}></img> : <img style={{ width: '300px' }} src="https://res.cloudinary.com/dhukvbcqm/image/upload/v1723505751/b39ec0_1344b039b28c44d7a55449f3c83d4b41_mv2_vgm2kk.webp"></img>} */}
                                    <img style={{width:'300px'}}src={el.album_art[0].album_art}></img> 
                                    <div>{el.name}</div>
                                    <div>{el.year}</div>
                                    <div>{el.genre}</div>
                                    <div>{el.price}</div>
                                    <div>{el.description}</div>
                                    <button onClick={() => handleDelete(el.id)}>Delete Album</button>
                                    <UpdateAlbumButton el={el} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="create-album-button-home">
                    <CreateAlbumButton />

                </div>

            </div>
        )
    }else {
        return (<><h2>Post your first album on Solocamp</h2> <CreateAlbumButton/></>);
    }
}