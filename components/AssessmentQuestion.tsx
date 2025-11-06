import { motion } from "framer-motion";

type ResponseType = 1 | 2 | 3 | 4 | 5 | null;

interface AssessmentQuestionProps {
  number: number;
  question: string;
  value: ResponseType;
  onChange: (value: ResponseType) => void;
}

const SCALE_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const SCALE_COLORS = [
  "from-red-600 to-red-500",
  "from-orange-600 to-orange-500",
  "from-amber-600 to-amber-500",
  "from-lime-600 to-lime-500",
  "from-green-600 to-green-500",
];

export function AssessmentQuestion({
  number,
  question,
  value,
  onChange,
}: AssessmentQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.01 }}
      className="group rounded-lg border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-900/60"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-bold text-white">
          {number}
        </div>
        <p className="text-base leading-relaxed text-slate-200">{question}</p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((response) => (
            <motion.button
              key={response}
              onClick={() => onChange(response as ResponseType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-lg py-2 px-2 text-xs font-semibold transition-all duration-200 ${
                value === response
                  ? `bg-gradient-to-b ${SCALE_COLORS[response - 1]} text-white shadow-lg shadow-${SCALE_COLORS[response - 1].split(" ")[1].split("-")[1]}-500/50`
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
              }`}
            >
              <span className="relative z-10 block leading-tight">
                {SCALE_LABELS[response - 1]}
              </span>
              {value === response && (
                <motion.div
                  layoutId={`response-${number}`}
                  className="absolute inset-0 bg-gradient-to-b opacity-20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

