import { motion } from "framer-motion";

type ResponseType = 1 | 2 | 3 | 4 | 5 | null;

interface ResultsSummaryProps {
  responses: ResponseType[];
  onReset: () => void;
}

const CATEGORIES = [
  { name: "Organizations & Systems", questions: [0, 1, 13, 20, 21, 22, 30, 31] },
  {
    name: "Human Nature & Behavior",
    questions: [2, 3, 6, 7, 8, 9, 10, 19, 23],
  },
  { name: "Meaning & Existence", questions: [4, 5, 11, 12, 14, 15, 28, 29] },
  { name: "Relationships & Mortality", questions: [16, 17, 18] },
  { name: "Change & Development", questions: [24, 25, 26, 27] },
  { name: "Perception & Reality", questions: [32] },
];

export function ResultsSummary({ responses, onReset }: ResultsSummaryProps) {
  const categoryScores = CATEGORIES.map((category) => {
    const scores = category.questions
      .map((q) => responses[q])
      .filter((r) => r !== null) as number[];
    const average = scores.length > 0 ? scores.reduce((a, b) => a + b) / scores.length : 0;
    return { ...category, average, count: scores.length };
  });

  const overallAverage =
    responses.filter((r) => r !== null).length > 0
      ? (responses.filter((r) => r !== null) as number[]).reduce((a, b) => a + b) /
        responses.filter((r) => r !== null).length
      : 0;

  const getCategoryColor = (score: number) => {
    if (score < 2) return "from-red-600 to-red-500";
    if (score < 2.5) return "from-orange-600 to-orange-500";
    if (score < 3.5) return "from-amber-600 to-amber-500";
    if (score < 4) return "from-lime-600 to-lime-500";
    return "from-green-600 to-green-500";
  };

  const getInsight = (score: number) => {
    if (score < 2) return "Strongly disagree";
    if (score < 2.5) return "Tend to disagree";
    if (score < 3.5) return "Neutral view";
    if (score < 4) return "Tend to agree";
    return "Strongly agree";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Worldview Profile
          </h1>
          <p className="text-slate-400">Based on your responses across 32 perspectives</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-lg border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur"
        >
          <div className="mb-4 text-center">
            <p className="text-sm text-slate-400 mb-2">Overall Worldview Score</p>
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {overallAverage.toFixed(2)}
            </div>
            <p className="mt-2 text-slate-300">{getInsight(overallAverage)}</p>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(overallAverage / 5) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${getCategoryColor(overallAverage)}`}
            />
          </div>
        </motion.div>

        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-slate-100">Category Breakdown</h2>
          {categoryScores.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 backdrop-blur hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-100">{category.name}</h3>
                  <p className="text-sm text-slate-500">
                    {category.count} of {category.questions.length} questions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {category.average.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-400">{getInsight(category.average)}</p>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(category.average / 5) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.05 }}
                  className={`h-full bg-gradient-to-r ${getCategoryColor(category.average)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={onReset}
            className="group relative px-8 py-3 font-semibold text-white transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur transition-all duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center gap-2 rounded-lg bg-slate-950 px-8 py-3">
              Start Over
              <span className="text-lg">↻</span>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

