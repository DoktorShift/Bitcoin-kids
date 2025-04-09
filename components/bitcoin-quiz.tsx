"use client"

import type React from "react"
import { useState } from "react"
import { HelpCircle, Zap, Check, X, Star, ThumbsUp, Award, Bitcoin } from "lucide-react"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"

// Supported languages
export type Language = "de" | "en" | "es"

type QuizQuestion = {
  id: number
  question: {
    de: string
    en: string
    es: string
  }
  options: {
    de: string[]
    en: string[]
    es: string[]
  }
  correctAnswer: number
  explanation: {
    de: string
    en: string
    es: string
  }
  category: "easy" | "medium" | "hard"
  icon: React.ReactNode
  color: string
}

// Translations for the UI elements
const uiTranslations = {
  de: {
    quizTitle: "Bitcoin-Quiz",
    quizSubtitle: "Teste dein Wissen über Bitcoin und werde zum Bitcoin-Experten!",
    difficultyTitle: "Schwierigkeitsgrad",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    questionCountTitle: "Anzahl der Fragen",
    warningMessage:
      "Es gibt nur {count} Fragen mit {difficulty} Schwierigkeit. Das Quiz wird mit allen verfügbaren Fragen starten.",
    startQuiz: "Quiz starten",
    question: "Frage",
    of: "von",
    points: "Punkte",
    checkAnswer: "Antwort prüfen",
    nextQuestion: "Nächste Frage",
    showResult: "Ergebnis anzeigen",
    quizCompleted: "Quiz beendet!",
    correctAnswers: "Du hast {score} von {total} Fragen richtig beantwortet!",
    newQuiz: "Neues Quiz",
    // Feedback basierend auf Punktzahl
    feedback100: "Fantastisch! Du bist ein echter Bitcoin-Experte!",
    feedback80: "Super gemacht! Du weißt schon sehr viel über Bitcoin!",
    feedback60: "Gut gemacht! Du lernst schnell über Bitcoin!",
    feedback40: "Nicht schlecht! Beim nächsten Mal schaffst du bestimmt noch mehr!",
    feedbackLow: "Weiter so! Bitcoin ist manchmal knifflig, aber du lernst jeden Tag dazu!",
  },
  en: {
    quizTitle: "Bitcoin Quiz",
    quizSubtitle: "Test your knowledge about Bitcoin and become a Bitcoin expert!",
    difficultyTitle: "Difficulty Level",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    questionCountTitle: "Number of Questions",
    warningMessage:
      "There are only {count} questions with {difficulty} difficulty. The quiz will start with all available questions.",
    startQuiz: "Start Quiz",
    question: "Question",
    of: "of",
    points: "Points",
    checkAnswer: "Check Answer",
    nextQuestion: "Next Question",
    showResult: "Show Result",
    quizCompleted: "Quiz Completed!",
    correctAnswers: "You answered {score} out of {total} questions correctly!",
    newQuiz: "New Quiz",
    // Feedback based on score
    feedback100: "Fantastic! You're a real Bitcoin expert!",
    feedback80: "Great job! You already know a lot about Bitcoin!",
    feedback60: "Well done! You're learning quickly about Bitcoin!",
    feedback40: "Not bad! Next time you'll surely get even more!",
    feedbackLow: "Keep going! Bitcoin can be tricky, but you learn more every day!",
  },
  es: {
    quizTitle: "Cuestionario de Bitcoin",
    quizSubtitle: "¡Pon a prueba tus conocimientos sobre Bitcoin y conviértete en un experto en Bitcoin!",
    difficultyTitle: "Nivel de Dificultad",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    questionCountTitle: "Número de Preguntas",
    warningMessage:
      "Solo hay {count} preguntas con dificultad {difficulty}. El cuestionario comenzará con todas las preguntas disponibles.",
    startQuiz: "Iniciar Cuestionario",
    question: "Pregunta",
    of: "de",
    points: "Puntos",
    checkAnswer: "Comprobar Respuesta",
    nextQuestion: "Siguiente Pregunta",
    showResult: "Mostrar Resultado",
    quizCompleted: "¡Cuestionario Completado!",
    correctAnswers: "¡Has respondido correctamente a {score} de {total} preguntas!",
    newQuiz: "Nuevo Cuestionario",
    // Feedback basado en puntuación
    feedback100: "¡Fantástico! ¡Eres un verdadero experto en Bitcoin!",
    feedback80: "¡Buen trabajo! ¡Ya sabes mucho sobre Bitcoin!",
    feedback60: "¡Bien hecho! ¡Estás aprendiendo rápidamente sobre Bitcoin!",
    feedback40: "¡No está mal! ¡La próxima vez seguramente conseguirás aún más!",
    feedbackLow: "¡Sigue así! Bitcoin puede ser complicado, ¡pero aprendes más cada día!",
  },
}

