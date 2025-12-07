import axiosClient from "./axiosClient";

export const loginRequest = async (email, password) => {
    const { data } = await axiosClient.post("usuario/login", { email, password });
    return data; // data = { token, usuario }
};

export const logoutRequest = async (token) => {
    const { data } = await axiosClient.post(
        "usuario/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};
