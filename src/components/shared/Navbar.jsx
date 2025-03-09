import { auth } from "@/lib/authOptions";
import Link from "next/link";
import SignOut from "../sidbar/SignOut";
import NavAvatar from "./NavAvatar";
import NavbarLogin from "./NavbarLogin";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className=" bg-gray-400 sticky top-0">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto h-16">
        <div>
          <Link href={"/"} className="text-xl font-bold">
            NeuraTalk.ai
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <SignOut />
              <NavAvatar user={session?.user} />
            </>
          ) : (
            <>
              <NavbarLogin />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
