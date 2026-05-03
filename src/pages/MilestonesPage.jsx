import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

/* ─── Milestones Data ───────────────────────────────────────────── */
const MILESTONES = [
  {
    id: 'proposal',
    title: 'Proposal',
    date: '2025-09-19',
    submissionDate: null,
    marks: 87,
    maxMarks: 100,
    status: 'completed',
    description:
      'Initial project proposal covering the research problem, objectives, methodology, and timeline. Each team member submitted an individual proposal report. Evaluated by the supervisor and panel.',
    checklist: [
      'Research problem identified & formalised',
      'Literature survey completed',
      'Research objectives defined',
      'Methodology outlined',
      'Timeline & work breakdown proposed',
      'Individual proposal reports submitted (4 members)',
    ],
    feedback:
      'Strong problem statement and clear objectives. Methodology section needs more detail on evaluation metrics. Literature survey should include more recent LLM-related work.',
  },
  {
    id: 'progress1',
    title: 'Progress Presentation 1',
    date: '2026-01-05',
    submissionDate: null,
    marks: 83,
    maxMarks: 100,
    status: 'completed',
    description:
      'First progress evaluation covering the completed literature review, research gap analysis, system architecture design, and initial prototyping. Evaluated through presentation to the panel.',
    checklist: [
      'Literature survey finalised',
      'Research gap documented',
      'Microservices architecture designed',
      'Technology stack confirmed',
      'Initial prototype demonstrated (parser pipeline)',
    ],
    feedback:
      'Architecture design is comprehensive. Need to accelerate implementation to meet timeline. Good presentation delivery. Expand on quality scoring methodology in next submission.',
  },
  {
    id: 'progress2',
    title: 'Progress Presentation 2',
    date: '2026-03-09',
    submissionDate: null,
    marks: 79,
    maxMarks: 100,
    status: 'completed',
    description:
      'Second progress presentation showcasing core implementation milestones, live system demo of the Schema Enhancement Engine, and preliminary evaluation results.',
    checklist: [
      'Schema Enhancement Engine core modules implemented',
      'Multi-format parser pipeline functional (JSON, YAML, XML)',
      'AI suggestion workflow demonstrated',
      'Five-dimensional quality scoring engine validated',
      'Preliminary cross-platform form generation shown',
    ],
    feedback:
      'Demo was impressive — the quality scoring system is well-designed. Evaluation section needs stronger statistical analysis. Add comparison with baseline approaches.',
  },
  {
    id: 'final',
    title: 'Final PP & Viva',
    date: '2026-05-04',
    submissionDate: null,
    marks: null,
    maxMarks: 100,
    status: 'upcoming',
    description:
      'Final project presentation and viva voce examination. Includes complete system demonstration, research paper submission, comprehensive evaluation results, and an oral defence of the research findings before the examination panel.',
    checklist: [
      'Complete system implemented & deployed',
      'Research paper submitted',
      'Full evaluation study completed',
      'All documentation finalised',
      'Research poster prepared',
      'Research contributions clearly articulated',
      'Technical Q&A preparation completed',
      'Live demo environment ready',
      'Presentation rehearsed',
    ],
    feedback: null,
  },
];

/* ─── Status config ─────────────────────────────────────────────── */
const STATUS_CONFIG = {
  completed: { label: 'Completed', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2, dot: 'bg-emerald-500' },
  upcoming:  { label: 'Upcoming',  color: 'text-amber-700 bg-amber-50 border-amber-200',       icon: Clock,          dot: 'bg-amber-400'  },
  missed:    { label: 'Missed',    color: 'text-red-700 bg-red-50 border-red-200',              icon: AlertCircle,    dot: 'bg-red-500'    },
};

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* ─── Milestone Card ────────────────────────────────────────────── */
const MilestoneCard = ({ milestone, index }) => {
  const [open, setOpen] = useState(false);
  const cfg      = STATUS_CONFIG[milestone.status];
  const CfgIcon  = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < MILESTONES.length - 1 && (
        <div className="absolute left-[18px] top-full w-0.5 h-5 bg-gradient-to-b from-brand-200 to-transparent z-0" />
      )}

      <div className="relative z-10 rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            {/* Step circle */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-brand-500 to-indigo-600 shadow-[0_4px_12px_rgba(168,85,247,0.30)]">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-neutral-900">{milestone.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <Calendar size={11} />{formatDate(milestone.date)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 ml-3">
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={18} className="text-neutral-400" />
            </motion.div>
          </div>
        </button>

        {/* Expanded body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5">
                <div className="h-px bg-gradient-to-r from-brand-200 to-indigo-200 mb-5" />
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Description + feedback */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Description</h3>
                      <p className="text-sm leading-relaxed text-neutral-600">{milestone.description}</p>
                    </div>
                    {milestone.submissionDate && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Submitted</h3>
                        <p className="text-sm text-neutral-600">{formatDate(milestone.submissionDate)}</p>
                      </div>
                    )}
                    {milestone.feedback && (
                      <div className="rounded-xl bg-brand-50 border border-brand-100 p-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1.5">Supervisor Feedback</h3>
                        <p className="text-sm leading-relaxed text-neutral-700">{milestone.feedback}</p>
                      </div>
                    )}
                  </div>

                  {/* Checklist + score bar */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Deliverables</h3>
                    <ul className="space-y-2">
                      {milestone.checklist.map((item, ci) => (
                        <li key={ci} className="flex items-start gap-2 text-sm text-neutral-700">
                          <CfgIcon
                            size={15}
                            className={`mt-0.5 flex-shrink-0 ${milestone.status === 'completed' ? 'text-emerald-500' : 'text-amber-400'}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Summary stats ─────────────────────────────────────────────── */
const completed = MILESTONES.filter((m) => m.status === 'completed');

/* ─── Page ──────────────────────────────────────────────────────── */
const MilestonesPage = () => (
  <div className="min-h-screen">
    {/* Header */}
    <section className="section-stripe py-16 border-b border-brand-100/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
            Project Timeline
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Research <span className="gradient-text">Milestones</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
            Key evaluation points tracking the progress and assessment of the research project.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 grid grid-cols-2 gap-4 max-w-xs mx-auto"
        >
          {[
            { label: 'Completed', value: completed.length },
            { label: 'Upcoming',  value: MILESTONES.length - completed.length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white border border-brand-100 p-4 shadow-card">
              <div className="text-2xl font-extrabold text-brand-700">{s.value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-5">
        {MILESTONES.map((m, i) => (
          <MilestoneCard key={m.id} milestone={m} index={i} />
        ))}
      </div>
    </section>
  </div>
);

export default MilestonesPage;
