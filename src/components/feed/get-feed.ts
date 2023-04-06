import { XMLParser } from 'fast-xml-parser'

export enum FeedItemType {
    Blog = "Developer Blog",
    Podcast = "Podcast",
    Video = "Video",
    LiveStream = "Live Stream",
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


async function getRssFeed(type: FeedItemType, url: string, defaultItem: Record<string, any> = {}): Promise<FeedItem[]> {
    const res = await fetch(url)
    const text = await res.text();

    const parser = new XMLParser()
    const xml = parser.parse(text)



    return xml.rss.channel.item.map((item: Record<string, any>) => ({
        ...defaultItem,
        type,
        published: new Date(item.pubDate),
        url: item.link,
        title: item.title,
        image: '',
        description: item['itunes:summary'],
        // author: { name: ''; url?: ''; },
    }))
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



export async function getLatest(limit = 6): Promise<FeedItem[]> {
    const youtube = await getYoutubeFeed(FeedItemType.Video, { channel_id: 'UCvze3hU6OZBkB1vkhH2lH9Q' })
    const liveStreams = await getYoutubeFeed(FeedItemType.LiveStream, { playlist_id: 'PL9Hl4pk2FsvW1NtrhILyptfFnLMjg5Vmc' })
    const blog = await getRssFeed(FeedItemType.Blog, 'https://neo4j.com/developer-blog/feed/', {
        author: {
            name: 'Neo4j Developer Blog',
            url: 'https://neo4j.com/blog',
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