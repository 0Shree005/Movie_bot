export default function meanPreferencePipeline() {
    const unwindStage = { $unwind: "$watchlist" };

    const groupStage = { 
        $group: {
            _id: "$watchlist.movie_name",
            totalPref: { $sum: "$watchlist.pref_val" },
            userCount: { $sum: 1 },
            users: { $addToSet: "$_id" }
        }
    };

    const addFieldsStage = { 
        $addFields: {
            meanPref: { $divide: ["$totalPref", "$userCount"] }
        }
    };

    const sortStage = { $sort: { meanPref: -1, "_id": 1 } };

    return [
        unwindStage,
        groupStage,
        addFieldsStage,
        sortStage
    ];
}