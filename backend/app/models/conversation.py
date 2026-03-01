from sqlalchemy import Column, Integer, String, DateTime, Float, Text, JSON, Enum, Boolean
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class ConversationTypeEnum(str, enum.Enum):
    VOICE = "voice"
    CHAT = "chat"
    EMAIL = "email"
    MEETING = "meeting"

class ConversationStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ESCALATED = "escalated"
    ABANDONED = "abandoned"

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    conversation_type = Column(Enum(ConversationTypeEnum))
    status = Column(Enum(ConversationStatus), default=ConversationStatus.ACTIVE)
    agent_id = Column(Integer, index=True)
    user_id = Column(Integer, index=True)
    organization_id = Column(Integer, index=True)
    
    # Content
    transcript = Column(Text)
    customer_message = Column(Text)
    agent_response = Column(Text)
    
    # Metadata
    duration = Column(Float)  # in seconds
    sentiment = Column(String)  # positive, negative, neutral
    intent = Column(String)  # customer intent
    resolution = Column(Boolean)  # was it resolved?
    
    # Recording
    recording_url = Column(String, nullable=True)
    recording_duration = Column(Float, nullable=True)
    
    # Context
    crm_data = Column(JSON)  # customer data from CRM
    context = Column(JSON)  # RAG context used
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ConversationMessage(Base):
    __tablename__ = "conversation_messages"
    
    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, index=True)
    role = Column(String)  # "user" or "assistant"
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    sentiment_score = Column(Float, nullable=True)
