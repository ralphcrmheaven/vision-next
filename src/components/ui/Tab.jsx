import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Tab({ tabs }) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <ol className="flex flex-row w-full">
        {tabs.map((item, index) => {
          return (
            <li
              key={item.label}
              className={`grow p-2 text-lg font-bold text-center ${
                index === Number(tab) ? 'rounded-lg text-gray-400 font-bold bg-gray-200' : ''
              }`}
            >
              <button
                type="button"
                value={index}
                className="block w-full md:py-1 md:px-12 text-gray-400 font-semibold"
                onClick={(e) => {
                  setTab(e.target.value);
                }}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ol>
      <div key={tabs[tab].label} className="rounded-lg relative mt-10 p-2 pt-1 md:p-4 bg-gray-200" style={{height: 'inherit'}}>
        {tabs[tab] &&
          React.createElement(tabs[tab].component, {
            key: tabs[tab].label,
          })}
      </div>
    </>
  );
}

Tab.propTypes = {
  tabs: PropTypes.instanceOf(Array),
};

Tab.defaultProps = {
  tabs: [],
};
