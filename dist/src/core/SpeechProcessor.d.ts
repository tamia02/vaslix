export interface SpeechProcessor {
    /**
     * Converts audio input to structured text.
     */
    audioToText(audioData: Buffer): Promise<string>;
    /**
     * Converts structured text to audio output.
     */
    textToAudio(text: string): Promise<Buffer>;
}
/**
 * Placeholder for Deepgram or OpenAI Whisper integration.
 */
export declare class DefaultSpeechProcessor implements SpeechProcessor {
    audioToText(audioData: Buffer): Promise<string>;
    textToAudio(text: string): Promise<Buffer>;
}
