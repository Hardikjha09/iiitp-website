import React, { useRef } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { CompanyLogo } from '../components/shared/CompanyLogo';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, Sector,
  LineChart, Line
} from 'recharts';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp, Users, Building2, Award, Mail, Phone,
  Globe, ExternalLink, ChevronRight, GraduationCap, Target
} from 'lucide-react';
import { Link } from 'react-router';

// ── Data ─────────────────────────────────────────────────────────────────────

const yearStats = [
  { year: '2020–21', eligible: 78,  placed: 68,  pct: 87,  avg: 14.5, highest: 36 },
  { year: '2021–22', eligible: 92,  placed: 85,  pct: 92,  avg: 16.8, highest: 53 },
  { year: '2022–23', eligible: 105, placed: 98,  pct: 93,  avg: 18.2, highest: 53 },
  { year: '2023–24', eligible: 118, placed: 112, pct: 95,  avg: 17.5, highest: 55 },
];

const sectorData = [
  { name: 'Software Dev.',   value: 42, color: '#2563EB' },
  { name: 'Product Co.',     value: 22, color: '#7C3AED' },
  { name: 'Core Engg.',      value: 15, color: '#0891B2' },
  { name: 'BFSI / Fintech',  value: 12, color: '#059669' },
  { name: 'Research / Edu.', value: 9,  color: '#D97706' },
];

const recruiters = [
  { name: 'Google',       sector: 'Software' },
  { name: 'Microsoft',    sector: 'Software' },
  { name: 'Amazon',       sector: 'Software' },
  { name: 'Qualcomm',     sector: 'Core' },
  { name: 'NVIDIA',       sector: 'Core' },
  { name: 'Flipkart',     sector: 'Product' },
  { name: 'Deloitte',     sector: 'Consulting' },
  { name: 'Accenture',    sector: 'IT Services' },
  { name: 'Samsung R&D',  sector: 'Core' },
  { name: 'Siemens',      sector: 'Core' },
  { name: 'Citi',         sector: 'BFSI' },
  { name: 'Goldman Sachs',sector: 'BFSI' },
  { name: 'Cisco',        sector: 'Software' },
  { name: 'TCS',          sector: 'IT Services' },
  { name: 'Infosys',      sector: 'IT Services' },
  { name: 'Wipro',        sector: 'IT Services' },
  { name: 'Capgemini',    sector: 'IT Services' },
  { name: 'L&T Infotech', sector: 'IT Services' },
  { name: 'Intel',        sector: 'Core' },
  { name: 'IBM',          sector: 'Software' },
  { name: 'VMware',       sector: 'Software' },
  { name: 'Zomato',       sector: 'Product' },
  { name: 'Bajaj Finserv',sector: 'BFSI' },
  { name: 'Persistent',   sector: 'IT Services' },
];

const sectorColors = {
  Software:    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Core:        'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  Product:     'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  Consulting:  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  'IT Services':'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300',
  BFSI:        'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-gray-900 text-white text-sm rounded-xl p-4 shadow-2xl border border-gray-700">
      <p className="font-bold mb-2 text-blue-300">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold">{p.value} LPA</span>
        </p>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-gray-900 text-white text-sm rounded-xl p-3 shadow-2xl border border-gray-700">
      <p className="font-bold">{payload[0].name}</p>
      <p className="text-blue-300">{payload[0].value}% of placements</p>
    </div>
  );
};

