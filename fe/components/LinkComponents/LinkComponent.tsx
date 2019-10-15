import * as React from 'react';
import Link from 'next/link';
import { Button, PropTypes } from '@material-ui/core';

interface IProps {
    href: string,
    isButton?: boolean,
    text: string,
    variant?: "text" | "outlined" | "contained",
    color?: PropTypes.Color,
}

const LinkComponent: React.FunctionComponent<IProps> = ({ href, isButton = false, text, variant = 'contained', color = 'primary' }) => {

    return <>
        <Link href={href}>
            <div>
                {!isButton && <a>{text}</a>}
                {isButton && <Button variant={variant} color={color}>{text}</Button>}
            </div>
        </Link>
    </>;
}

export default LinkComponent;