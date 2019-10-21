import React from 'react'
import Link from 'next/link';
import localisation from '../src/Locales/Localisations';
import { Button } from '@material-ui/core';
import HeadComponent from '../components/Layouts/HeadComponent';


type Props = {
    statusCode?: string,
}

class Error extends React.Component<Props> {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {
        return <>
                <div style={{ height: '90vh' }}>
                    <div className={'flex-center flex-column'}>
                        <p className={'display-4 pt-5 pb-5'}>
                            :(
                        </p>
                        <p className={'h4-responsive pt-3 pb-3'}>
                            {localisation.error.sorry}
                        </p>
                        <p className={'h5-responsive pt-5 pb-5'}>
                            {
                                this.props.statusCode
                                    ? localisation.formatString(localisation.error.errorCodeOccured, this.props.statusCode.toString())
                                    : localisation.error.errorOnClient
                            }
                        </p>
                        <Link href='/'>
                            <Button variant='contained' color="primary" style={{ width: '8rem' }}>Go home</Button>
                        </Link>
                    </div>
                </div>

        </>;
    }
}

export default Error