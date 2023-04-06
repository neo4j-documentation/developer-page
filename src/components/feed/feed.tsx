import React from 'react'

import type { FeedItem } from './get-feed';

export default function Feed({ feed }: { feed: FeedItem[] }) {
    return <div>
        <div>feed</div>
        <pre>{JSON.stringify(feed, null, 2)}</pre>
    </div>
}