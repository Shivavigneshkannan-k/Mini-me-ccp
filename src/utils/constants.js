import { SchemaType } from "@google/generative-ai";

export const schema = {
  description: "Structured Schema for Study Material",
  type: "object",
  properties: {
    subject: {
      type: "string",
      description: "Name of the subject"
    },
    units: {
      type: "array",
      items: {
        type: "object",
        properties: {
          unitName: { type: "string",maxLength: 500 },
          topics: {
            type: "array",
            items: {
              type: "object",
              properties: {
                topicName: { type: "string" },
                description: { type: "string" }
              }
            }
          },
          questions: {
            type: "object",
            properties: {
              "2Q": {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    answer: { type: "string" }
                  }
                }
              },
              "4Q": {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    answer: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
