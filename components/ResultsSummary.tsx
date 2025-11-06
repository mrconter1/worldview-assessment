import { motion } from "framer-motion";

type ResponseType = 1 | 2 | 3 | 4 | 5 | null;

interface ResultsSummaryProps {
  responses: ResponseType[];
  name: string;
  onNewSubmission: () => void;
  onViewStats: () => void;
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

const QUESTIONS = [
  "Companies function more like royal courts than rational money-making machines. Power dynamics, favoritism, and personal relationships determine outcomes. Competence and merit are secondary considerations that provide convenient justification after political decisions are already made.",
  "Meritocracy is a myth. Those who succeed had advantages in background, connections, or circumstances that they don't acknowledge. The system rewards luck and privilege, while people who benefit construct narratives about having earned everything through their own efforts.",
  "People cope with difficult aspects of existence by avoiding them at every cost. When avoidance becomes impossible, people tend to break down rather than adapt because they never developed the capacity to face reality directly.",
  "It is not fair that you earn more even if you are smarter or generate more money. Compensation perhaps reflects contribution, but that doesn't philosophically mean you deserve a higher salary. Higher output doesn't create an ethical claim to drastically higher rewards regardless of what economic systems suggest.",
  "Life is incredibly arbitrary. Success and failure depend on factors beyond individual control. People construct narratives of justice and causation to avoid accepting that randomness governs most outcomes.",
  "Positions and beliefs are primarily based on emotions that are rationalized afterwards. People feel their way to conclusions first. The logical-sounding justifications come later to defend what was already decided emotionally, not to arrive at truth.",
  "Doing everything right means, in practice, you not only miss out on benefits but are also punished. Following rules while others break them leaves you disadvantaged. Systems penalize those who play fair while rule-breakers advance, making integrity a liability rather than an asset.",
  "People are not rational and often act against their own interests. Short-term impulses override long-term wellbeing constantly. Even when people know what would help them, they do the opposite because impulse and social pressure dominate decision-making.",
  "A good life is boring, and very few are willing to live such a life. Stability, routine, and moderation create wellbeing but lack excitement. People reject the mundane nature of sustainable happiness in favor of pursuing drama and intensity.",
  "People refuse to accept that things take time and therefore prioritize shortcuts like gambling, extreme training, and risk-taking. The slow path feels intolerable, which is mainly why people try to start exercise or learn a new language. People seek quick solutions even when they're less likely to work because gradual progress feels like no progress.",
  "Politics is not something that is needed, but rather something that inevitably emerges in human systems. Whenever there are people and resources, power struggles develop regardless of intentions. Politics is an inherent feature of group dynamics that cannot be designed away.",
  "People need suffering to have meaning, and if it doesn't, they create meaning from it. Meaningless pain is intolerable. Narratives of growth or purpose get constructed around hardship, such as reducing food intake by a lot, which is painful and therefore has to have effect, or starting intense exercise and suffering, and therefore it has to work because there is no alternative.",
  "Without growth in a company, climbing the ladder is a zero-sum game. Someone can only move up if someone else moves down or out. Advancement requires taking someone else's position, not creating new value or opportunities.",
  "After a relatively low skill level, average people don't get much more impressed as skill increases. The difference between novice and competent is visible, but the gap between competent and exceptional is invisible to most observers. Exceptional expertise goes unrecognized and unrewarded beyond a relatively low threshold.",
  "Lack of stimulation becomes painful because it forces people to confront a meaningless existence, making distractions important as avoidance mechanisms. Boredom removes the buffer between consciousness and existential awareness. This applies to anything—entertainment, fishing, painting, singing, or even just fidgeting—which exists to prevent uncomfortable self-reflection.",
  "Most friendships aren't real friendships in the sense that they won't endure through serious hardship or long-term absence. They're situational relationships based on convenience and proximity. When tested by distance, illness, or tragedy, these connections disappear because they were never deep.",
  "When you die, people who love you will eventually forget you faster than you and they would want to admit. Even genuine grief fades into occasional memory. The people you mean everything to will move on and stop thinking about you.",
  "In the end, you are truly alone. Not everyone reaches this realization, but at some point in life you will know that no one is there de facto, and if you don't do anything you will literally end up dead or homeless. This fundamental aloneness is inescapable, though it doesn't mean you're helpless.",
  "Everyone is able to make time for things and people, just perhaps not for you. When someone says they're too busy, it means you're not a priority. Time scarcity is a polite fiction covering where someone actually chooses to invest their attention.",
  "Very few people are capable of fundamental change. Personality traits, habits, and patterns remain stable across decades despite intentions. Temporary modifications happen, but deep transformation requires rare combinations of factors that most people never achieve.",
  "When companies claim to value innovation, fairness, professionalism, and challenging the status quo, they don't actually mean it in practice. These values sound good but organizational behavior reveals different priorities. The stated values are performance, not genuine commitments.",
  "The goal of a company is not to make money but rather to do whatever the people in power think is important. Profit is secondary to ego, comfort, control, or ideology of decision-makers. Organizations act against their own financial interests based on leadership preferences regularly.",
  "People feel threatened when you are skilled enough to do their job or potentially take their position. Competence triggers insecurity, not appreciation. Being good at what you do creates enemies because it exposes others' inadequacy or threatens their status.",
  "Most people haven't given any real thought to why they are having or had children. The decision is driven by social expectation, biological impulse, or vague assumptions. Careful consideration of whether parenthood aligns with actual values and capabilities is rare.",
  "Parents ultimately raise you to view life as they view it and how they want you to be. Your fundamental assumptions about reality, relationships, and meaning were shaped by their worldview. This might also be why you end up being confused or hurt by the world.",
  "Psychiatry can help you not feel bad, but it cannot create happiness. Perhaps meaning, purpose, or fulfillment is possible, but mental healthcare primarily reduces suffering and dysfunction rather than generating wellbeing.",
  "Almost all stress is preventable. Anxiety comes from poor planning, unrealistic commitments, or avoidable situations. We create our own stress through choices we refuse to acknowledge as choices, not from inevitable circumstances.",
  "If you start doing more than required, you cannot later simply stop doing it without consequences. Extra effort becomes the new baseline expectation. Overperformance traps you into permanently elevated standards that become requirements, not appreciated bonuses.",
  "A lot of suffering is arbitrary and meaningless, which is very difficult for people to accept. Bad things happen for no reason, serving no purpose and teaching no lesson.",
  "Companies will lie to your face, break promises, and discard you without hesitation. Organizations feel no loyalty and experience no guilt about prioritizing their interests over yours. The personal relationship you think you have with your employer is imaginary.",
  "People vastly overestimate the support they receive from police, unions, legal systems, and healthcare. These institutions operate at a 'getting by' level, constrained by resources and priorities. The help and protection you expect to receive will fall far short of what you assumed was there when you actually need it.",
  "The important thing isn't how things actually are, but how things appear to be. Perception and presentation determine outcomes. Success depends on managing image, not on actual quality or performance underneath the surface.",
];

export function ResultsSummary({ responses, name, onNewSubmission, onViewStats }: ResultsSummaryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Responses
          </h1>
          {name && name !== "Anonymous" && (
            <p className="mt-2 text-sm text-cyan-400">Welcome, {name}!</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-3 text-center mb-8"
        >
          <button
            onClick={onNewSubmission}
            className="group relative px-8 py-3 font-semibold text-white transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 px-8 py-3 border border-cyan-500/30">
              Submit New Answer
              <span className="text-lg">↻</span>
            </div>
          </button>

          <button
            onClick={onViewStats}
            className="group relative px-8 py-3 font-semibold text-white transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-8 py-3 border border-purple-500/30">
              View Statistics
              <span className="text-lg">📊</span>
            </div>
          </button>
        </motion.div>

        <div className="space-y-4 mb-8">
          {QUESTIONS.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 backdrop-blur hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{question}</p>
              </div>

              <div className="ml-11 grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((response) => (
                  <div
                    key={response}
                    className={`relative overflow-hidden rounded-lg py-2 px-1 text-xs font-semibold transition-all text-center ${
                      responses[index] === response
                        ? `bg-gradient-to-b ${SCALE_COLORS[response - 1]} text-white shadow-lg`
                        : "bg-slate-800/50 text-slate-400"
                    }`}
                  >
                    <span className="relative z-10 block leading-tight">
                      {SCALE_LABELS[response - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
