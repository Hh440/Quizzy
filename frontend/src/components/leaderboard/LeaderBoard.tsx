
import Card from "./Card";

export const LeaderBoard=({leaderboardData}: {
    leaderboardData: {
        points: number;
        username: string,
        profilePicture: string
    }[]
}) => {
    console.log(leaderboardData)

    return (
        <div className="bg-gradient-to-r from-black  to-[#16325B]">
        <div className="bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-solid border-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center text-white my-4">
                Leaderboard Results 🚀
            </h1>
            <div className="">
                    {leaderboardData.map((el, index) => (
                        <div className=" flex justify-center">
                            <Card
                                sno={index + 1}
                                name={el.username}
                                points={el.points}
                                image={el.profilePicture}
                            />
                        </div>
                    ))}
            </div>
            </div>
        </div>
    );
}