async function deleteOneMovieByName (client, MovieName) {
    const result = await client
    .db("test")
    .collection("user_movies")
    .deleteOne({movie_name: MovieName})

    console.log(`${result.deletedCount} document(s) was/were delted`)
}