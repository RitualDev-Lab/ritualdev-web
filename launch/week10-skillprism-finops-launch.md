# Week 10 Launch Pack: SkillPrism Token FinOps

## 🚀 Show HN Submission

**Title**: Show HN: SkillPrism – 98% Prompt Token Compaction with Stacked Prompt Caching & OTel Metrics

**URL**: https://ritualdev.in/finops-calculator (or https://github.com/RitualDev-Lab/SkillPrism)

**Body**:
Hey HN!

As autonomous agent workflows become multi-step and multi-agent, token bills explode exponentially. Agents routinely dump 30,000 to 80,000 tokens of tool schemas, AST snippets, and environment context into every single turn.

We built **SkillPrism** to solve LLM token FinOps from first principles:

1. **JIT Semantic Pruning**: Identifies the exact tool schemas and context slices required for the active turn, pruning 80%+ of unused token bloat.
2. **Native Prompt Cache Stacking**: Injects Anthropic ephemeral `cache_control` breakpoints and OpenAI deterministic prefix sorting on top of the pruned context.
3. **98%+ Real-World Reduction**: Compresses typical 40,000-token tool contexts down to **25 effective billable tokens** on cache hits.
4. **OpenTelemetry FinOps Exporter**: Exports Prometheus metrics and OTLP JSON (`tokens_compacted_total`, `compute_dollars_saved`, `p99_latency_ms`) directly to Datadog and Grafana.
5. **HA Redis Sentinel**: 3-AZ clustering for sub-10ms semantic routing across agent clusters.

We also built an interactive FinOps ROI calculator where you can model your exact agent fleet savings:
https://ritualdev.in/finops-calculator

CLI 1-liner:
```bash
npx @ritualdev-lab/skillprism init
```

Check it out on GitHub: https://github.com/RitualDev-Lab/SkillPrism

---

## 🏆 Product Hunt Launch Kit

**Tagline**: 98%+ prompt token reduction with stacked caching & FinOps telemetry
**Target Persona**: VPs of Engineering, FinOps leaders, and AI agent developers.
