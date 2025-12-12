import { Link } from "react-router-dom";












export function MainButton ({title, onClick, to}){
    return (
        <Link to={to}>
         <button onClick={onClick} class="bg-[#FFA500] hover:border-[#FFA500] hover:bg-transparent border rounded-xl p-4  shadow-lg shadow-yellow-500/50 text-[#002D6B] hover:text-white font-semibold ">
            {title}
        </button>
        </Link>
    )
}