import * as React from 'react';

export interface IHelloProps {
  name: string;
}

const Hello: React.SFC<IHelloProps> = props => {
    return (
        <h3>{props.name}</h3>
    )
}

export default Hello;