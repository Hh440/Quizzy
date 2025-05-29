import { FaRegUser } from "react-icons/fa";

type Props = {
    sno: number;
    name: string;
    points: number;
    image?: string;
};

function Card({ sno, name, points, image }: Props) {
    return (
        <div className="flex items-center justify-between bg-white/80 text-black rounded-xl px-5 py-4 shadow-md hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center gap-4 w-1/2">
                <div className="bg-white p-1 rounded-full shadow-inner">
                    {image ? (
                        <img
                            src={image}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <FaRegUser className="text-black text-3xl" />
                    )}
                </div>
                <div>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="text-sm text-gray-600">#{sno}</p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-xl font-bold">{points}</p>
                <p className="text-sm text-gray-500">Points</p>
            </div>
        </div>
    );
}

export default Card;
