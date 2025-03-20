import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PdfNotes = () => {
    let aiNotes = useSelector((state) => state.data.aiNotes);
    aiNotes = aiNotes[1]?.studyNotes     || [];

    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 1; // ✅ Display 3 topics per page

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = aiNotes.slice(indexOfFirstNote, indexOfLastNote);

    const totalPages = Math.ceil(aiNotes.length / notesPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (!aiNotes || aiNotes.length === 0) {
        return <p className="text-center text-gray-500 mt-10">📭 No notes available. Please generate notes first.</p>;
    }

    return (
        <div className="p-6 bg-green-50 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <h2 className="text-center text-green-700 text-3xl font-bold mb-6">📚 Study Notes</h2>

            <div className="grid gap-4">
                {currentNotes.map((note, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-green-400">
                        <div className="bg-green-100 p-3 rounded-lg mb-3">
                            <h3 className="text-lg font-bold">📝 Topic</h3>
                            <p className="text-gray-700">{note.Topic || 'Unknown Topic'}</p>
                        </div>

                        <div className="bg-green-100 p-3 rounded-lg mb-3">
                            <h3 className="text-lg font-bold">📋 Summary</h3>
                            <p className="text-gray-700">{note.Summary || 'No summary available.'}</p>
                        </div>

                        <div className="bg-green-100 p-3 rounded-lg">
                            <h3 className="text-lg font-bold">🔍 Important Terms</h3>
                            <ul className="list-disc pl-4 text-gray-700">
                                {note.ImportantTerms && Object.entries(note.ImportantTerms).length > 0 ? (
                                    Object.entries(note.ImportantTerms).map(([term, description], idx) => (
                                        <li key={idx}>
                                            <strong>{term}:</strong> {description}
                                        </li>
                                    ))
                                ) : (
                                    <p>No important terms available.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-md border ${
                            currentPage === index + 1
                                ? 'bg-green-600 text-white border-green-700'
                                : 'bg-white text-green-700 border-green-400'
                        } hover:bg-green-500 hover:text-white transition-all duration-200`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PdfNotes;
