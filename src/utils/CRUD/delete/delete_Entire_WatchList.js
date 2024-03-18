// function to delete the user's ENTIRE watchlist
export default async function delete_Entire_WatchList (client, userId) {
    const result = await client
    .db("test")
    .collection("user_movies")
    .deleteOne({_id: userId})
    
    console.log(`${result.deletedCount} document(s) was/were delted`)

    return `<@${userId}> Your watchlist was **DELETED**.`;
    
}