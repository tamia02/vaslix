from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean, Enum, Float
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class AgentStatus(str, enum.Enum):
    ACTIVE = "active"
    IDLE = "idle"
    BUSY = "busy"
    OFFLINE = "offline"

class Agent(Base):
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, index=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)  # "voice", "chat", "email", "meeting"
    
    # Configuration
    system_prompt = Column(String)  # Agent's instruction/personality
    model = Column(String, default="gpt-4o")  # LLM model to use
    temperature = Column(Float, default=0.7)  # LLM creativity
    
    # Knowledge Base
    knowledge_base_id = Column(Integer, nullable=True)
    retrieval_settings = Column(JSON)  # RAG configuration
    
    # Integration
    crm_integration = Column(String, nullable=True)  # salesforce, hubspot, etc
    crm_config = Column(JSON, nullable=True)
    
    # Status
    status = Column(Enum(AgentStatus), default=AgentStatus.IDLE)
    is_active = Column(Boolean, default=True)
    
    # Stats
    total_conversations = Column(Integer, default=0)
    avg_sentiment = Column(Float, default=0)
    resolution_rate = Column(Float, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
