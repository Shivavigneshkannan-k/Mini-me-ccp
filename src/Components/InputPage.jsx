import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useState } from "react";
import { addNotes, addQuestions, addMultipleChoiceQuestion } from "../utils/dataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const InputPage = () => {
  const navigate = useNavigate();
  const materialRef = useRef();
  const typeRef = useRef();
  const problemRef = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

//   const fetchResult = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//         const genAI = new GoogleGenerativeAI("AIzaSyBHzi6D89MaubaMz22W13MNn72LFtlMqaQ");

//         const model = genAI.getGenerativeModel({
//           model: "gemini-1.5-flash",
//           generationConfig: { responseMimeType: "application/json" }
//         });

//       const structuredPrompt = `
// [REMAINER TO RESPOND WITH VALID JSON ONLY]
// Create educational content as JSON with unique and efficient questions that test user knowledge at different levels of comprehension. Ensure the following:

// 1. Notes Section: 
//    - Provide 20-50 items, with a logical flow, describing the key concepts of the topic.
//    - Include 2-3 key points per item to aid recall.

// 2. Questions Section: 
//    - Create 30 total questions: 10 of each type: 
//      - **Multiple Choice** (to test recall),
//      - **Fill in the Blanks** (for concept understanding),
//      - **Short Essay** (for deep knowledge and explanation).
//    - Ensure questions gradually increase in difficulty. Start with **easy** ones, progressing to **medium** and **hard**.
//    - For **multiple-choice questions**, provide 4-5 options, and highlight one correct answer.
//    - For **fill-in-the-blank** and **short-essay questions**, keep them directly related to important concepts in the notes.
   
// 3. Difficulty Levels: 
//    - For each question, include a difficulty level (easy, medium, or hard) based on the user's potential understanding.
//    - Questions should progressively increase in difficulty, testing both recall and deeper understanding at various levels.
// 4. Requirements:
//    - **Topic focus**: ${problemRef.current?.value || "General concepts"}
//    - **Material context**: "${materialRef.current?.value.substring(0, 4000)}"

// 5. Output Format:
// {
//   "Notes": [
//     {
//       "topic_title": "string",
//       "description": "string (100-150 words)",
//       "key_points": ["string"]
//     }
//   ],
//   "Questions": [
//     {
//       "type": "multiple_choice|fill_blank|short_essay",
//       "question": "string",
//       "options": ["string"], 
//       "answer": "string",
//       "difficulty": "easy|medium|hard",
//       "marks": number
//     }
//   ]
// }

// - Ensure **unique** and **diverse** question generation.
// - Strictly adhere to valid JSON formatting.
// - No extra text, markdown, or formatting.
// `;

//       const result = await model.generateContent(structuredPrompt);
//       const data = JSON.parse(result.response.text());

//       console.log(data);

//       // Dispatching notes and questions to Redux store
//       dispatch(addNotes(data.Notes || []));
//       dispatch(addQuestions(data.Questions || []));

//       // Handling multiple-choice questions separately (if needed)
//       const multipleChoiceQuestions = data.Questions.filter(q => q.type === 'multiple_choice');
//       dispatch(addMultipleChoiceQuestions(multipleChoiceQuestions || []));

