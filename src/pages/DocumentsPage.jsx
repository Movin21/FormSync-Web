import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Search, X, AlertCircle, Loader2, Filter, Clock,
} from 'lucide-react';

/* ─── File type config ──────────────────────────────────────────── */
const TYPE_CONFIG = {
  PDF:  { color: 'text-red-700 bg-red-50 border-red-200',   icon: '📄' },
  DOCX: { color: 'text-blue-700 bg-blue-50 border-blue-200', icon: '📝' },
  DOC:  { color: 'text-blue-700 bg-blue-50 border-blue-200', icon: '📝' },
};

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

/* ─── Document Card ─────────────────────────────────────────────── */
const DocCard = ({ doc, index }) => {
  const cfg    = TYPE_CONFIG[doc.type] || TYPE_CONFIG.PDF;
  const fileUrl = `${import.meta.env.BASE_URL}assets/documents/${encodeURIComponent(doc.file)}`;
  const isPending = doc.available === false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isPending ? 0 : -4, boxShadow: isPending ? undefined : '0 16px 48px rgba(168,85,247,0.13)' }}
      className={`group relative rounded-2xl border bg-white p-5 shadow-card transition-shadow overflow-hidden ${
        isPending ? 'border-neutral-100 opacity-75' : 'border-neutral-200'
      }`}
    >
      {/* Top accent */}
      {!isPending && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border ${
          isPending ? 'bg-neutral-50 border-neutral-200' : 'bg-brand-50 border-brand-100'
        }`}>
          {isPending ? '⏳' : cfg.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-neutral-900 text-base">{doc.name}</h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-bold ${cfg.color}`}>
              {doc.type}
            </span>
            {isPending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-bold text-amber-700 bg-amber-50 border-amber-200">
                <Clock size={9} /> Pending
              </span>
            )}
          </div>
          {doc.description && (
            <p className="text-sm text-neutral-500 leading-relaxed mb-2 line-clamp-2">{doc.description}</p>
          )}
          {doc.date && (
            <p className="text-xs text-neutral-400">{formatDate(doc.date)}</p>
          )}
        </div>

        {/* Actions — only for available documents */}
        {!isPending && (
          <div className="flex sm:flex-col gap-2 flex-shrink-0">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors"
            >
              <Eye size={13} /> View
            </a>
            <a
              href={fileUrl}
              download={doc.file}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <Download size={13} /> Download
            </a>
          </div>
        )}

        {/* Pending placeholder */}
        {isPending && (
          <div className="flex-shrink-0 sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-400 text-xs font-semibold">
              <Clock size={13} /> Coming Soon
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────────── */
const DocumentsPage = () => {
  const [docs, setDocs]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [query, setQuery]           = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}assets/documents/manifest.json`)
      .then((r) => { if (!r.ok) throw new Error('Failed to load manifest'); return r.json(); })
      .then((data) => { setDocs(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const types = ['All', ...Array.from(new Set(docs.map((d) => d.type)))];

  const filtered = docs.filter((d) => {
    const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) ||
                   (d.description || '').toLowerCase().includes(query.toLowerCase());
    const matchT = typeFilter === 'All' || d.type === typeFilter;
    return matchQ && matchT;
  });

  const availableCount = docs.filter((d) => d.available !== false).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-stripe py-16 border-b border-brand-100/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
              Research Documents
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Project <span className="gradient-text">Documents</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
              Access all research documents — individual proposal reports, the research paper, and activity logs.
            </p>
            {!loading && (
              <p className="mt-3 text-sm text-neutral-400">
                <span className="text-brand-600 font-semibold">{availableCount}</span> of {docs.length} documents available
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-5 border-b border-neutral-100 bg-white/70 backdrop-blur-sm sticky top-16 z-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search documents…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-neutral-400 font-medium"><Filter size={12} />Type:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  typeFilter === t
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-300 hover:text-brand-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-neutral-500">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm">Loading documents…</span>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-500">
              <AlertCircle size={36} className="text-red-400" />
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-400">
              <FileText size={36} className="opacity-40" />
              <p className="text-sm">No documents match your search.</p>
            </div>
          )}
          {!loading && !error && (
            <div className="space-y-4">
              {filtered.map((doc, i) => (
                <DocCard key={doc.file} doc={doc} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DocumentsPage;
