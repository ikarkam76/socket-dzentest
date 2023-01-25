import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Button } from "@mui/material";
import { Report } from "notiflix/build/notiflix-report-aio";


const CaptchaTest = () => {
  const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
     loadCaptchaEnginge(6);
    },[])
    
  const doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha) === true) {
      setIsDisabled(false);
        document.getElementById("user_captcha_input").value = "";
    } else {
      setIsDisabled(true);
      Report.failure('Captcha does`t match', 'Try again', 'Okay');
              loadCaptchaEnginge(6);
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
              sx={{ marginTop: "5px" }}
            >
              Verify
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: "5px", marginLeft: "20px"}}
              type="submit"
              disabled={isDisabled}
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