//       navigate('/notes');
//       materialRef.current.value = '';
//       typeRef.current.value = '';
//       problemRef.current.value = '';
      
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("An error occurred while fetching the data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
const fetchResult = async () => {
  setIsLoading(true);
  setError(null);

  try {
      const genAI = new GoogleGenerativeAI("AIzaSyBHzi6D89MaubaMz22W13MNn72LFtlMqaQ");

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

    const structuredPrompt = `
    [REMAINER TO RESPOND WITH VALID JSON ONLY]
    Create educational content as JSON with unique and efficient questions that test user knowledge at different levels of comprehension. Ensure the following:

    1. Notes Section: 
       - Provide 20-50 items, with a logical flow, describing the key concepts of the topic.
       - Include 2-3 key points per item to aid recall.

    2. Questions Section: 
       - Create 30 total questions: 10 of each type: 
         - **Multiple Choice** (to test recall),
         - **Fill in the Blanks** (for concept understanding),
         - **Short Essay** (for deep knowledge and explanation).
       - Ensure questions gradually increase in difficulty. Start with **easy** ones, progressing to **medium** and **hard**.
       - For **multiple-choice questions**, provide 4-5 options, and highlight one correct answer.
       - For **fill-in-the-blank** and **short-essay questions**, keep them directly related to important concepts in the notes.

    3. Difficulty Levels: 
       - For each question, include a difficulty level (easy, medium, or hard) based on the user's potential understanding.
       - Questions should progressively increase in difficulty, testing both recall and deeper understanding at various levels.
    4. Requirements:
       - **Topic focus**: ${problemRef.current?.value || "General concepts"}
       - **Material context**: "${materialRef.current?.value.substring(0, 4000)}"

    5. Output Format:
    {
      "Notes": [
        {
          "topic_title": "string",
          "description": "string (100-150 words)",
          "key_points": ["string"]
        }
      ],
      "Questions": [
        {
          "type": "multiple_choice|fill_blank|short_essay",
          "question": "string",
          "options": ["string"], 
          "answer": "string",
          "difficulty": "easy|medium|hard",
          "marks": number
        }
      ]
    }

    - Ensure **unique** and **diverse** question generation.
    - Strictly adhere to valid JSON formatting.
    - No extra text, markdown, or formatting.
    `;

    const result = await model.generateContent(structuredPrompt);
    const data = JSON.parse(result.response.text());

    console.log(data);

    // Dispatch notes and questions to Redux
    dispatch(addNotes(data.Notes || []));
    dispatch(addQuestions(data.Questions || []));

    // Handling multiple choice questions specifically
    const multipleChoiceQuestions = data.Questions.filter(q => q.type === "multiple_choice");
    multipleChoiceQuestions.forEach(question => {
      dispatch(addMultipleChoiceQuestion(question));  // Dispatch each multiple-choice question
    });

    navigate('/notes');
    materialRef.current.value = '';
    typeRef.current.value = '';
    problemRef.current.value = '';

  } catch (error) {
    console.error("Error fetching data:", error);
    setError("An error occurred while fetching the data. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className='flex justify-center items-center bg-gradient-to-b from-[#001D3D] to-[#003566] h-screen'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-[450px]'>
        <h1 className='text-[#003566] text-3xl font-extrabold text-center mb-6'>
          Mini-Me <span className="text-[#FFD60A]">- The AI Tutor</span>
        </h1>

        <form className='flex flex-col gap-4'>
          <label className='font-medium text-lg'>Type of Information</label>
          <input
            type='text'
            ref={typeRef}
            className='bg-gray-100 px-4 py-2 rounded-md w-full border-2 border-[#003566] focus:outline-none focus:ring-2 focus:ring-[#FFD60A]'
          />

          <label className='font-medium text-lg'>Input Data You'd Like to Learn</label>
          <textarea
            ref={materialRef}
            className='bg-gray-100 px-4 py-2 rounded-md w-full h-32 border-2 border-[#003566] focus:outline-none focus:ring-2 focus:ring-[#FFD60A]'
          />

          <label className='font-medium text-lg'>Problems You're Facing</label>
          <input
            type='text'
            ref={problemRef}
            className='bg-gray-100 px-4 py-2 rounded-md w-full border-2 border-[#003566] focus:outline-none focus:ring-2 focus:ring-[#FFD60A]'
          />

          {error && (
            <div className='text-red-500 text-center text-sm'>
              {error}
            </div>
          )}

          <button
            className='bg-[#FFD60A] text-[#003566] font-bold py-2 px-4 rounded-md w-full hover:bg-[#FFA500] transition duration-200'
            onClick={(e) => {
              e.preventDefault();
              fetchResult();
            }}
          >
            {isLoading ? "Generating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
