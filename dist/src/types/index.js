"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryType = exports.InteractionType = exports.LeadStatus = void 0;
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["NEW"] = "NEW";
    LeadStatus["QUALIFYING"] = "QUALIFYING";
    LeadStatus["QUALIFIED"] = "QUALIFIED";
    LeadStatus["NURTURING"] = "NURTURING";
    LeadStatus["BOOKED"] = "BOOKED";
    LeadStatus["ESCAlATED"] = "ESCAlATED";
    LeadStatus["DISQUALIFIED"] = "DISQUALIFIED";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
var InteractionType;
(function (InteractionType) {
    InteractionType["VOICE_CALL"] = "VOICE_CALL";
    InteractionType["SMS"] = "SMS";
    InteractionType["EMAIL"] = "EMAIL";
    InteractionType["FORM_SUBMISSION"] = "FORM_SUBMISSION";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
var MemoryType;
(function (MemoryType) {
    MemoryType["SHORT_TERM"] = "SHORT_TERM";
    MemoryType["LONG_TERM"] = "LONG_TERM";
    MemoryType["EPISODIC"] = "EPISODIC";
    MemoryType["SEMANTIC"] = "SEMANTIC";
    MemoryType["SYSTEM"] = "SYSTEM";
    MemoryType["SESSION"] = "SESSION";
    MemoryType["PERSISTED"] = "PERSISTED";
})(MemoryType || (exports.MemoryType = MemoryType = {}));
//# sourceMappingURL=index.js.map