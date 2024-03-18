// function to find user movies
export default async function findOneUserByName(Mongoclient, userId) {
    const result = await Mongoclient
    .db("test")
    .collection("user_movies")
    .findOne({ _id: userId });

    if (result){
        console.log(`Found a movie in the collection with the user ID "${userId}"`);
        console.log(`Movie names ${result.movie_name}preference value : \n ${result.pref_val} from the findOneUserByName function`)
        return [result.movie_name, result.pref_val];
    } else {
        console.log(`No movie found with the user ID '${userId}'`)
        console.log(`${result} from else block find function`)
        return null;
    }
}