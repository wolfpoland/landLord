import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { status } = useSession();
  const router = useRouter();

  function onLogout(): void {
    signOut().then(() => {
      router.push("/");
    });
  }

  return (
    <nav className="navbar bg-neutral-content">
      <div className="navbar-start"></div>

      <div className="navbar-center">
        <Link
          href={{
            pathname: "/",
          }}
        >
          <a className="btn btn-ghost normal-case text-xl">Land lord</a>
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0">
          <li>
            {status === "authenticated" ? (
              <span onClick={onLogout}>Logout</span>
            ) : (
              <Link
                href={{
                  pathname: "/login",
                }}
              >
                <a>Login</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
