import { motion } from 'framer-motion';
import { Mail, Github, User } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   TEAM MEMBERS — images are in /public/assets/, named by IT number
   Email pattern: IT######@my.sliit.lk
   ───────────────────────────────────────────────────────────────── */
const TEAM_MEMBERS = [
  {
    name: 'D. M. T. V. Dissanayake',
    studentId: 'IT22003546',
    role: 'Team Leader & Backend Developer',
    email: 'IT22003546@my.sliit.lk',
    photo: 'Dissanayake D. M. T. V. (Leader)  IT22003546.jpg',
    specialisation: 'Schema Enhancement Engine & AI Integration',
  },
  {
    name: 'T. S. Gunawardena',
    studentId: 'IT22350114',
    role: 'Frontend Developer',
    email: 'IT22350114@my.sliit.lk',
    photo: 'Gunawardena T. S. IT22350114.png',
    specialisation: 'Cross-Platform Form Generation (Web & Mobile)',
  },
  {
    name: 'M. I. H. Liyanage',
    studentId: 'IT22332608',
    role: 'Full-Stack Developer',
    email: 'IT22332608@my.sliit.lk',
    photo: 'Liyanage M. I. H. IT22332608.png',
    specialisation: 'Backend API Generation & Runtime Binding',
  },
  {
    name: 'P. H. Y. L. Rajapakshe',
    studentId: 'IT22305350',
    role: 'QA Engineer & Researcher',
    email: 'IT22305350@my.sliit.lk',
    photo: 'Rajapakshe P. H. Y. L. IT22305350.jpg',
    specialisation: 'Test Case Generation & Quality Evaluation',
  },
];

/* ─── Supervisor ────────────────────────────────────────────────── */
const SUPERVISOR = {
  name: 'Mr. Jeewaka Perera',
  role: 'Project Supervisor',
  email: 'jeewaka.p@sliit.lk',
  department: 'Faculty of Computing — Computer Science, SLIIT',
  photo: 'Mr. Jeewaka Perera Lecturer Faculty of Computing Computer Science.jpg',
};

/* ─── Card colour palette ───────────────────────────────────────── */
const COLORS = [
  { grad: 'from-brand-500 to-brand-700',   bg: 'bg-brand-50',  border: 'border-brand-100' },
  { grad: 'from-indigo-500 to-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { grad: 'from-violet-500 to-purple-700', bg: 'bg-violet-50', border: 'border-violet-100' },
  { grad: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50', border: 'border-purple-100' },
];

/* ─── Member Card ───────────────────────────────────────────────── */
const MemberCard = ({ member, index }) => {
  const col      = COLORS[index % COLORS.length];
  const initials = member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const photoUrl = `${import.meta.env.BASE_URL}assets/${encodeURIComponent(member.photo)}`;
  const githubUrl = 'https://github.com/YasasLakmina/FormSync';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: '0 20px 56px rgba(168,85,247,0.18)' }}
      className={`group relative rounded-2xl border ${col.border} bg-white shadow-card overflow-hidden transition-shadow`}
    >
      {/* Top gradient bar */}
      <div className={`h-1 bg-gradient-to-r ${col.grad}`} />

      <div className="p-6">
        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <img
              src={photoUrl}
              alt={member.name}
              onError={(e) => {
                // Fallback to initials on image load failure
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-[0_4px_24px_rgba(168,85,247,0.22)]"
            />
            {/* Fallback initials */}
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${col.grad} items-center justify-center shadow-[0_4px_24px_rgba(168,85,247,0.22)] border-4 border-white`}
              style={{ display: 'none' }}
            >
              <span className="text-2xl font-extrabold text-white">{initials}</span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${col.grad} flex items-center justify-center shadow`}>
              <User size={12} className="text-white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h2 className="text-base font-bold text-neutral-900">{member.name}</h2>
          <p className={`text-xs font-semibold mt-0.5 bg-gradient-to-r ${col.grad} bg-clip-text text-transparent`}>
            {member.role}
          </p>
          <span className="inline-block mt-2 text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
            {member.studentId}
          </span>
        </div>

        {/* Specialisation */}
        <div className={`mt-4 rounded-xl ${col.bg} border ${col.border} px-3 py-2.5 text-center`}>
          <p className="text-xs text-neutral-600 leading-relaxed">{member.specialisation}</p>
        </div>

        {/* Links — email + github, NO LinkedIn */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors"
            title={member.email}
          >
            <Mail size={12} />
            <span className="truncate max-w-[140px]">{member.email}</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:border-brand-200 hover:text-brand-600 transition-colors"
            title="GitHub Repository"
          >
            <Github size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────────── */
const AboutPage = () => {
  const supervisorPhotoUrl = `${import.meta.env.BASE_URL}assets/${encodeURIComponent(SUPERVISOR.photo)}`;
  const supervisorInitials = SUPERVISOR.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-stripe py-16 border-b border-brand-100/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
              The Team
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
              Meet the research team behind the AI-Powered Cross-Platform Form Generator project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <MemberCard key={member.studentId} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Supervisor */}
      <section className="py-10 border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">Project <span className="gradient-text">Supervisor</span></h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-sm mx-auto rounded-2xl border border-brand-100 bg-white shadow-card overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-brand-500 to-indigo-600" />
            <div className="p-6 text-center">
              {/* Supervisor photo */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={supervisorPhotoUrl}
                    alt={SUPERVISOR.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-[0_4px_24px_rgba(168,85,247,0.22)]"
                  />
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 items-center justify-center shadow-[0_4px_24px_rgba(168,85,247,0.22)] border-4 border-white"
                    style={{ display: 'none' }}
                  >
                    <span className="text-xl font-extrabold text-white">{supervisorInitials}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-base font-bold text-neutral-900">{SUPERVISOR.name}</h3>
              <p className="text-sm font-semibold text-brand-600 mt-1">{SUPERVISOR.role}</p>
              <p className="text-xs text-neutral-500 mt-1">{SUPERVISOR.department}</p>
              <a
                href={`mailto:${SUPERVISOR.email}`}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors"
              >
                <Mail size={12} />{SUPERVISOR.email}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institution */}
      <section className="py-10 border-t border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Affiliated Institution</p>
            <h3 className="text-lg font-bold text-neutral-800">
              Sri Lanka Institute of Information Technology (SLIIT)
            </h3>
            <p className="text-sm text-neutral-500 mt-2">Faculty of Computing · Computer Science</p>
            <p className="text-sm text-neutral-500">Academic Year 2024 / 2025</p>
            <div className="mt-4">
              <a
                href="https://github.com/YasasLakmina/FormSync"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                <Github size={15} />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
