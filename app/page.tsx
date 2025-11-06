"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { ResultsSummary } from "@/components/ResultsSummary";
import { motion } from "framer-motion";

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
  "Politics is not really 'needed' but rather something that inevitably emerges in human systems. Whenever there are people and resources, power struggles develop regardless of intentions. Politics is an inherent feature of group dynamics that cannot be designed away.",
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

type ResponseType = 1 | 2 | 3 | 4 | 5 | null;

export default function Home() {
  const router = useRouter();
  const [responses, setResponses] = useState<ResponseType[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cookieId, setCookieId] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const MIN_TIME_SECONDS = 90;

  // Helper function to shuffle array
  const shuffleArray = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const storedResponses = localStorage.getItem("assessment_responses");
    const storedName = localStorage.getItem("assessment_name");
    const stored = localStorage.getItem("assessment_cookie_id");
    const storedStartTime = localStorage.getItem("assessment_start_time");
    const storedQuestionOrder = localStorage.getItem("assessment_question_order");

    // Only show results if they have actually submitted (responses are stored)
    if (storedResponses) {
      setCookieId(stored);
      setSubmitted(true);
      setResponses(JSON.parse(storedResponses));
      if (storedName) {
        setName(storedName);
      }
      if (storedQuestionOrder) {
        setQuestionOrder(JSON.parse(storedQuestionOrder));
      }
      setShowResults(true);
    } else {
      // Delete cookie if no responses were submitted
      if (stored) {
        localStorage.removeItem("assessment_cookie_id");
        localStorage.removeItem("assessment_start_time");
        localStorage.removeItem("assessment_question_order");
      }
      const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const now = Date.now();
      const initialOrder = Array.from({ length: QUESTIONS.length }, (_, i) => i);
      const randomizedOrder = shuffleArray(initialOrder);
      
      setCookieId(newId);
      localStorage.setItem("assessment_cookie_id", newId);
      localStorage.setItem("assessment_start_time", now.toString());
      localStorage.setItem("assessment_question_order", JSON.stringify(randomizedOrder));
      setQuestionOrder(randomizedOrder);
    }
  }, []);

  // Timer effect to track elapsed time
  useEffect(() => {
    const startTimeStr = localStorage.getItem("assessment_start_time");
    if (!startTimeStr) return;

    const startTime = parseInt(startTimeStr);
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setTimeElapsed(elapsed);
      setMinTimeReached(elapsed >= MIN_TIME_SECONDS);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleResponse = (index: number, value: ResponseType) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const allAnswered = responses.every((r) => r !== null);

  const handleSubmit = async () => {
    if (!allAnswered || !cookieId) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous",
          responses,
          cookieId,
        }),
      });

      if (response.ok) {
        localStorage.setItem("assessment_responses", JSON.stringify(responses));
        localStorage.setItem("assessment_name", name);
        setSubmitted(true);
        setShowResults(true);
        router.push("/statistics");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewSubmission = () => {
    localStorage.removeItem("assessment_cookie_id");
    localStorage.removeItem("assessment_responses");
    localStorage.removeItem("assessment_name");
    localStorage.removeItem("assessment_start_time");
    localStorage.removeItem("assessment_question_order");
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();
    const initialOrder = Array.from({ length: QUESTIONS.length }, (_, i) => i);
    const randomizedOrder = shuffleArray(initialOrder);
    
    setCookieId(newId);
    localStorage.setItem("assessment_cookie_id", newId);
    localStorage.setItem("assessment_start_time", now.toString());
    localStorage.setItem("assessment_question_order", JSON.stringify(randomizedOrder));
    setQuestionOrder(randomizedOrder);
    setResponses(Array(QUESTIONS.length).fill(null));
    setName("");
    setSubmitted(false);
    setShowResults(false);
    setTimeElapsed(0);
    setMinTimeReached(false);
  };

  if (showResults) {
    return (
      <ResultsSummary
        responses={responses}
        name={name}
        onNewSubmission={handleNewSubmission}
        onViewStats={() => router.push("/statistics")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Worldview Assessment
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/statistics")}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                📊 Stats
              </button>
              <a
                href="mailto:rasmus.lindahl1996@gmail.com"
                className="text-sm text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                ✉️ Contact
              </a>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
            This assessment explores how you view the world from a variety of angles. Complete all 32 questions to see how your worldview compares with other submissions.
          </p>
          {submitted && (
            <p className="mt-2 text-sm text-cyan-400">
              ✓ You've already submitted once
            </p>
          )}
        </div>

        <div className="mb-6 rounded-lg border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur">
          <div className="text-sm text-slate-300">
            Progress: {responses.filter((r) => r !== null).length} of{" "}
            {QUESTIONS.length}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300"
              style={{
                width: `${(responses.filter((r) => r !== null).length / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {questionOrder.map((originalIndex, displayIndex) => (
            <AssessmentQuestion
              key={originalIndex}
              number={displayIndex + 1}
              question={QUESTIONS[originalIndex]}
              value={responses[originalIndex]}
              onChange={(value) => handleResponse(originalIndex, value)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-lg border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Leave blank to stay anonymous"
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {!minTimeReached && !submitted && (
            <div className="mb-4 p-3 rounded-lg bg-amber-900/30 border border-amber-700/50 text-amber-300 text-sm">
              Please spend at least 90 seconds reviewing before submitting. Time remaining: {Math.max(0, MIN_TIME_SECONDS - timeElapsed)}s
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting || !minTimeReached}
            className="group relative w-full px-8 py-3 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-30 group-disabled:opacity-0" />
            <div className="relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 px-8 py-3 border border-cyan-500/30">
              {submitting ? "Submitting..." : "Submit & View Results"}
              <span className="text-lg">→</span>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
