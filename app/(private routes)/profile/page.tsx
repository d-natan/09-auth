import { getMe } from "@/lib/api/serverApi";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <div>
      <h1>Profile</h1>

      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </div>
  );
}