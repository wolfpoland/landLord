import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar bg-neutral-content">
      <div className="navbar-start"></div>

      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Land lord</a>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              href={{
                pathname: "/register",
              }}
            >
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
