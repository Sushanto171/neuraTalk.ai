import { doSocial } from "@/app/actions";

const LoginForm = () => {
  return (
    <div>
      <form action={doSocial} className="flex gap-2">
        <button
          type="submit"
          name="action"
          value="google"
          className="border shadow bg-green-200 rounded-md text-lg p-1"
        >
          Sign In With Google
        </button>
        <button
          type="submit"
          name="action"
          value="github"
          className="border shadow bg-gray-400 rounded-md text-lg p-1"
        >
          Sign In With Github
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
