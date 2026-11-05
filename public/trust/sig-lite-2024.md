# Standardized Information Gathering (SIG) Lite v2024 Questionnaire
## Vendor Assessment Package — RitualDev Studio (`ritualdev.in`)

**Vendor Name:** RitualDev Studio  
**Primary Domain:** `https://ritualdev.in`  
**Assessment Date:** November 2026  
**Security Operations Contact:** `security@ritualdev.in`  
**Official RFC 9116 Policy:** `https://ritualdev.in/.well-known/security.txt`  
**PGP Encryption Key:** `https://ritualdev.in/pgp-key.txt`  

---

### Executive Overview
RitualDev provides an enterprise security and governance suite for autonomous AI coding agents (Claude Code, Cursor, Windsurf, Devin, Antigravity). The core runtime components—**AgentShield**, **DBShield**, and **SkillPrism**—operate on a zero-data-retention, local-first paradigm. All system call sandboxing, prompt injection neutralization, secret substitution, and database query dry-runs execute strictly inside the customer's developer workstations or private air-gapped VPC clusters. Zero customer source code or environment variables are transmitted to or stored on multi-tenant cloud infrastructure.

---

### Section A: Enterprise Security Governance & Program
| Control ID | Assessment Question | Response | Implementation & Verification Details |
|---|---|---|---|
| **A.1** | Does the vendor maintain a formally documented and reviewed information security policy? | **Yes** | Maintained under RFC 9116, available at `ritualdev.in/trust` and `.well-known/security.txt`. |
| **A.2** | Is security leadership formally established? | **Yes** | Security Desk directed by co-founders Divyanshu Jethi and Sakshi Sharma (`security@ritualdev.in`). |
| **A.3** | Are code repositories protected by multi-factor authentication and strict branch protection? | **Yes** | 100% of repositories enforce mandatory 2FA, linear git histories, mandatory PR reviews, and `enforce_admins: true`. Direct pushes to `main` are blocked. |

---

### Section B: Data Protection & Zero-Data-Retention Architecture
| Control ID | Assessment Question | Response | Implementation & Verification Details |
|---|---|---|---|
| **B.1** | Does the vendor ingest, process, or store customer source code, API keys, or prompt telemetry? | **No** | Absolute Zero-Data-Retention. All regex matching, AST scanning, and kernel sandboxing run 100% locally on customer hardware. Packet captures verify 0 outbound bytes. |
| **B.2** | How are developer secrets and environmental tokens protected during agent execution? | **Yes** | Environment variables, `.env` files, and AWS/SSH credentials are intercepted at the OS kernel boundary (Linux Landlock/Bubblewrap, macOS Seatbelt, Windows AppContainer) and substituted with ephemeral AES-256-GCM synthetic surrogates. |
| **B.3** | How are database mutations validated before execution by autonomous agents? | **Yes** | DBShield wire protocol proxies isolate queries into two-phase dry-run transactions with real-time Slack/Teams approval webhooks. |

---

### Section C: Software Supply Chain & Vulnerability Management
| Control ID | Assessment Question | Response | Implementation & Verification Details |
|---|---|---|---|
| **C.1** | Are all published binaries and npm packages accompanied by SLSA provenance and SBOMs? | **Yes** | SLSA Level 3 build provenance signed via Sigstore cosign and GitHub Actions OIDC. CycloneDX and SPDX SBOM JSON artifacts attached to every release via `anchore/sbom-action`. |
| **C.2** | Are static analysis (SAST) and software composition analysis (SCA) automated? | **Yes** | GitHub CodeQL runs on every commit across all repositories. Dependabot and OpenSSF Scorecard (10/10) maintain continuous vulnerability triage. |
| **C.3** | What is the enterprise SLA for critical security vulnerabilities (P1)? | **Yes** | < 1 hour initial response (24/7/365 coverage), with engineering mitigations dispatched within 24–48 hours via GitHub Security Advisories. |

---

### Section D: Compliance & Regulatory Frameworks
- **SOC 2 Type II / ISO 27001:2022**: Technical controls 100% aligned and pre-mapped across CC1–CC8, A1, C1.
- **India DPDP Act 2023**: Zero personal data fiduciary exposure due to local-first processing.
- **EU GDPR (Regulation 2016/679)**: Article 32 compliance through hardware-isolated surrogate token vaults.
- **US Executive Order 14028 & NIST SP 800-218**: Fully compliant via automated cryptographic SBOMs and SLSA Level 3 provenance.
