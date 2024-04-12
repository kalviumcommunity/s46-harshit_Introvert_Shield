import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookie } from "./Cookies";

function UpdatePlace() {
  const { id } = useParams();

  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [density, setDensity] = useState("");
  const [wifi, setWifi] = useState("");
  const [comfort, setComfort] = useState("");
  const jwtToken = getCookie("jwtToken");
  const postedby = getCookie("username")


  const nav = useNavigate()

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + id, {
      headers: { authorization: `Bearer ${jwtToken}` },
    }).then((data) => {
      setComfort(data.data.Seating_Comfort);
      setDensity(data.data.Crowd_Density);
      setImage(data.data.Image_Link);
      setPlace(data.data.Place_Type);
      setWifi(data.data.WiFi_Availability);
    });
  }, [id, jwtToken]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(   
        import.meta.env.VITE_API_URL + id,
        {
            Place_Type: place,
            Image_Link: image,
            Crowd_Density: density,
            Seating_Comfort: comfort,
            WiFi_Availability: wifi,
            Posted_By: postedby
        }, {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then(() => {
          nav("/home");
      })
      .catch((err) => {
        console.error(err.response.data)
      });
  };


  return (
    <>
      <div>
        <div className="introvert-container">
          <div className="introvert-modal">
            <div className="introvert-modal__header">
              <span className="introvert-modal__title">Update Place</span>
            </div>

            <div className="introvert-modal__body">
              <div className="introvert-input">
                <label className="introvert-input__label">Place Name</label>
                <input
                  className="introvert-input__field"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <p className="introvert-input__description">
                  The title must contain a maximum of 3 characters
                </p>
              </div>

              <div className="introvert-input">
                <label className="introvert-input__label">Image Link</label>
                <input
                  className="introvert-input__field"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <p className="introvert-input__description">
                  Please copy image link and paste it here
                </p>
              </div>

              <div className="introvert-input">
                <label className="introvert-input__label">Crowd Density</label>
                <input
                  className="introvert-input__field"
                  type="text"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                />
                <p className="introvert-input__description">
                  Mention the Density of people normally present there E.g High
                  Density.
                </p>
              </div>

              <div className="introvert-input">
                <label className="introvert-input__label">
                  Seating Comfort
                </label>
                <input
                  className="introvert-input__field"
                  type="text"
                  value={comfort}
                  onChange={(e) => setComfort(e.target.value)}
                />
                <p className="introvert-input__description">
                  How much comfortable is seating place.
                </p>
              </div>

              <div className="introvert-input">
                <label className="introvert-input__label">
                  Wifi Availability
                </label>
                <input
                  className="introvert-input__field introvert-input__field--textarea"
                  value={wifi}
                  onChange={(e) => setWifi(e.target.value)}
                />
                <p className="introvert-input__description">
                  Please mention if the Wi-Fi Available or not.
                </p>
              </div>
            </div>

            <div className="introvert-modal__footer">
              <button
                className="introvert-button create"
                  onClick={handleUpdate}
              >
                Update Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePlace;
