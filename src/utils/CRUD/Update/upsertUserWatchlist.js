// function to create a user watclist if not already created or push data into watchlist if created
export default async function upsertMovieByName(dbClient, serverId, userId, userMovieName, userMoviePref){
    const result = await dbClient
    .db("test")
    .collection(serverId)
    .updateOne(
        { _id: userId },
        { $push: { watchlist: { movie_name: userMovieName, pref_val: userMoviePref }}},
        { upsert: true }
    );

    if ((result.upsertedCount) > 0) {
        return userId , userMovieName
    } else {
        return userId, userMovieName
    }
}