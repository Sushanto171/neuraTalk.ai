import { auth } from "@/lib/authOptions";

const UserProfile = async () => {
  const session = await auth();
  // console.log(user);
  return (
    <div>
      <h1>Hey , Welcome {session?.user?.name}</h1>
    </div>
  );
};

export default UserProfile;
