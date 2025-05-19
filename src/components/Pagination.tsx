import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-between my-8 px-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-purple-600 text-white disabled:bg-gray-300 cursor-pointer"
            >
                <ChevronLeft />
            </button>
            
            <span className="font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-purple-600 text-white disabled:bg-gray-300 cursor-pointer"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default Pagination;