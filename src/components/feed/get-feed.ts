import { XMLParser } from 'fast-xml-parser'

export enum FeedItemType {
    Blog = "Developer Blog",
    Podcast = "Podcasts",
    Video = "Videos",
    LiveStream = "Live Streams",
}

interface Feed {
    type: FeedItemType;
    link: string;
    icon: string;
    cta: string;
    items: FeedItem[]
}

export interface FeedItem {
    type: FeedItemType,
    published: Date;
    url: string;
    title: string;
    image: string;
    description: string;
    author: { name: string; url?: string; };
}

function getIcon(type: FeedItemType): string {
    switch (type) {
        case FeedItemType.LiveStream:
            return "https://dist.neo4j.com/wp-content/uploads/20221101082037/gdb-icon-browser-screen.svg";

        case FeedItemType.Video:
            return "https://dist.neo4j.com/wp-content/uploads/20221101082027/gdb-icon-hierarchy.svg";

        case FeedItemType.Podcast:
            return "https://dist.neo4j.com/wp-content/uploads/20221101082028/gdb-icon-user-network.svg";

        default:
            return "https://dist.neo4j.com/wp-content/uploads/20221101082030/paper-text-3.svg";
    }
}

function getCTA(type: FeedItemType) {
    switch (type) {
        case FeedItemType.LiveStream:
            return "Neo4j Live Streams";

        case FeedItemType.Video:
            return "Watch Neo4j on YouTube";

        case FeedItemType.Podcast:
            return "Listen to GraphStuff.fm";

        default:
            return "Neo4j Developer Articles"
    }
}


async function getRssFeed(type: FeedItemType, url: string, defaultItem: Partial<FeedItem> = {}, imageFactory: (item: Record<string, any>, feed: Record<string, any>) => string | undefined = () => undefined): Promise<FeedItem[]> {
    const res = await fetch(url)
    const text = await res.text();

    const parser = new XMLParser()
    const xml = parser.parse(text)

    return xml.rss.channel.item.map((item: Record<string, any>) => {
        const output = {
            ...defaultItem,
            type,
            published: new Date(item.pubDate),
            url: item.link,
            title: item.title,
            image: '',
            description: item['itunes:summary'],
        }

        return { ...output, image: imageFactory(item, xml.rss.channel) }
    })
}

async function getYoutubeFeed(type: FeedItemType, params: Record<string, any>): Promise<FeedItem[]> {
    const url = new URL('https://www.youtube.com/feeds/videos.xml')
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value)
    }

    const res = await fetch(url)
    const text = await res.text()

    const parser = new XMLParser()
    const xml = parser.parse(text)

    return xml.feed.entry.map((entry: Record<string, any>) => {
        return {
            type,
            published: new Date(entry.published),
            url: `https://youtube.com/watch?v=${entry['yt:videoId']}`,
            title: entry.title,
            description: entry['media:group']['media:description'],
            image: `http://i3.ytimg.com/vi/${entry['yt:videoId']}/hqdefault.jpg`,
            author: {
                name: entry.author.name,
                url: `https://youtube.com/channel/${entry['yt:channelId']}`,
            }
        }
    });
}

function formatFeed(type: FeedItemType, link: string, items: FeedItem[]): Feed {
    return {
        type,
        link,
        icon: getIcon(type),
        cta: getCTA(type),
        items,
    }
}

export async function getAllFeeds(limit = 4): Promise<Feed[]> {
    const youtube = await getYoutubeFeed(FeedItemType.Video, { channel_id: 'UCvze3hU6OZBkB1vkhH2lH9Q' })
    const liveStreams = await getYoutubeFeed(FeedItemType.LiveStream, { playlist_id: 'PL9Hl4pk2FsvW1NtrhILyptfFnLMjg5Vmc' })
    const blog = await getRssFeed(FeedItemType.Blog, 'https://neo4j.com/developer-blog/feed/', {
        author: {
            name: 'Neo4j Developer Blog',
            url: 'https://neo4j.com/blog',
        }
    }, (item => {
        const parts = item.description?.match(/src="(.*)" class="attachment-large size-large wp-post-image"/)
        return parts ? parts[1] : ''
    }))
    const podcast = await getRssFeed(FeedItemType.Podcast, 'https://feeds.simplecast.com/RIcqOK_t', {
        author: {
            name: 'GraphStuff.FM',
            url: 'https://graphstuff.fm',
        }
    }, (item, feed) => feed.image.url)

    return [
        formatFeed(FeedItemType.Blog, 'https://neo4j.com/developer-blog/', blog.slice(0, limit)),
        formatFeed(FeedItemType.LiveStream, 'https://twitch.tv/neo4j', liveStreams.slice(0, limit)),
        formatFeed(FeedItemType.Podcast, 'https://graphstuff.fm', podcast.slice(0, limit)),
        formatFeed(FeedItemType.Video, 'https://youtube.com/neo4j', youtube.slice(0, limit)),
    ]
}


export async function getLatest(limit = 6): Promise<FeedItem[]> {
    const youtube = await getYoutubeFeed(FeedItemType.Video, { channel_id: 'UCvze3hU6OZBkB1vkhH2lH9Q' })
    const liveStreams = await getYoutubeFeed(FeedItemType.LiveStream, { playlist_id: 'PL9Hl4pk2FsvW1NtrhILyptfFnLMjg5Vmc' })
    const blog = await getRssFeed(FeedItemType.Blog, 'https://neo4j.com/developer-blog/feed/', {
        author: {
            name: 'Neo4j Developer Blog',
            url: 'https://neo4j.com/developer-blog',
        }
    })
    const podcast = await getRssFeed(FeedItemType.Podcast, 'https://feeds.simplecast.com/RIcqOK_t', {
        author: {
            name: 'GraphStuff.FM',
            url: 'https://graphstuff.fm',
        }
    })

    return ([] as FeedItem[]).concat(youtube, liveStreams, blog, podcast)
        .filter(item => !item.title.includes('#shorts'))
        .filter((item, index, feed) => index === feed.findIndex(n => n.url === item.url, index + 1))
        .sort((a, b) => a.published > b.published ? -1 : 1)
        .slice(0, limit)
}
