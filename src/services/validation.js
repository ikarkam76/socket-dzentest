import * as Yup from "yup";

export const commentSchema = Yup.object({
  user_name: Yup.string().required("Enter your name"),
  email: Yup.string()
    .typeError("Email must be valid")
    .email()
    .required("Enter email"),
  home_page: Yup.string(),
  comment: Yup.string().required("Enter your comment"),
});