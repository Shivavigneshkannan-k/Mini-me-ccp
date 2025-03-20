import { useSelector } from "react-redux";
import { useState } from "react";

const Notes = () => {
    const notes = useSelector(store => store.data.notes);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 6;

    const totalPages = Math.ceil(notes.length / notesPerPage);
    const startIndex = (currentPage - 1) * notesPerPage;
    const currentNotes = notes.slice(startIndex, startIndex + notesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-50 p-8 ">
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Study Notes</h1>
                <p className="text-gray-600 text-lg">Organized, Structured, and Easy to Access</p>
            </header>

            {currentNotes && currentNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentNotes.map((note, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-200"
                        >
                            <h2 className="font-semibold text-xl text-indigo-700 mb-2">{note.topic_title}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{note.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 text-lg">No notes available. Try adding some!</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-indigo-500 text-white rounded-lg transition-all ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                >
                    Previous
                </button>
                <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-indigo-500 text-white rounded-lg transition-all ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Notes;