# Week 9 Launch Pack: AgentShield & DBShield

## 🚀 Show HN Submission

**Title**: Show HN: AgentShield & DBShield – Sub-0.10ms Linux eBPF Sandbox & Instant SQL Rollback for AI Agents

**URL**: https://ritualdev.in/benchmarks (or https://github.com/RitualDev-Lab/AgentShield)

**Body**:
Hey HN! We're the team behind RitualDev Lab.

As autonomous AI coding agents (Claude Code, Windsurf, Cursor, OpenHands) gain access to local shells, git workspaces, and production databases, standard prompt-level guardrails are falling short:
1. They add 200ms–600ms latency to every single tool step.
2. They cannot intercept raw OS syscalls (e.g. `clone3`, `unshare`, `/proc/kcore` memory dumps).
3. They cannot prevent destructive SQL mutations once a database TCP packet leaves the agent.

To solve this, we built and open-sourced **AgentShield** and **DBShield**:

- **AgentShield**: A sub-0.10ms Linux eBPF CO-RE runtime sandbox. By pooling pre-forked Zygote processes and enforcing seccomp/Landlock filesystem bounds, it intercepts unauthorized syscalls and network egress (including AWS/GCP IMDS `169.254.169.254`) with **<0.09ms P99 overhead**.
- **DBShield**: A wire-level SQL defense proxy. It intercepts database streams in detached lock-free dry-runs. When an agent emits an unconstrained `DROP TABLE`, `TRUNCATE`, or bulk `UPDATE` without `WHERE`, DBShield executes an immediate zero-lock **ROLLBACK** before data is committed.

We also benchmarked both against 500 standardized attack vectors in our open-source Agent Security Benchmarks (ASB) suite:
- AgentShield + DBShield: **100% block rate** at **<0.09ms P99 latency**.
- LlamaGuard 3 (8B): **41.8% block rate** at **314ms latency**.
- NeMo Guardrails: **53.6% block rate** at **217ms latency**.

You can run the 500-vector benchmark locally:
```bash
git clone https://github.com/RitualDev-Lab/awesome-ai-agent-security.git
cd awesome-ai-agent-security/benchmarks
npm test
```

Try the CLI in 10 seconds:
```bash
npx @ritualdev-lab/agentshield init
```

We would love your thoughts on our eBPF and wire proxy architecture!

---

## 🏆 Product Hunt Launch Kit

**Tagline**: Zero-overhead Linux kernel sandbox & wire SQL rollback for AI agents
**Pricing**: Free Open Source Community ($0) / Enterprise Air-Gapped Private VPC ($25k–$50k/yr)

**First Maker Comment**:
Hey hunters! 👋

We built AgentShield and DBShield because we love autonomous coding agents, but we were terrified of running them with full shell and database privileges on our production machines.

Instead of adding slow LLM classifiers that can be jailbroken with clever roleplay, we went down to the Linux kernel and TCP wire:
1. **eBPF CO-RE Probes**: Block unauthorized filesystem traversal and IMDS token theft at the kernel boundary.
2. **Wire Rollback**: Guarantee zero data loss when agents hallucinate database migrations.
3. **<0.10ms Latency**: 1000x faster than secondary LLM guardrails.

All core components are open source on GitHub. Check out the live benchmark matrix at https://ritualdev.in/benchmarks!
