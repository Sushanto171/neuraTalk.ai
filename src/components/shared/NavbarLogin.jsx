import LoginForm from "../form/LoginForm";

const NavbarLogin = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn ">
        <div className="">
          <span>Login</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content w-52 bg-gray-200 shadow rounded mt-4"
      >
        <LoginForm isRow={true} />
      </ul>
    </div>
  );
};

export default NavbarLogin;
