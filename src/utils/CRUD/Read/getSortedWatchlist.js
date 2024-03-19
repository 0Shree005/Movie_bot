
export default async function getSortedWatchlist(client, userId) {
    const pipeline = [
        { $match: { _id: userId } },
        { $unwind: "$watchlist" },
        { $sort: { "watchlist.pref_val": -1 } }
    ];

    const result = await client
        .db("test")
        .collection("user_movies")
        .aggregate(pipeline)
        .toArray();

    return result.map(doc => doc.watchlist);
}