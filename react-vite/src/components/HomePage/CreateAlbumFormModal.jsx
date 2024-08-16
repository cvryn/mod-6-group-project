import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateAlbum } from "../../redux/albumReducer";
import { useNavigate } from "react-router-dom";

function CreateAlbumFormModal() {
    const userId = useSelector(state => state.session.user.id)

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [albumart, setAlbumart] = useState("");
    const [albumbanner, setAlbumbanner] = useState("");
    const [backgroundcolor, setBackgroundcolor] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkCreateAlbum({
                user_id: userId,
                name,
                year,
                genre,
                price,
                description,
                albumart,
                albumbanner,
                backgroundcolor
            })
        );

        console.log('can i get error from backend', serverResponse)
        if (!serverResponse.errors) {
            closeModal();
            navigate('/manage-albums')
        } else {
            setErrors(serverResponse);
        }
    };
    // console.log('any thing in errors?', errors.errors)
    return (
        <div id="container-signup-form-modal">
            <h1>Create Album</h1>

            <form id="container-signup-form"
                onSubmit={handleSubmit}
            >
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.name && <p style={{color:'red'}}>{errors.errors.name}</p>}
                <label>
                    Year
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.year && <p style={{color:'red'}}>{errors.errors.year}</p>}

                <label>
                    Genre
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >
                        <option value="">Select Genre</option>
                        <option value="pop">pop</option>
                        <option value="pop">rap</option>
                        <option value="rock">rock</option>
                        <option value="alternative">jazz</option>
                        <option value="r&b">classical</option>
                        <option value="country">country</option>
                        <option value="country">electrinic</option>
                        <option value="rap">experimental</option>
                    </select>
                </label>
                {errors?.errors?.genre && <p style={{color:'red'}}>{errors.errors.genre}</p>}

                <label>
                    Price
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.price && <p style={{color:'red'}}>{errors.errors.price}</p>}

                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.description && <p style={{color:'red'}}>{errors?.errors.description}</p>}
                <label>
                    Album art
                    <input
                        type="text"
                        value={albumart}
                        onChange={(e) => setAlbumart(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.album_art && <p style={{color:'red'}}>{errors?.errors.album_art}</p>}
                <label>
                    Album banner
                    <input
                        type="text"
                        value={albumbanner}
                        onChange={(e) => setAlbumbanner(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.album_banner && <p style={{color:'red'}}>{errors?.errors.album_banner}</p>}
                <label>
                    Background color
                    <input
                        type="text"
                        value={backgroundcolor}
                        placeholder="rgb(0,0,0)"
                        onChange={(e) => setBackgroundcolor(e.target.value)}
                        required
                    />
                </label>
                {errors?.errors?.background_color && <p style={{color:'red'}}>{errors?.errors.background_color}</p>}
                <button type="submit">Create</button>
                <button
                // type="submit"
                onClick={()=>{
                    setName('new album')
                    setYear(2024)
                    setGenre('rap')
                    setPrice(10)
                    setDescription('this is a new album')
                    setAlbumart("https://res.cloudinary.com/dhukvbcqm/image/upload/v1723505751/b39ec0_1344b039b28c44d7a55449f3c83d4b41_mv2_vgm2kk.webp")
                    setAlbumbanner("https://res.cloudinary.com/dhukvbcqm/image/upload/v1723505751/b39ec0_1344b039b28c44d7a55449f3c83d4b41_mv2_vgm2kk.webp")
                    setBackgroundcolor('rgb(0,0,0)')
                }}
                >Demo Album</button>
            </form>
        </div>
    );
}

export default CreateAlbumFormModal