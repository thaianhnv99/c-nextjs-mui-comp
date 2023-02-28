import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link"

const Views = () => {
    const route = useRouter();

    const navigateTo = () => {
        route.push({
            pathname: '/posts',
            query: {
                viewid: '123',
                ref: 'social'
            }
        });
    }
    return (
        <div>
            <div>View content</div>
            <Link href={'/posts'}>
                <a>Go to posts by link tag</a>
            </Link><br/><br/>

            <label>Link by action</label>
            <button onClick={navigateTo}>Click</button>
        </div>
    );
};

export default Views;
