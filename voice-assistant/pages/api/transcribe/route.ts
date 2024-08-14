// Import the OpenAI class from the openai library
import { OpenAI } from "openai";

// Uncomment this line if running the function in an edge environment
// export const runtime = "edge";

// Create an instance of the OpenAI client
const openai = new OpenAI();

// Define an asynchronous function to handle HTTP POST requests
export async function POST(req: Request): Promise<Response> {
    try {
        // Extract form data from the request
        const formData = await req.formData();
        // Retrieve the file from the form data, expected under the key "file"
        const file = formData.get("file") as File;

        // Check if the file is provided in the request
        if (!file) {
            // Return a 400 Bad Request response if the file is missing
            return new Response("File not provided", { status: 400 });
        }

        // Make an API call to OpenAI to transcribe the provided audio file
        const transcription = await openai.audio.transcriptions.create({
            file, // The audio file to transcribe
            model: "whisper-1", // The transcription model to use
        });

        // Return a 200 OK response with the transcription result as JSON
        return new Response(JSON.stringify(transcription), {
            status: 200,
            headers: { "Content-Type": "application/json" }, // Set the response content type to JSON
        });
    } catch (error: any) {
        // Handle any errors that occur during the request processing
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500, // Return a 500 Internal Server Error response
            headers: { "Content-Type": "application/json" }, // Set the response content type to JSON
        });
    }
}
