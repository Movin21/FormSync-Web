import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, AlertTriangle, Target, Compass,
  Layers, Code2, ChevronRight, Brain, Cpu, Shield, Zap, Database, TestTube2,
} from 'lucide-react';

/* ─── Animation ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Section data ──────────────────────────────────────────────── */
const SECTIONS = [
  /* ── 1. LITERATURE SURVEY ── */
  {
    id: 'literature',
    icon: BookOpen,
    color: 'from-brand-500 to-brand-700',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
    title: 'Literature Survey',
    subtitle: 'Review of existing research and state-of-the-art approaches',
    content: [
      {
        heading: 'Form Generation & Schema-Driven Development',
        body: 'Prior work on schema-driven development demonstrates significant productivity gains. JSON Schema (Draft-07) provides a standardised vocabulary for annotating and validating JSON documents. Tools such as FormKit, React Hook Form, and Formly offer schema-based form rendering, but lack AI-based semantic enrichment. Research by Brown et al. (2020) established that Large Language Models can generate syntactically correct code, yet hallucination rates in domain-specific generation remain a persistent challenge that must be mitigated through careful prompt engineering and invariant validation.',
      },
      {
        heading: 'Cross-Platform UI Generation',
        body: 'Cross-platform frameworks including React Native, Flutter, and Xamarin attempt to unify UI development. Existing form generators target single platforms. Academic literature highlights the absence of a unified schema-to-multiplatform generation pipeline that maintains design consistency and accessibility compliance across Web, iOS, and Android outputs simultaneously. This gap represents a clear opportunity for the FormSync platform.',
      },
      {
        heading: 'AI-Assisted Code Generation',
        body: 'Codex, GitHub Copilot, and similar models have shown promise in code-completion tasks. However, structured full-stack generation — spanning frontend forms, REST APIs, DTOs, and test cases — from a single declarative schema specification remains largely unexplored. The FormSync Schema Enhancement Engine directly addresses this by providing an AI-powered pipeline operating on top of a deterministic plugin architecture, ensuring reproducibility alongside AI-driven enrichment.',
      },
      {
        heading: 'Multi-Format Schema Processing',
        body: 'Enterprise systems produce schema definitions in heterogeneous formats: JSON (OpenAPI, JSON Schema), YAML (Kubernetes, Swagger), and XML (WSDL, XSD). No existing academic tool provides a unified parser pipeline that normalises all three into a single canonical schema (JSON Schema Draft-07) while preserving field semantics, constraints, and structural intent. The FormSync parser pipeline fills this gap using a plugin-based architecture.',
      },
    ],
  },

  /* ── 2. RESEARCH GAP ── */
  {
    id: 'gap',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'Research Gap',
    subtitle: 'Identified gaps that this research addresses',
    content: [
      {
        heading: 'No Unified End-to-End Generation Pipeline',
        body: 'No existing solution provides an end-to-end pipeline that accepts a single schema definition and produces cross-platform form components (Web + Mobile), backend APIs, data transfer objects, and automated test cases simultaneously. Existing tools solve fragments of the problem in isolation.',
      },
      {
        heading: 'Absence of AI Semantic Enrichment for Schemas',
        body: 'Current schema-based tools treat schemas as static configurations. The integration of LLMs for semantic field annotation, validation rule suggestion, and accessibility label generation has not been systematically explored or evaluated in the literature. The FormSync Schema Enhancement Engine operates on a human-in-the-loop suggestion model to address this.',
      },
      {
        heading: 'Lack of Deterministic Schema Quality Scoring',
        body: 'Existing generators lack measurable, reproducible quality metrics. There is no established framework for scoring schema structural completeness, validation coverage, accessibility compliance, constraint consistency, and AI enhancement impact on a unified 100-point scale.',
      },
      {
        heading: 'Insufficient Cross-Platform Consistency Guarantees',
        body: 'When generating UI components for multiple target platforms from a shared schema, maintaining visual and behavioural consistency is a largely unaddressed research problem. Existing tools either target a single platform or require significant manual reconciliation of generated code.',
      },
    ],
  },

  /* ── 3. RESEARCH PROBLEM ── */
  {
    id: 'problem',
    icon: Target,
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    title: 'Research Problem',
    subtitle: 'The core problem this project solves',
    content: [
      {
        heading: 'Problem Statement',
        body: 'Developing cross-platform digital forms and their associated backend infrastructure is repetitive, error-prone, and time-consuming. Developers must manually maintain consistency across multiple platforms, implement validation logic redundantly, and write boilerplate for APIs, DTOs, and tests. This increases development time, introduces inconsistencies, and creates high maintenance overhead — particularly in enterprise or academic data-collection systems.',
      },
      {
        heading: 'Research Question',
        body: 'Can an AI-powered, schema-driven generation system produce semantically correct, cross-platform form components, REST APIs, DTOs, and automated test cases from a unified JSON Schema specification — reducing developer effort while maintaining production quality standards and accessibility compliance?',
      },
      {
        heading: 'Hypothesis',
        body: 'Combining a deterministic multi-format parser pipeline with LLM-based semantic enhancement and a rule-based quality scoring engine will measurably improve schema completeness, reduce validation coverage gaps, and accelerate cross-platform form development compared to manual baseline development.',
      },
    ],
  },

  /* ── 4. OBJECTIVES ── */
  {
    id: 'objectives',
    icon: Compass,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    title: 'Research Objectives',
    subtitle: 'Key goals driving this research',
    content: [
      {
        heading: 'Objective 1 — AI-Powered Schema Enhancement Engine',
        body: 'Design and implement a NestJS microservice that semantically enriches JSON Schema definitions using LLM integration (GPT-4 / LLaMA 3.3). The engine must enforce a human-in-the-loop suggestion model — all AI improvements are presented as user-approvable suggestions, never auto-applied. A 2-enhancement-round limit prevents API over-consumption and diminishing returns.',
      },
      {
        heading: 'Objective 2 — Multi-Format Parser Pipeline',
        body: 'Develop a plugin-based parser pipeline that converts JSON, YAML, and XML schema definitions into canonical JSON Schema Draft-07. The pipeline must handle form definitions (Form/Field/Group structures), raw data samples, and existing schema documents, supporting enterprise heterogeneous input environments.',
      },
      {
        heading: 'Objective 3 — Deterministic Five-Dimensional Quality Scoring',
        body: 'Implement a rule-based, 100-point quality scoring engine covering: Structural Completeness (25pt), Validation Coverage (25pt), Accessibility Compliance (20pt), Consistency & Safety (20pt), and Enhancement Impact (10pt). Scoring must be deterministic and reproducible — no AI self-evaluation (avoiding circular dependency).',
      },
      {
        heading: 'Objective 4 — Cross-Platform Form Generation',
        body: 'Build a code generation pipeline producing consistent, accessible form components for React (Web), React Native (Mobile), and Flutter from a single enhanced schema. Generated components must include field validation, accessibility labels (WCAG 2.1), and conform to platform-specific UI conventions.',
      },
      {
        heading: 'Objective 5 — Backend Artifact Generation',
        body: 'Implement automated generation of Spring Boot REST API endpoints, DTOs, service interfaces, and OpenAPI specifications from schema definitions, ensuring the backend contract stays in sync with the frontend form structure.',
      },
      {
        heading: 'Objective 6 — Automated Test Case Generation',
        body: 'Build a test generation module that creates schema-aware unit, integration, and validation test cases with edge case coverage — covering boundary values, invalid inputs, and format violations identified from the schema constraints.',
      },
    ],
  },

  /* ── 5. METHODOLOGY ── */
  {
    id: 'methodology',
    icon: Layers,
    color: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    title: 'Methodology',
    subtitle: 'Research approach, system design, and implementation methodology',
    content: [
      {
        heading: 'Phase 1 — Requirements Analysis & Literature Review',
        body: 'Systematic literature review of schema-driven development, form generation tools, AI code generation, and cross-platform UI frameworks. Developer interview study (n=12) and schema corpus analysis used to define generation quality criteria and identify real-world pain points. Research gap formalised into the five-dimensional schema quality framework.',
      },
      {
        heading: 'Phase 2 — Microservices Architecture Design',
        body: 'FormSync is built as six independent microservices: Schema Enhancement Engine (NestJS, port 3010), API Gateway (port 3000), User Management Service (port 3011), Backend DTO Generator (port 3012), Runtime Binding Engine (port 3013), and FormGen Service (port 3014). Services communicate via REST APIs routed through the API Gateway. PostgreSQL is used for schema persistence with full version history.',
      },
      {
        heading: 'Phase 3 — Plugin Architecture Implementation',
        body: 'Three standardised plugin interfaces — FormatParserPlugin, SchemaValidatorPlugin, LLMProviderPlugin — enable swappable parsers, validators, and LLM providers without code changes. Parsers (JSON, YAML, XML), validators (Ajv JSON Schema Draft-07, WCAG 2.1 accessibility), and the OpenAI/Groq LLM provider are implemented as concrete plugin classes.',
      },
      {
        heading: 'Phase 4 — AI Prompt Engineering & Safety',
        body: 'The LLM system prompt (~4,000 tokens) enforces schema preservation (input returned unchanged), mandatory coverage of all fields, five quality dimensions, nine preservation rules protecting user-defined constraints (patterns, enums, formats, min/max values), and strict suggestion format (dot-notation paths, category, estimatedImpact 1–5). An invariant validator detects structural violations in LLM responses.',
      },
      {
        heading: 'Phase 5 — Evaluation',
        body: 'Mixed-methods evaluation: (1) Quantitative — generation accuracy, quality score improvement (pre/post AI enhancement), test coverage %, API response time benchmarks. (2) Qualitative — developer usability study (SUS questionnaire), expert code review panel. Baseline comparison against manual development time for equivalent deliverables.',
      },
    ],
  },

  /* ── 6. TECHNOLOGIES ── */
  {
    id: 'technologies',
    icon: Code2,
    color: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    title: 'Technologies Used',
    subtitle: 'Full technology stack powering the research implementation',
    content: null,
    technologies: [
      {
        category: 'Schema Enhancement Engine',
        items: ['NestJS 10', 'TypeScript 5', 'Groq LLaMA 3.3-70b', 'OpenAI GPT-4', 'Ajv (JSON Schema Draft-07)', 'Prisma ORM', 'PostgreSQL'],
      },
      {
        category: 'Frontend (Web)',
        items: ['React 18', 'Vite', 'Tailwind CSS 3', 'Framer Motion', 'React Router v6', 'Lucide Icons', "HTML", "Bootstrap" ],
      },
      {
        category: 'Backend Microservices',
        items: ['Spring Boot 3', 'Spring Cloud Gateway', 'Spring Data JPA', 'OpenAPI/Swagger', ".NET", "Node.js"],
      },
      {
        category: 'AI & LLM Integration',
        items: ['Groq API (LLaMA 3.3-70b-versatile)', 'OpenAI API', 'Prompt Engineering', 'JSON Schema structured output', 'Human-in-the-Loop HITL'],
      },
      {
        category: 'Testing & DevOps',
        items: ['Jest 29', 'ts-jest', 'Docker', 'Docker Compose', 'GitHub Actions CI/CD', 'Nginx', 'Postman'],
      },
    ],
  },

  /* ── 7. SCHEMA ENHANCEMENT ENGINE (DETAILED) ── */
  {
    id: 'schema-engine',
    icon: Brain,
    color: 'from-fuchsia-500 to-brand-600',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-100',
    title: 'Schema Enhancement Engine — Deep Dive',
    subtitle: 'Core microservice technical architecture and quality scoring methodology',
    content: [
      {
        heading: 'Component Overview',
        body: 'The Schema Enhancement Engine (SEE) is the intelligent processing hub of FormSync. It accepts raw schema definitions (JSON, YAML, or XML), parses them into normalised JSON Schema Draft-07, validates them for syntactic and semantic correctness, enhances them using LLM integration, and provides quantitative quality scoring. It exposes 14 REST endpoints on port 3010 within the microservices architecture.',
      },
      {
        heading: 'Multi-Format Parser Pipeline',
        body: 'Three parser plugin implementations — JsonParserPlugin, YamlParserPlugin, XmlParserPlugin — each implement the FormatParserPlugin interface with canParse(), parse(), and getSupportedFormats() methods. The JSON parser handles three distinct sub-cases: existing JSON Schema documents, Form/Field/Group definitions from the Template Builder, and raw JSON data samples (with smart type inference for email patterns, date formats, and numeric values).',
      },
      {
        heading: 'Two-Tier Quick Fix System',
        body: 'The SchemaSyntaxValidator implements a two-tier auto-repair system. Tier 1 (deterministic, instant): removes trailing commas, adds missing closing braces, fixes YAML colon spacing. Tier 2 (AI-powered): when deterministic fixes fail, the broken schema is sent to the LLM with strict "fix syntax only" instructions — no structural changes, no new fields. The fixed output is re-validated before returning. Response includes a confidence indicator: deterministic, ai, or manual.',
      },
      {
        heading: 'Five-Dimensional Quality Scoring (100pt)',
        body: 'The SchemaQualityEngine evaluates schemas across: (1) Structural Completeness 25pt — root type, non-empty properties, nested object/array definitions. (2) Validation Coverage 25pt — type-specific constraint coverage per field. (3) Accessibility Compliance 20pt — field description + x-accessibility label coverage. (4) Consistency & Safety 20pt — penalty-based, -2pts per violation (required fields missing in properties, empty enum arrays, pattern on non-string, minimum > maximum). (5) Enhancement Impact 10pt — auto-applied fixes (0–3pt) + user suggestion acceptance rate × 7pt.',
      },
      {
        heading: 'Human-in-the-Loop Suggestion Workflow',
        body: 'All AI improvements are presented as user-approvable suggestions — never auto-applied structurally. Each suggestion carries id (format: category-path-timestamp), path (dot-notation), category (validation/accessibility/structure/metadata), rule (JSON merge object), description, applied flag, impactedDimensions, and estimatedImpact (1–5). Apply/undo operations are purely deterministic (no LLM calls), using deep-clone and smart-merge logic. Invariant protection ensures user-defined constraints (patterns, enums, types, formats) are never overwritten.',
      },
      {
        heading: 'Academic Design Justifications',
        body: 'Human-in-the-loop model: per Amershi et al. (2019 ICSE) — ensures safety, auditability, and user trust in AI recommendations. Deterministic quality scoring: per ISO/IEC 25010 SQuaRE — avoids circular AI self-evaluation, ensures reproducibility and explainability. Plugin architecture: enables provider independence (GPT-4 ↔ LLaMA ↔ Claude), extensibility (new parsers, validators), and unit-test mockability. Boolean field validation: per ISO/IEC 11404 §8.1 — boolean is a two-valued primitive; type declaration constitutes complete domain validation.',
      },
    ],
  },
];

