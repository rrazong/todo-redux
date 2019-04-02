import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <ul>
      {
        props.items.map((item) => {
          const {id, name} = item;
          return (
            <li key={id}>
              <span
                style={{textDecoration: item.complete ? 'line-through' : 'none'}}
                onClick={props.toggle ? () => props.toggle(item) : null}
              >
                {name}
              </span>
              <Button color="secondary" onClick={() => props.remove(item)}>
                Remove
              </Button>
            </li>
          );
        })
      }
    </ul>
  );
};