// ── Active Pie Shape ──────────────────────────────────────────────────────────

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent,
  } = props;
  return (
    <g>
      <text x={cx} y={cy - 14} textAnchor="middle" fill={fill} className="font-bold" style={{ fontSize: 18 }}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#94a3b8" style={{ fontSize: 14 }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 14} outerRadius={outerRadius + 18}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, sub, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800 flex flex-col gap-2 hover:shadow-lg transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 ${color.bg}`}>
        <Icon size={24} className={color.text} />
      </div>
      <div className={`text-4xl font-extrabold font-serif ${color.text}`}>{value}</div>
      <div className="text-gray-800 dark:text-gray-100 font-semibold text-sm">{label}</div>
      <div className="text-gray-500 dark:text-gray-400 text-xs">{sub}</div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const PlacementPage = () => {
  React.useEffect(() => {
    window.location.replace("https://placements.iiitp.ac.in/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg dark:bg-bg-dark transition-colors duration-200">
      <div className="text-center py-20">
        <p className="text-lg font-semibold text-primary dark:text-white mb-2 animate-pulse">Redirecting to Placement Portal...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">If you are not redirected, <a href="https://placements.iiitp.ac.in/" className="text-accent dark:text-accent-dark hover:underline font-bold">click here</a>.</p>
      </div>
    </div>
  );
};

const OldPlacementPage = () => {
  const [activeSector, setActiveSector] = React.useState(0);
  const chartsRef = useRef(null);
  const chartsInView = useInView(chartsRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Training &amp; Placement Cell" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* ── Section 1: Key Stats ────────────────────────────────────────── */}
        <section>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">Overview</p>
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">Placement at a Glance</h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-3" />
            </div>
            <a href="https://placements.iiitp.ac.in/" target="_blank" rel="noopener noreferrer"  className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-md text-xs font-bold shadow-md transition-all duration-200 uppercase tracking-wide shrink-0">
              Visit Placement Portal <ExternalLink size={18} />
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={Award}        value="55 LPA"  label="Highest Package"      sub="AY 2023–24"            color={{ bg:'bg-yellow-50 dark:bg-yellow-900/20', text:'text-yellow-600 dark:text-yellow-400' }} delay={0} />
            <StatCard icon={TrendingUp}   value="17.5 LPA" label="Average Package"     sub="AY 2023–24"            color={{ bg:'bg-blue-50 dark:bg-blue-900/20', text:'text-blue-600 dark:text-blue-400' }} delay={0.1} />
            <StatCard icon={Users}        value="95%"     label="Placement Rate"        sub="Students placed 2023–24" color={{ bg:'bg-emerald-50 dark:bg-emerald-900/20', text:'text-emerald-600 dark:text-emerald-400' }} delay={0.2} />
            <StatCard icon={Building2}    value="120+"    label="Recruiting Companies" sub="MNCs & startups"       color={{ bg:'bg-purple-50 dark:bg-purple-900/20', text:'text-purple-600 dark:text-purple-400' }} delay={0.3} />
          </div>
        </section>

        {/* ── Section 2: Year-wise Table + Line Chart ─────────────────────── */}
        <section ref={chartsRef}>
          <div className="mb-8">
            <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">Year-on-Year</p>
            <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">Placement Trends</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* Bar Chart: Avg & Highest Package */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-1">Package Trends (LPA)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">Average &amp; Highest CTC per academic year</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearStats} margin={{ top: 10, right: 20, left: 0, bottom: 5 }} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis tickFormatter={(v) => `${v}`} tick={{ fontSize: 12, fill: '#6b7280' }} unit=" L" />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend iconType="circle" iconSize={10} />
                    <Bar dataKey="avg"     name="Avg Package"     fill="#2563EB" radius={[6,6,0,0]} />
                    <Bar dataKey="highest" name="Highest Package" fill="#10B981" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Line Chart: Placement % */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-1">Placement Rate (%)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">Percentage of eligible students placed each year</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearStats} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis domain={[80, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip formatter={(v) => [`${v}%`, 'Placement Rate']} contentStyle={{ backgroundColor:'#1e293b', color:'#fff', borderRadius:'10px', border:'none' }} />
                    <Line
                      type="monotone"
                      dataKey="pct"
                      name="Placement %"
                      stroke="#7C3AED"
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#7C3AED', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Year-wise stats table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={chartsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary dark:bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold text-sm">Academic Year</th>
                    <th className="px-6 py-4 text-center font-semibold text-sm">Eligible Students</th>
                    <th className="px-6 py-4 text-center font-semibold text-sm">Students Placed</th>
                    <th className="px-6 py-4 text-center font-semibold text-sm">Placement %</th>
                    <th className="px-6 py-4 text-center font-semibold text-sm">Avg Package (LPA)</th>
                    <th className="px-6 py-4 text-center font-semibold text-sm">Highest Package (LPA)</th>
                  </tr>
                </thead>
                <tbody>
                  {yearStats.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/10 ${
                        idx % 2 === 0 ? 'bg-white dark:bg-surface-dark' : 'bg-gray-50/60 dark:bg-gray-800/30'
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-primary dark:text-white">{row.year}</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{row.eligible}</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{row.placed}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                          {row.pct}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600 dark:text-blue-400">{row.avg}</td>
                      <td className="px-6 py-4 text-center font-semibold text-emerald-600 dark:text-emerald-400">{row.highest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* ── Section 3: Sector-wise Distribution ─────────────────────────── */}
        <section>
          <div className="mb-8">
            <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">Distribution</p>
            <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">Sector-wise Placement</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Donut Chart */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-1">Industry Breakdown</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">AY 2023–24 — hover to explore</p>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={110}
                      dataKey="value"
                      activeIndex={activeSector}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, idx) => setActiveSector(idx)}
                    >
                      {sectorData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sector Legend / Bars */}
            <div className="space-y-4">
              {sectorData.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
                  onMouseEnter={() => setActiveSector(idx)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">{s.name}</span>
                    <span className="font-bold text-sm" style={{ color: s.color }}>{s.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 1, delay: idx * 0.15 }}
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Why Recruit ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 md:p-12 shadow-md border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-2">For Recruiters</p>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary dark:text-white mb-4">
                Why Recruit from IIIT Pune?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                IIIT Pune follows a rigorous curriculum that is constantly updated to meet industry demands.
                Our students are well-versed in the latest technologies including AI/ML, Cloud Computing,
                VLSI, and Full-Stack Development.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                A strong focus on practical implementation, hackathons, and a mandatory 6-month industry
                internship ensures that our graduates are industry-ready from day one.
              </p>
              <ul className="space-y-3">
                {[
                  'Nationally ranked Institute of National Importance (MoE, Govt. of India)',
                  'B.Tech (CSE & ECE), M.Tech (CSE & ECE), PhD programs',
                  'Strong competitive coding culture — national & international champions',
                  'Mandatory 6-month internship ensuring hands-on experience',
                  'SIH, hackathon & research publication record',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <ChevronRight size={16} className="text-accent dark:text-accent-dark mt-0.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Box */}
            <div className="bg-gradient-to-br from-primary to-blue-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Target size={24} className="text-blue-200" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-serif">Training &amp; Placement Cell</h3>
                  <p className="text-blue-200 text-xs">IIIT Pune — Connect with us</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-blue-100">
                  <Mail size={16} className="text-blue-300 shrink-0" />
                  <a href="mailto:placement@iiitp.ac.in" className="hover:text-white transition-colors text-sm">
                    placement@iiitp.ac.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Phone size={16} className="text-blue-300 shrink-0" />
                  <span className="text-sm">+91-20-2411 1000</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Globe size={16} className="text-blue-300 shrink-0" />
                  <a href="https://placements.iiitp.ac.in" target="_blank" rel="noopener noreferrer"  className="hover:text-white transition-colors text-sm">
                    placements.iiitp.ac.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <ExternalLink size={16} className="text-blue-300 shrink-0" />
                  <a href="https://www.linkedin.com/company/cdcrciiitp/" target="_blank" rel="noopener noreferrer"  className="hover:text-white transition-colors text-sm">
                    linkedin.com/company/cdcrciiitp
                  </a>
                </div>
              </div>

              <a
                href="mailto:placement@iiitp.ac.in"
                className="block w-full text-center py-3 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-md"
              >
                Request Campus Visit / JD
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 5: Recruiters Grid ───────────────────────────────────── */}
        <section>
          <div className="mb-8">
            <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">Our Network</p>
            <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">Prominent Recruiters</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
              Companies that have recruited our students across batches
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {recruiters.map((r, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex items-center justify-center p-5 h-20 group hover:-translate-y-0.5 cursor-default"
              >
                <CompanyLogo name={r.name} className="w-full h-full max-h-10 object-contain text-gray-800 dark:text-gray-200" />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default PlacementPage;
