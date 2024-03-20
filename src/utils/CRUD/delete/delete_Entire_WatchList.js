// function to delete the user's ENTIRE watchlist
export default async function delete_Entire_WatchList (client, serverId, userId) {
    const result = await client
    .db("test")
    .collection(serverId)
    .deleteOne({_id: userId})
    
    console.log(`${result.deletedCount} document(s) was/were deleted`)

    return `<@${userId}> Your watchlist was **DELETED**.`;
    
}