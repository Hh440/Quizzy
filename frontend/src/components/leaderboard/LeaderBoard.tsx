import Card from "./Card";

export const LeaderBoard = ({ leaderboardData }: {
    leaderboardData: {
        points: number;
        username: string;
        profilePicture: string;
    }[]
}) => {
    return (
        <div className="bg-gradient-to-br from-black via-[#0d1b2a] to-[#16325B] min-h-screen py-10 px-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 max-w-3xl mx-auto p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
                    🏆 Leaderboard Results
                </h1>
                <div className="space-y-4">
                    {leaderboardData.map((el, index) => (
                        <Card
                            key={index}
                            sno={index + 1}
                            name={el.username}
                            points={el.points}
                            image={el.profilePicture}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
