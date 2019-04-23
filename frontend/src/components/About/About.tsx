import * as React from "react";
// import * as ReactMarkdown from 'react-markdown';
import * as abouts from '../../about';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <h1>2018-2019</h1>
                {Object.values(abouts).map(({ markdown, image }) => (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        margin: "10px 0px",
                        height: "350px",
                    }}>
                        <img src={image} style={{ maxHeight: "100%" }} />
                        <div>
                            {/* <ReactMarkdown source={markdown} /> */}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}