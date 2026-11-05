# Formal Enterprise Service Level Agreement (SLA)
## RitualDev Studio (`ritualdev.in`)

**Effective Date:** November 2026  
**Support Desk:** `support@ritualdev.in`  
**Security Incident Response:** `security@ritualdev.in`  

---

### 1. Service Level Commitments
RitualDev provides guaranteed support and security response timelines tailored to enterprise deployments of AgentShield, DBShield, and private VPC infrastructure clusters.

| Severity Level | Description | Initial Response Target | Patch / Workaround Target | Coverage Window |
|---|---|---|---|---|
| **P1 - Critical** | Catastrophic security breach, zero-day kernel escape, or complete fleet lockup. | **< 1 hour** | **< 12 hours** | 24/7/365 Continuous |
| **P2 - High** | Major functional degradation or false-positive rate impeding engineering teams. | **< 4 hours** | **< 24 hours** | 24/7/365 Continuous |
| **P3 - Medium** | Non-critical bug, documentation clarification, or integration query. | **< 1 business day** | Next release cycle | Mon–Fri (09:00–18:00 UTC) |

---

### 2. Uptime & Local Autonomy Guarantee
Because AgentShield and DBShield operate on a local-first, zero-cloud dependency architecture, customer runtime environments maintain **100% operational autonomy** even in the event of external cloud or network outages. For managed private VPC synchronization and Redis hubs, RitualDev guarantees a **99.95% monthly service availability**.

---

### 3. Service Credits
If RitualDev fails to meet the guaranteed P1 response or private VPC uptime targets within a billing month, the Customer shall be eligible for Service Credits according to the following schedule:
- **< 99.95% to 99.0% Availability / P1 Miss:** 10% credit of monthly billing tier.
- **< 99.0% to 95.0% Availability / P1 Miss > 2h:** 25% credit of monthly billing tier.
- **< 95.0% Availability:** 50% credit of monthly billing tier.

---

### 4. Enterprise Security & Vulnerability Remediation
All reported Common Vulnerabilities and Exposures (CVEs) affecting AgentShield, DBShield, or SkillPrism are triaged within 4 hours. Mitigations are published as signed SLSA Level 3 packages accompanied by updated CycloneDX/SPDX SBOMs.
