// pages/index.tsx
"use client";

import { CopilotKit } from "@copilotkit/react-core";
import {CopilotChat, CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function RootLayout({children}) {
    return (
        <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY}
                    transcribeAudioUrl="/api/transcribe"
                    textToSpeechUrl="/api/tts"
        >
            <div>Welcome to the Voice Assistant App!</div>
            <CopilotChat
                instructions={
                    "Help the user search the web"}
                labels={{
                    initial:
                        "Hi you! 👋 I can help you search the web on any topic.",
                }}
            >
                {/*{children}*/}
            </CopilotChat>
        </CopilotKit>
    );
}
