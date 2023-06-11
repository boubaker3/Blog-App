import axiosInstance from "../Axios";

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    // Save the token and user in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to the desired page
    // Replace "/dashboard" with the actual URL you want to redirect to
    window.location.href = "/feed";
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error response, display error message, etc.
  }
};

export const signup = async ({ photo, username, email, password }) => {
  try {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("photo", photo); // Append the selected photo file

    const response = await axiosInstance.post("/signup", formdata);

    const { token, user } = response.data;

    // Save the token and user in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to the desired page
    // Replace "/dashboard" with the actual URL you want to redirect to
    window.location.href = "/feed";
  } catch (error) {
    console.error("Signup failed:", error);
    // Handle error response, display error message, etc.
  }
};
