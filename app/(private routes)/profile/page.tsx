import { getMe } from "@/lib/api/serverApi";

import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <div>
      <h1>Profile</h1>

      <Image
        src={user.avatar}
        alt="avatar"
        width={120}
        height={120}
      />

      <p>{user.username}</p>

      <p>{user.email}</p>

      <Link href="/profile/edit">

        Edit profile

      </Link>
    </div>
  );
}