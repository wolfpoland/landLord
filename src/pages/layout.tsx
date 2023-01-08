import Navbar from '../components/navbar';

import React from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = function (props: Props) {
  return (
    // <div className="drawer">
    <div className="overflow-hidden">
      <Tooltip.Provider>
        <Navbar />

        <main>
          <div className="overflow-scroll">{props.children}</div>
        </main>
      </Tooltip.Provider>
    </div>
    // </div>
  );
};

export default Layout;
