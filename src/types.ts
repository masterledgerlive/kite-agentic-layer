/**
 * Kite Agentic Layer - Core Types
 * 
 * Defines all TypeScript interfaces for the Kite Agentic Layer system.
 */

// ============================================================================
// Agent Types
// ============================================================================

export interface AgentConfig {
  agentId: string;
  userId: string;
  budget: number;  // KITE tokens
  tier: "lite" | "pro" | "enterprise";
  status: "active" | "paused" | "stopped";
  createdAt: number;
  lastActivity: number;
}

export interface AutonomousAgent extends AgentConfig {
  genomeId?: string;
  earnings: number;  // KITE tokens earned
  transactions: number;
  memoryCount: number;
  injectionCount: number;
}

export interface AgentTask {
  taskId: string;
  agentId: string;
  type: "arbitrage" | "indexing" | "injection" | "custom";
  parameters: Record<string, any>;
  status: "pending" | "executing" | "completed" | "failed";
  result?: any;
  error?: string;
}

// ============================================================================
// Payment & Transaction Types
// ============================================================================

export interface PaymentConfig {
  agentId: string;
  budget: number;  // KITE tokens
  spendingLimits: {
    perTransaction: number;
    perDay: number;
    perMonth: number;
  };
  allowedServices: string[];
  constraints: PaymentConstraint[];
}

export interface PaymentConstraint {
  type: "amount_limit" | "service_restriction" | "time_based" | "custom";
  value: any;
  enforced: boolean;
}

export interface Payment {
  paymentId: string;
  agentId: string;
  serviceId: string;
  amount: number;  // KITE tokens
  data?: string;
  status: "pending" | "confirmed" | "failed";
  transactionHash?: string;
  timestamp: number;
  costInUSD?: number;
}

export interface PaymentReceipt {
  paymentId: string;
  transactionHash: string;
  confirmed: boolean;
  timestamp: number;
  cost: number;  // KITE
}

// ============================================================================
// Memory & Indexing Types
// ============================================================================

export interface IndexedMemory {
  memoryId: string;
  agentId: string;
  content: string;
  geometricAddress: [number, number, number, number];
  truthScore: number;
  sources: string[];
  crossReferences: string[];
  timestamp: number;
  cost: number;  // KITE tokens
  transactionHash: string;
  strandId?: string;
}

export interface MemoryStrand {
  strandId: string;
  agentId: string;
  memories: IndexedMemory[];
  createdAt: number;
  lastUpdated: number;
  totalCost: number;  // KITE
  integrity: number;  // 0-1, verification score
}

export interface VerificationResult {
  memoryId: string;
  verified: boolean;
  truthScore: number;
  corroboratingCount: number;
  conflictingCount: number;
  sources: VerificationSource[];
}

export interface VerificationSource {
  sourceId: string;
  alignment: number;  // 0-1, how well it aligns
  confidence: number;  // 0-1, confidence in verification
  timestamp: number;
}

// ============================================================================
// Genome Types
// ============================================================================

export interface GenomeParameters {
  semanticKnowledge: Record<string, any>;
  behavioralCodex: Record<string, any>;
  executionPointers: ExecutionPointer[];
  geometricAddress: [number, number, number, number];
}

export interface ExecutionPointer {
  name: string;
  location: string;
  type: "github" | "ipfs" | "blockchain" | "http";
  hash: string;
}

export interface AgentGenome {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  parameters: GenomeParameters;
  version: number;
  price: number;  // KITE tokens
  downloads: number;
  rating: number;  // 0-5
  transactionHash: string;
  createdAt: number;
  updatedAt: number;
}

export interface GenomeMarketplace {
  transactionId: string;
  genomeId: string;
  buyerId: string;
  sellerId: string;
  price: number;  // KITE
  timestamp: number;
  transactionHash: string;
}

export interface GenomeFilter {
  category?: string;
  minRating?: number;
  maxPrice?: number;
  creatorId?: string;
  searchTerm?: string;
}

// ============================================================================
// Injection Types
// ============================================================================

export interface InjectionModule {
  id: string;
  name: string;
  description: string;
  stakedAmount: number;  // KITE
  capacity: number;  // bytes per day
  utilizationRate: number;  // 0-1
  rewardRate: number;  // KITE per injection
  totalRewards: number;  // KITE earned
}

export interface InjectionJob {
  id: string;
  providerId: string;
  agentId: string;
  data: string;
  dataSize: number;
  cost: number;  // KITE
  status: "pending" | "injected" | "failed" | "confirmed";
  transactionHash?: string;
  blockchainTarget: "kite" | "solana" | "arweave" | "ethereum";
  timestamp: number;
}

