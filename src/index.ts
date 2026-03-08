import 'dotenv/config';
import express from 'express';
import { ConversationEngine } from './core/ConversationEngine';
import { ActionDispatcher } from './core/ActionDispatcher';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import { z } from 'zod';

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Event Schemas
const IncomingCallSchema = z.object({
    callSid: z.string().optional(),
    from: z.string(),
    to: z.string(),
});

const OutboundTaskSchema = z.object({
    leadId: z.string(),
    phone: z.string(),
});

const SpeechInputSchema = z.object({
    sessionId: z.string(),
    text: z.string(),
});

// Rate Limiter for Event Endpoints
const eventLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Basic Security Middleware for Event Endpoints
const validateApiKey = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
    next();
};

const conversationEngine = new ConversationEngine();
const actionDispatcher = new ActionDispatcher();


app.get('/', (req, res) => {
    res.status(200).send({
        status: "online",
        message: "Thunder Core Agent is operational",
        endpoints: ["/events/incoming-call", "/events/outbound-task", "/events/speech-input"]
    });
});

/**
 * Event Trigger: Incoming Call
 */
app.post('/events/incoming-call', eventLimiter, validateApiKey, async (req, res) => {
    const validation = IncomingCallSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid payload', details: validation.error.format() });
    }
    const { callSid, from, to } = validation.data;
    const sessionId = callSid || uuidv4();

    console.log(`Received incoming call event`);

    // Initial greeting processing
    const { response, actionRequested } = await conversationEngine.processInput(sessionId, "HELLO");

    if (actionRequested) {
        await actionDispatcher.dispatch(actionRequested, { sessionId, from, to });
    }

    res.status(200).send({
        message: "Call event acknowledged",
        initialResponse: response
    });
});

/**
 * Event Trigger: Outbound Call Task
 */
app.post('/events/outbound-task', eventLimiter, validateApiKey, async (req, res) => {
    const validation = OutboundTaskSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid payload', details: validation.error.format() });
    }
    const { leadId, phone } = validation.data;
    console.log(`Initiating outbound call task for lead ${leadId} at ${phone}`);
    // Trigger voice API here
    res.status(200).send({ message: "Outbound call initiated" });
});

/**
 * Event Trigger: Webhook for Speech Input
 */
app.post('/events/speech-input', eventLimiter, validateApiKey, async (req, res) => {
    const validation = SpeechInputSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid payload', details: validation.error.format() });
    }
    const { sessionId, text } = validation.data;

    const { response, actionRequested } = await conversationEngine.processInput(sessionId, text);

    if (actionRequested) {
        await actionDispatcher.dispatch(actionRequested, { sessionId });
    }

    res.status(200).send({
        response,
        actionRequested
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Thunder Core Agent listening on port ${PORT}`);
});
