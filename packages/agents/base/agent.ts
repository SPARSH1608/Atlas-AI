export interface AgentContext {
    requestId: string;
    userId?: string;
  }
  
  export interface AgentMeta {
    agentName: string;
    agentVersion: string;
    executionTimeMs: number;
    confidence: number;
  }
  
  export interface AgentResult<T> {
    data: T;
    meta: AgentMeta;
    warnings?: string[];
  }
  
  export interface Agent<TInput, TOutput> {
    run(
      input: TInput,
      context: AgentContext
    ): Promise<AgentResult<TOutput>>;
  }
  