/* ─── Section Card ──────────────────────────────────────────────── */
const SectionCard = ({ section, index, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen ?? true);
  const Icon = section.icon;

  return (
    <motion.div variants={fadeUp} className={`rounded-2xl border ${section.border} bg-white shadow-card overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50/60 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`rounded-xl ${section.bg} p-3 flex-shrink-0`}>
            <Icon size={22} className="text-brand-600" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h2 className="text-lg font-bold text-neutral-900">{section.title}</h2>
            <p className="text-sm text-neutral-500 mt-0.5">{section.subtitle}</p>
          </div>
        </div>
        <ChevronRight
          size={18}
          className={`text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {/* Body */}
      {open && (
        <div className="px-6 pb-6">
          <div className={`h-px bg-gradient-to-r ${section.color} opacity-20 mb-6`} />

          {/* Text content */}
          {section.content && (
            <div className="space-y-5">
              {section.content.map((item) => (
                <div key={item.heading}>
                  <h3 className="text-sm font-semibold text-neutral-800 mb-1.5 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${section.color} inline-block flex-shrink-0`} />
                    {item.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 pl-3.5">{item.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Technology grid */}
          {section.technologies && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.technologies.map((cat) => (
                <div key={cat.category} className={`rounded-xl ${section.bg} border ${section.border} p-4`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────────── */
const DomainPage = () => (
  <div className="min-h-screen">
    {/* Page Header */}
    <section className="section-stripe py-16 border-b border-brand-100/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
            Research Domain
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Domain <span className="gradient-text">Overview</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
            A comprehensive exploration of the research domain — from foundational literature and identified gaps, to objectives, methodology, and a deep-dive into the Schema Enhancement Engine.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Sections */}
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="space-y-5"
        >
          {SECTIONS.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  </div>
);

export default DomainPage;