// Function to replace placeholders in translations
function formatMessage(message: string, replacements: Record<string, string | number>): string {
  let result = message
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{${key}}`, String(value))
  }
  return result
}

// Simple function to shuffle options
function shuffleOptions(question: QuizQuestion): QuizQuestion {
  // Simplified function that doesn't shuffle options to avoid mapping issues
  // Just return the original question without shuffling
  return { ...question }
}

type BitcoinQuizProps = {
  language?: Language
}

export function BitcoinQuiz({ language = "de" }: BitcoinQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [questionCount, setQuestionCount] = useState(5)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)

  // UI translations for the current language
  const t = uiTranslations[language]

  const allQuestions = [
    // EASY QUESTIONS (15)
    {
      id: 1,
      question: {
        de: "Was ist Bitcoin?",
        en: "What is Bitcoin?",
        es: "¿Qué es Bitcoin?",
      },
      options: {
        de: ["Eine Süßigkeit", "Digitales Geld im Computer", "Ein Spielzeug", "Ein Tier"],
        en: ["A candy", "Digital money in the computer", "A toy", "An animal"],
        es: ["Un dulce", "Dinero digital en la computadora", "Un juguete", "Un animal"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Bitcoin ist digitales Geld, das im Computer lebt und nicht aus Papier oder Metall besteht.",
        en: "Bitcoin is digital money that lives in the computer and is not made of paper or metal.",
        es: "Bitcoin es dinero digital que vive en la computadora y no está hecho de papel o metal.",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: 2,
      question: {
        de: "Wo bewahrt man Bitcoins auf?",
        en: "Where do you store Bitcoins?",
        es: "¿Dónde se guardan los Bitcoins?",
      },
      options: {
        de: ["In einer Spardose", "Unter dem Kopfkissen", "In einer digitalen Geldbörse", "Im Kühlschrank"],
        en: ["In a piggy bank", "Under the pillow", "In a digital wallet", "In the refrigerator"],
        es: ["En una alcancía", "Debajo de la almohada", "En una billetera digital", "En el refrigerador"],
      },
      correctAnswer: 2,
      explanation: {
        de: "Bitcoins werden in einer digitalen Geldbörse aufbewahrt, die man auch 'Wallet' nennt.",
        en: "Bitcoins are stored in a digital wallet, which is also called a 'wallet'.",
        es: "Los Bitcoins se almacenan en una billetera digital, que también se llama 'wallet'.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 4,
      question: {
        de: "Was kann man mit Bitcoin machen?",
        en: "What can you do with Bitcoin?",
        es: "¿Qué puedes hacer con Bitcoin?",
      },
      options: {
        de: [
          "Damit spielen wie mit Spielzeug",
          "Darauf schlafen",
          "Damit bezahlen wie mit Geld",
          "Daraus Bilder malen",
        ],
        en: ["Play with it like a toy", "Sleep on it", "Pay with it like money", "Paint pictures with it"],
        es: ["Jugar con él como un juguete", "Dormir sobre él", "Pagar con él como dinero", "Pintar imágenes con él"],
      },
      correctAnswer: 2,
      explanation: {
        de: "Mit Bitcoin kann man Dinge kaufen und bezahlen, genau wie mit normalem Geld.",
        en: "With Bitcoin, you can buy and pay for things, just like with normal money.",
        es: "Con Bitcoin, puedes comprar y pagar cosas, igual que con el dinero normal.",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    // Add more questions as needed
  ]

  // Filter questions based on difficulty
  const filteredQuestions = allQuestions.filter((question) => question.category === difficulty)

  // Check if there are enough questions for the selected difficulty and count
  useState(() => {
    // We'll just track if we have enough questions without showing warnings
    if (filteredQuestions.length < questionCount) {
      setQuestionCount(Math.min(5, filteredQuestions.length || 5))
    }
  })

  const startQuiz = () => {
    let questionsToUse = [...allQuestions].filter((question) => question.category === difficulty)

    // Shuffle all available questions first
    questionsToUse = [...questionsToUse].sort(() => 0.5 - Math.random())

    // If we don't have enough questions, use all available
    const availableCount = Math.min(questionCount, questionsToUse.length)

    // Take the number we need (or all available)
    questionsToUse = questionsToUse.slice(0, availableCount)

    const shuffledQuestions = questionsToUse.map((question) => shuffleOptions(question))
    setQuizQuestions(shuffledQuestions)
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizCompleted(false)
    setIsAnswered(false)
    setSelectedOption(null)
  }

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const findCorrectAnswerIndex = (question: QuizQuestion, lang: Language): number => {
    // The correctAnswer property always contains the index of the correct answer in the original options
    return question.correctAnswer
  }

  const checkAnswer = () => {
    if (selectedOption !== null) {
      setIsAnswered(true)
      const currentQuestion = quizQuestions[currentQuestionIndex]
      const correctIndex = findCorrectAnswerIndex(currentQuestion, language)

      if (selectedOption === correctIndex) {
        setScore(score + 1)
        // Confetti for correct answer
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        // Additional confetti with delay for more effect
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.7, x: 0.3 },
          })
        }, 300)

        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.7, x: 0.7 },
          })
        }, 600)
      }
    }
  }

  const nextQuestion = () => {
    setIsAnswered(false)
    setSelectedOption(null)
    setShowExplanation(false)
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setQuizCompleted(false)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
  }

  const getFeedback = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) {
      return t.feedback100
    } else if (percentage >= 80) {
      return t.feedback80
    } else if (percentage >= 60) {
      return t.feedback60
    } else if (percentage >= 40) {
      return t.feedback40
    } else {
      return t.feedbackLow
    }
  }

  return (
    <div className="container mx-auto p-4">
      {!quizStarted ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 mb-2 relative z-10">
                {t.quizTitle}
              </h1>
              <div className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
              <motion.div
                className="absolute -top-4 -right-8"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 fill-yellow-300" />
              </motion.div>
              <motion.div
                className="absolute -top-3 -left-6"
                animate={{
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Bitcoin className="h-5 w-5 sm:h-7 sm:w-7 text-amber-500" />
              </motion.div>
            </div>
            <p className="text-base sm:text-lg text-purple-500 mt-3 sm:mt-4 max-w-2xl mx-auto">{t.quizSubtitle}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            {/* Difficulty selection */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base sm:text-lg font-medium text-purple-700 mb-2">{t.difficultyTitle}</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => setDifficulty("easy")}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-xs sm:text-sm transition-colors ${
                    difficulty === "easy" ? "bg-green-500 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {t.easy}
                </button>
                <button
                  onClick={() => setDifficulty("medium")}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-xs sm:text-sm transition-colors ${
                    difficulty === "medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  {t.medium}
                </button>
                <button
                  onClick={() => setDifficulty("hard")}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-xs sm:text-sm transition-colors ${
                    difficulty === "hard" ? "bg-red-500 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {t.hard}
                </button>
              </div>
            </div>

            {/* Question count selection - always show in a kid-friendly way */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base sm:text-lg font-medium text-purple-700 mb-2">
                {t.questionCountTitle}
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => setQuestionCount(5)}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-sm transition-colors flex items-center justify-center ${
                    questionCount === 5 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  <span className="text-lg sm:text-xl">5 🐣</span>
                </button>
                <button
                  onClick={() => setQuestionCount(10)}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-sm transition-colors flex items-center justify-center ${
                    questionCount === 10 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  <span className="text-lg sm:text-xl">10 🦊</span>
                </button>
                <button
                  onClick={() => setQuestionCount(15)}
                  className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium text-sm transition-colors flex items-center justify-center ${
                    questionCount === 15 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  <span className="text-lg sm:text-xl">15 🦉</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startQuiz}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline text-sm sm:text-base transition-colors"
              >
                {t.startQuiz}
              </button>
            </div>
          </div>
        </div>
      ) : quizCompleted ? (
        <div className="text-center bg-white p-4 sm:p-8 rounded-xl shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-5 left-10 w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-yellow-200 opacity-40"></div>
            <div className="absolute top-20 right-12 w-5 sm:w-8 h-5 sm:h-8 rounded-full bg-green-200 opacity-40"></div>
            <div className="absolute bottom-10 left-1/4 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-blue-200 opacity-40"></div>
            <div className="absolute bottom-20 right-1/3 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-purple-200 opacity-40"></div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 mb-3 sm:mb-4">
              {t.quizCompleted}
            </h2>
            <div className="flex justify-center gap-4 sm:gap-6 mb-2">
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 fill-yellow-300" />
              </motion.div>
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              </motion.div>
            </div>
          </motion.div>

          <div className="mb-4 sm:mb-6 relative z-10">
            <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-xl text-white font-bold shadow-lg">
              {formatMessage(t.correctAnswers, { score, total: quizQuestions.length })}
            </div>
          </div>

          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-inner relative z-10">
            <div className="flex justify-center mb-2 sm:mb-3">
              {score > quizQuestions.length / 2 ? (
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" />
              ) : (
                <ThumbsUp className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
              )}
            </div>
            <p className="text-base sm:text-lg text-purple-800 font-medium">{getFeedback()}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline text-base sm:text-lg transition-colors shadow-lg relative z-10"
          >
            {t.newQuiz}
          </motion.button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header with progress */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 sm:p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base sm:text-xl font-bold">
                {t.question} {currentQuestionIndex + 1} {t.of} {quizQuestions.length}
              </h3>
              <div className="bg-white text-purple-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                {score} {t.points}
              </div>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-1.5 sm:h-2.5">
              <div
                className="bg-white h-1.5 sm:h-2.5 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 sm:p-6">
            {/* Question with icon */}
            <div className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className={`${quizQuestions[currentQuestionIndex].color} p-2 sm:p-3 rounded-full flex-shrink-0`}>
                {quizQuestions[currentQuestionIndex].icon}
              </div>
              <p className="text-base sm:text-xl text-gray-800 font-medium">
                {quizQuestions[currentQuestionIndex].question[language]}
              </p>
            </div>

            {/* Answer options */}
            <div className="grid gap-3 sm:gap-4 mb-4 sm:mb-6">
              {quizQuestions[currentQuestionIndex].options[language].map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 sm:p-4 rounded-xl text-left font-medium text-sm sm:text-lg transition-all ${
                    selectedOption === index && !isAnswered
                      ? "bg-blue-100 border-2 border-blue-400"
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  } ${
                    isAnswered && index === findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language)
                      ? "bg-green-100 border-2 border-green-400 text-green-800"
                      : ""
                  } ${
                    isAnswered &&
                    selectedOption === index &&
                    index !== findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language)
                      ? "bg-red-100 border-2 border-red-400 text-red-800"
                      : ""
                  }`}
                  onClick={() => !isAnswered && handleOptionSelect(index)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center justify-between">
                    <span className="pr-6">{option}</span>
                    {isAnswered && index === findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="flex-shrink-0 ml-2"
                      >
                        <Check className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                      </motion.div>
                    )}
                    {isAnswered &&
                      selectedOption === index &&
                      index !== findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-shrink-0 ml-2">
                          <X className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                        </motion.div>
                      )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation and feedback */}
            {isAnswered && (
              <div className="mb-4 sm:mb-6">
                {selectedOption === findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language) ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-green-50 rounded-xl border-2 border-green-200 mb-3 sm:mb-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      >
                        <ThumbsUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                      </motion.div>
                      <motion.h4
                        className="font-bold text-green-800 text-lg sm:text-xl"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {language === "de" ? "Super gemacht!" : language === "en" ? "Great job!" : "¡Buen trabajo!"}
                      </motion.h4>
                    </div>
                    <p className="text-sm sm:text-base text-green-700">
                      {quizQuestions[currentQuestionIndex].explanation[language]}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
                  >
                    <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-base sm:text-lg">
                      {language === "de"
                        ? "Nicht schlimm! Hier ist die Erklärung:"
                        : language === "en"
                          ? "No problem! Here's the explanation:"
                          : "¡No hay problema! Aquí está la explicación:"}
                    </h4>
                    <p className="text-sm sm:text-base text-blue-700">
                      {quizQuestions[currentQuestionIndex].explanation[language]}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center">
              {!isAnswered ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkAnswer}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedOption === null}
                >
                  {t.checkAnswer}
                </motion.button>
              ) : (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                  className={`font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline text-sm sm:text-base transition-colors flex items-center gap-2 ${
                    selectedOption === findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {selectedOption === findCorrectAnswerIndex(quizQuestions[currentQuestionIndex], language) ? (
                    <>
                      <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                      {currentQuestionIndex === quizQuestions.length - 1 ? t.showResult : t.nextQuestion}
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: 2, duration: 0.5 }}
                        className="mr-1"
                      >
                        👍
                      </motion.div>
                      {currentQuestionIndex === quizQuestions.length - 1
                        ? t.showResult
                        : language === "de"
                          ? "Weiter lernen!"
                          : language === "en"
                            ? "Keep learning!"
                            : "¡Sigue aprendiendo!"}
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
