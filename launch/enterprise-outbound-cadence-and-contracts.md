# Enterprise Outbound Motion & Private VPC Pilot Contracts ($25k–$50k/yr)

This document contains the complete outbound sales cadences, legal contract agreements, and compliance trust package for closing $25k–$50k/yr Enterprise Private VPC contracts.

---

## 🎯 Part 1: Dual-Persona Outbound Sales Cadence

### Persona A: VP of Engineering / Head of FinOps
**Pain Point**: Exploding LLM token bills from multi-agent coding loops and long CI build times in monorepos.

#### Email 1 (Day 1): The Empirical FinOps Angle
**Subject**: Cutting 98% of your autonomous agent prompt token bill
**Body**:
> Hi {{firstName}},
>
> Noticed your team at {{company}} is standardizing on autonomous coding agents (Claude Code / Cursor / Windsurf).
>
> Most engineering orgs running 50+ agents are seeing LLM inference bills surge past $15,000–$40,000/mo because agents repeatedly dump 40k+ tokens of raw tool schemas and git context into every turn.
>
> We built **SkillPrism** to stack JIT semantic tool pruning with native Anthropic/OpenAI prompt caching. Across our production fleets, we consistently achieve a **98%+ billable prompt token reduction** ($40k context compressed to 25 effective billable tokens) with sub-10ms latency.
>
> I modeled your team's potential savings on our live FinOps ROI Calculator here:
> https://ritualdev.in/finops-calculator
>
> Would you be open to a 15-minute briefing on deploying our dedicated VPC cluster in your cloud?
>
> Best,  
> Alex Rivera  
> Enterprise Solutions, RitualDev Lab  
> alex@ritualdev.in

#### Email 2 (Day 4): The Benchmark Proof & Monorepo Cache
**Subject**: Re: Cutting 98% of your autonomous agent prompt token bill
**Body**:
> Hi {{firstName}},
>
> Following up with the empirical benchmark: In our latest evaluation across 500 standardized workloads, SkillPrism saved $34,200/mo on a 5,000 req/day agent fleet while exporting full OpenTelemetry FinOps metrics (`compute_dollars_saved`, `tokens_compacted_total`) directly into Datadog.
>
> In addition, our unified suite bundles **Poly Cloud Cache**, accelerating monorepo builds by 6.4x via shared remote S3/R2 caching.
>
> We offer a turnkey **60-Day Dedicated VPC Pilot ($25,000/yr)** where 100% of pilot fees are credited towards your annual license.
>
> Open to seeing a live architecture demo on Thursday?
>
> Best,  
> Alex

---

### Persona B: Chief Information Security Officer (CISO) / VP DevSecOps
**Pain Point**: Autonomous agents executing unchecked terminal commands, leaking AWS/GCP IMDS metadata, and running unconstrained SQL queries against production databases.

#### Email 1 (Day 1): The Kernel Sandbox & Zero-Rollback Angle
**Subject**: Zero-overhead eBPF sandboxing for {{company}}'s AI coding agents
**Body**:
> Hi {{firstName}},
>
> As {{company}} evaluates autonomous coding agents with shell and database privileges, how are you enforcing runtime guardrails at the OS syscall and SQL wire level?
>
> Secondary LLM guardrails (LlamaGuard, NeMo) add 300ms+ latency and cannot intercept raw OS syscalls (`clone3`, `unshare`) or prevent destructive database migrations once TCP packets leave the agent.
>
> We built **AgentShield & DBShield**:
> - **AgentShield**: Linux eBPF CO-RE runtime isolation with **<0.10ms P99 overhead**, strictly blocking path traversal, environment sniffing, and cloud IMDS (`169.254.169.254`) egress.
> - **DBShield**: Wire-level SQL proxy executing **guaranteed immediate ROLLBACK** on unconstrained `DROP TABLE`, `TRUNCATE`, or bulk `UPDATE` statements.
>
> In our 500-vector Agent Security Benchmark (ASB), AgentShield achieved a **100% block rate**, compared to 41.8% for LlamaGuard 3:
> https://ritualdev.in/benchmarks
>
> We provide pre-compiled SOC 2 Type II, ISO 27001, and SIG Lite 2026 trust packages for deployment in your air-gapped VPC.
>
> Do you have 15 minutes this week to review the architecture?
>
> Best,  
> Marcus Vance  
> Head of Security Solutions, RitualDev Lab  
> security@ritualdev.in

---

## 📜 Part 2: Enterprise Commercial Pilot Agreement (SOW)

### Commercial Pilot Statement of Work (SOW #RIT-2026-VPC)
**Effective Date**: [EffectiveDate]  
**Provider**: RitualDev Lab Inc. ("Provider")  
**Customer**: [CustomerName] ("Customer")  

#### 1. Scope & Architecture
Provider shall deploy a single-tenant, air-gapped **RitualDev Enterprise Governance Suite** inside Customer's designated cloud account (AWS, GCP, Azure, or on-premises Kubernetes). The deployment includes:
- **AgentShield Kernel DaemonSet**: Linux eBPF CO-RE syscall containment and persistent Zygote process pool.
- **DBShield Wire Defense Proxy**: Detached dry-run SQL engine with automatic rollback.
- **SkillPrism FinOps Gateway**: 98%+ prompt token compaction with OpenTelemetry exporter.
- **Poly Cloud API**: High-throughput remote build cache service.

#### 2. Service Level Agreements (SLAs)
- **Runtime Latency**: Sandbox intercept overhead shall not exceed **0.10ms P99**.
- **Data Sovereignty**: 100% air-gapped. Zero prompts, source code, or database rows shall leave Customer's VPC boundary.
- **Uptime**: 99.9% uptime during the 60-day pilot window.

#### 3. Commercial Fees & Conversion Terms
- **Pilot Term**: Sixty (60) days from deployment completion.
- **Pilot Investment**:
  - **Option 1 (Team VPC Pilot)**: $25,000 USD (up to 100 concurrent agents).
  - **Option 2 (Enterprise Air-Gapped VPC Pilot)**: $50,000 USD (unlimited agents, CMEK encryption, custom SIEM integration).
- **Annual Conversion Credit**: One hundred percent (100%) of the Pilot Investment shall be credited directly toward Customer's Year 1 Master Services Agreement upon contract execution before Day 60.

#### 4. Compliance & Trust Package
Provider certifies that the software complies with:
- **SOC 2 Type II**: CC6.1, CC6.6, CC6.8, CC7.1, CC7.2.
- **ISO/IEC 27001:2022**: Annex A.8.20, A.8.24, A.8.28.
- **SIG Lite 2026**: Fully pre-filled questionnaire provided upon signature.

**IN WITNESS WHEREOF**, the parties have executed this Pilot Agreement.

**Customer**:  
Signature: __________________________  
Name: _______________________________  
Title: ______________________________  
Date: _______________________________  

**RitualDev Lab Inc.**:  
Signature: __________________________  
Name: _______________________________  
Title: Chief Commercial Officer  
Date: _______________________________  
