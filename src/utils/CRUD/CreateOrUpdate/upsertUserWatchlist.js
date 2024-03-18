// function to create a user watclist if not already created  or push data into watchlist if created
export default async function upsertMovieByName(client, userId, userSelectedMovie, userSelectedPrefVal){
    const result = await client
    .db("test")
    .collection("user_movies")
    .updateOne({ _id: userId }, { $push:{ movie_name: userSelectedMovie, pref_val: userSelectedPrefVal }}, { upsert: true });

    if ((result.upsertedCount) > 0) {
        return `<@${userId}> Your watchlist was created and **${userSelectedMovie}** was added to it.`;
    } else {
        return `<@${userId}> **${userSelectedMovie}** was added to your watchlist.`;
    }
}