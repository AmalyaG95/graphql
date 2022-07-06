import React from 'react';

import { components } from 'react-select';

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.value}</label>
      </components.Option>
    </div>
  );
}

export default Option;