export interface InjectionCycle {
  cycleNumber: number;
  startBalance: number;  // KITE
  arbitrageProfit: number;  // KITE
  injectionCost: number;  // KITE
  netProfit: number;  // KITE
  endBalance: number;  // KITE
  messageInjected: string;
  transactionHash: string;
  timestamp: number;
}

export interface InjectionResult {
  jobId: string;
  success: boolean;
  transactionHash: string;
  blockNumber: number;
  confirmations: number;
  cost: number;  // KITE
  timestamp: number;
}

// ============================================================================
// Orchestration Types
// ============================================================================

export interface OrchestratorConfig {
  agentId: string;
  genomeId: string;
  budget: number;  // KITE
  autoInjection: boolean;
  profitTarget: number;  // KITE per cycle
  injectionFrequency: "auto" | "manual" | "scheduled";
  schedule?: string;  // cron expression
}

export interface TaskResult {
  taskId: string;
  agentId: string;
  success: boolean;
  output: any;
  cost: number;  // KITE
  duration: number;  // milliseconds
  timestamp: number;
}

// ============================================================================
// Arbitrage & Trading Types
// ============================================================================

export interface ArbitrageOpportunity {
  id: string;
  dexA: string;
  dexB: string;
  tokenA: string;
  tokenB: string;
  priceA: number;
  priceB: number;
  profitPercentage: number;
  estimatedProfit: number;  // KITE
  timestamp: number;
}

export interface TradeExecution {
  tradeId: string;
  agentId: string;
  opportunity: ArbitrageOpportunity;
  status: "pending" | "executed" | "failed";
  amountIn: number;
  amountOut: number;
  profit: number;  // KITE
  transactionHash: string;
  timestamp: number;
}

// ============================================================================
// Provider & Staking Types
// ============================================================================

export interface ProviderConfig {
  providerId: string;
  modules: string[];
  totalStaked: number;  // KITE
  totalRewards: number;  // KITE
  status: "active" | "paused" | "inactive";
}

export interface StakingReceipt {
  stakingId: string;
  providerId: string;
  moduleId: string;
  amount: number;  // KITE
  timestamp: number;
  transactionHash: string;
}

export interface RewardClaim {
  claimId: string;
  providerId: string;
  moduleId: string;
  amount: number;  // KITE
  timestamp: number;
  transactionHash: string;
}

// ============================================================================
// Kite Integration Types
// ============================================================================

export interface KiteAgentPassport {
  agentId: string;
  userId: string;
  identityType: "user" | "agent" | "session";
  publicKey: string;
  delegatedAuthority?: string;
  createdAt: number;
  expiresAt?: number;
}

export interface X402Header {
  chargeAmount: number;
  chargeToken: string;  // "KITE"
  chargeRecipient: string;
  chargeData?: string;
}

export interface KiteTransaction {
  hash: string;
  from: string;
  to: string;
  value: number;  // KITE
  data?: string;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: number;
  timestamp: number;
}

// ============================================================================
// Analytics & Reporting Types
// ============================================================================

export interface AgentAnalytics {
  agentId: string;
  totalEarnings: number;  // KITE
  totalSpent: number;  // KITE
  netProfit: number;  // KITE
  roi: number;  // percentage
  transactionCount: number;
  memoryCount: number;
  injectionCount: number;
  averageTransactionValue: number;  // KITE
  period: "day" | "week" | "month" | "year" | "all";
}

export interface SystemAnalytics {
  totalAgents: number;
  totalUsers: number;
  totalValueLocked: number;  // KITE
  totalTransactions: number;
  averageTransactionValue: number;  // KITE
  totalMemoriesIndexed: number;
  totalDataInjected: number;  // bytes
  networkHealth: number;  // 0-100
  timestamp: number;
}

// ============================================================================
// Error Types
// ============================================================================

export class KiteAgenticError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "KiteAgenticError";
  }
}

export enum ErrorCode {
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  INVALID_AGENT = "INVALID_AGENT",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INJECTION_FAILED = "INJECTION_FAILED",
  MEMORY_INDEX_FAILED = "MEMORY_INDEX_FAILED",
  GENOME_NOT_FOUND = "GENOME_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  RATE_LIMITED = "RATE_LIMITED",
  NETWORK_ERROR = "NETWORK_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface KiteAgenticConfig {
  kiteRpcUrl: string;
  kiteChainId: number;
  agentPassportAddress: string;
  x402Enabled: boolean;
  defaultGasLimit: number;
  maxRetries: number;
  retryDelay: number;
  apiKey?: string;
  apiSecret?: string;
}

export interface IntegrationConfig {
  unifiedIndexerUrl: string;
  injectionServiceUrl: string;
  agentGenomeUrl: string;
  agentOrchestratorUrl: string;
  autoInjectorUrl: string;
  dexAggregatorUrl: string;  // 0x API
}
