const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const serverApi = axios.create({
  baseURL,
});

export const getMe = async () => {
  const cookieStore = cookies();

  const res = await serverApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};