"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const ConversationEngine_1 = require("./core/ConversationEngine");
const ActionDispatcher_1 = require("./core/ActionDispatcher");
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const conversationEngine = new ConversationEngine_1.ConversationEngine();
const actionDispatcher = new ActionDispatcher_1.ActionDispatcher();
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
app.post('/events/incoming-call', async (req, res) => {
    const { callSid, from, to } = req.body;
    const sessionId = callSid || (0, uuid_1.v4)();
    console.log(`Received incoming call event from ${from} to ${to}`);
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
app.post('/events/outbound-task', async (req, res) => {
    const { leadId, phone } = req.body;
    console.log(`Initiating outbound call task for lead ${leadId} at ${phone}`);
    // Trigger voice API here
    res.status(200).send({ message: "Outbound call initiated" });
});
/**
 * Event Trigger: Webhook for Speech Input
 */
app.post('/events/speech-input', async (req, res) => {
    const { sessionId, text } = req.body;
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
//# sourceMappingURL=index.js.map