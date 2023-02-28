import React from 'react';
import {useRouter} from "next/router";

const MultiView = () => {
    const route = useRouter();
    return (
        <div>
            View show multi params: {JSON.stringify(route.query)}
        </div>
    );
};

export default MultiView;
