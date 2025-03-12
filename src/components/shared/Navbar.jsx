import { auth } from "@/lib/authOptions";
import Link from "next/link";
import ThemeToggle from "../form/ThemeToggle";
import SignOut from "../sidbar/SignOut";
import NavAvatar from "./NavAvatar";
import NavbarLogin from "./NavbarLogin";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className=" bg-gray-400 sticky top-0 dark:bg-gray-900">
      <div className="flex items-center justify-between max-w-screen-lg px-4 sm:px-0 mx-auto h-16">
        <div>
          <Link href={"/"} className="text-xl font-bold pl-7">
            NeuraTalk.ai
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
