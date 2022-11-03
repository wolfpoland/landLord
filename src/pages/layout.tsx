import React from "react";
import Navbar from "../components/navbar";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = function (props: Props) {
  return (
    <div className="drawer">
      <div>
        <Navbar />

        <main>{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
