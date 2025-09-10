'use server';

import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse:[{
    serverData:{
        userId:string;
        file:{
            url:string;
            name:string;
        };
    };
}]){
    if(!uploadResponse){
        return{success: false,
            message: 'File upload failed',
            data: null,
        };
    }
    const {
        serverData:{
            userId,
            file:{url:pdfUrl,name: fileName},
        },
    } = uploadResponse[0];

    if(!pdfUrl){
        return{
            success: false,
            message: 'File URL is missing',
            data: null,
        };
    }

    try{
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({pdfText});
        let summary;
        try{
            summary = await generateSummaryFromOpenAI(pdfText);
            console.log({summary});

        } catch(error){
            console.log(error)
            // call gemini 
            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try{
                    summary = await generateSummaryFromGeminiAI(pdfText);
                    console.log({summary});
                } catch(geminiError){
                    console.error("Gemini Ai failed after OpenAI quota exceeded",geminiError);
                } 
                throw new Error('Both OpenAI and Gemini AI services failed.');

            }

        }
        if(!summary){
            return{
                success: false,
                message:'Failed to generate summary',
                data:null,
            }
        }
        // Add this return for success!
        return {
            success: true,
            message: 'Summary generated successfully',
            data: summary,
        };
    }


    catch(error){
        return{
            success: false,
            message: 'Error generating summary',
            data: null,
        };
    }
}