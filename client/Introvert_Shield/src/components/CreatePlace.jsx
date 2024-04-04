import { useState } from "react";
import "./CreatePlace.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlace() {
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [density, setDensity] = useState("");
  const [wifi, setWifi] = useState("");
  const [comfort, setComfort] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios
        .post("http://localhost:3000/introverts", {
          Place_Type: place,
          Image_Link: image,
          Crowd_Density: density,
          Seating_Comfort: comfort,
          Wifi_Availability: wifi,
        })
        .then(nav("/home"));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="introvert-container">
          <div className="introvert-modal">
            <div className="introvert-modal__header">
              <span className="introvert-modal__title">Add New Place</span>
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
                <label className="introvert-input__label">Seating Comfort</label>
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
                onClick={handleSubmit}
              >
                Create Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePlace;
