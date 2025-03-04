import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-gray-400 sticky top-0">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto py-4">
        <div>
          <Link href={"/"}>NeuraTalk.ai</Link>
        </div>
        <div>Profile</div>
      </div>
    </nav>
  );
};

export default Navbar;
