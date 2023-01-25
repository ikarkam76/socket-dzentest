import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Button } from "@mui/material";

const CaptchaTest = () => {
  const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
     loadCaptchaEnginge(6);
    })
    
  const doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha) === true) {
        setIsDisabled(false);
      loadCaptchaEnginge(6);
        document.getElementById("user_captcha_input").value = "";
        
    } else {
      alert("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
  };

return (
  <div>
    <div className="container">
      <div className="form-group">
        <div className="col mt-3">
          <LoadCanvasTemplate />
        </div>

        <div className="col mt-3">
          <div>
            <input
              placeholder="Enter Captcha Value"
              id="user_captcha_input"
              name="user_captcha_input"
              type="text"
            ></input>
          </div>
        </div>

        <div className="col mt-3">
          <div>
            <Button
              onClick={() => doSubmit()}
              variant="contained"
              type="submit"
              sx={{ marginTop: "5px" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isDisabled}
              sx={{ marginTop: "5px", marginLeft: "15px" }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default CaptchaTest;