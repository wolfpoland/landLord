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
          <span className="btn btn-ghost normal-case text-xl">Land lord</span>
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
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
