const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    let login_url = API_URL + "/api/auth/log-in";

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(
            {
                email: email,
                password: password
            }
        )
    });

    return res;
};