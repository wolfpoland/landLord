import Navbar from '../components/navbar';

import React from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = function (props: Props) {
  return (
    <div className="drawer">
      <div>
        <Tooltip.Provider>
          <Navbar />

          <main>
            <div className="drawer">{props.children}</div>
          </main>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

export default Layout;
