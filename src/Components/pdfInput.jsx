import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, addAINotes } from '../utils/dataSlice';
import { generateStudyNotes } from '../utils/geminiApi';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';

const PdfExtractor = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.data.notes);
    const aiNotes = useSelector((state) => state.data.aiNotes);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    const extractTextFromPDF = async (file) => {
        setLoading(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
            const typedArray = new Uint8Array(event.target.result);

            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            let extractedText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                const pageText = textContent.items.map(item => item.str).join(' ');
                extractedText += `📄 Page ${i}:\n${pageText}\n\n`;
            }

            dispatch(addNotes([extractedText]));
            setLoading(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleGenerateNotes = async () => {
        if (!notes.length) {
            alert('🚨 Please extract text from a PDF first!');
            return;
        }

        setGenerating(true);
        const aiGeneratedNotes = await generateStudyNotes(notes[0],dispatch);
        dispatch(addAINotes([aiGeneratedNotes]));
        setGenerating(false);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            extractTextFromPDF(file);
        } else {
            alert('🚨 Please upload a valid PDF file!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-[30px] border-4 border-pink-500 p-6 max-w-2xl w-full cartoon-box">
                <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-6 animate-bounce">
                    🎨 Cartoon PDF Extractor
                </h2>

                <label className="cursor-pointer flex items-center justify-center gap-3 bg-yellow-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-yellow-600 transition-all duration-300 border-4 border-yellow-700">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    📂 Upload PDF
                </label>

                {loading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-dashed border-pink-600"></div>
                    </div>
                )}

                {notes.length > 0 && (
                    <>
                        <div className="mt-6 bg-blue-100 p-4 rounded-xl shadow-md overflow-y-auto max-h-96 border-4 border-blue-500 cartoon-box">
                            <h3 className="text-2xl font-bold text-blue-600 mb-2">📝 Extracted Notes:</h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-800">{notes[0]}</pre>
                        </div>

                        <button
                            onClick={handleGenerateNotes}
                            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg hover:bg-green-600 transition-all duration-300 border-4 border-green-700"
                        >
                            ✨ Generate Study Notes
                        </button>
                    </>
                )}

                {generating && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-dashed border-green-600"></div>
                    </div>
                )}

                {aiNotes.length > 0 && (
                    <div className="mt-6 bg-green-100 p-4 rounded-xl shadow-md overflow-y-auto max-h-96 border-4 border-green-500 cartoon-box">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">📚 AI-Generated Notes:</h3>
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">{aiNotes[0]}</pre>
                    </div>
                )}

                {/* Cartoon Box Shadow Effect */}
                <style>
                    {`
                    .cartoon-box {
                        box-shadow: 8px 8px 0px #000;
                    }
                `}
                </style>
            </div>
        </div>
    );
};

export default PdfExtractor;
