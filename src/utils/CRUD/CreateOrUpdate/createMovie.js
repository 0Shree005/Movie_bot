// function to create user selcted Movie
export default async function createMovie(Mongoclient, newMovie) {
    const result = await Mongoclient
    .db("test")
    .collection("user_movies")
    .insertOne(newMovie)
    
    console.log(`New movie created with the following id: ${result.insertedId}`)
}