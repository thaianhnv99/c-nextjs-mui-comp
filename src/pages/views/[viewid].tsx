import React from 'react';
import {useRouter} from "next/router";

const Viewid = () => {
    const route = useRouter();
    return (
        <div>
            Show View id detail: query {JSON.stringify(route.query)}
        </div>
    );
};

    export default Viewid;
