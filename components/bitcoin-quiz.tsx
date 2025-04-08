"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { HelpCircle, Brain, Zap, Check, X, Star, ThumbsUp, Award, Bitcoin } from "lucide-react"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"

// Unterstützte Sprachen
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

// Übersetzungen für die UI-Elemente
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
    "next Question": "Next Question",
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

// Funktion zum Ersetzen von Platzhaltern in Übersetzungen
function formatMessage(message: string, replacements: Record<string, string | number>): string {
  let result = message
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{${key}}`, String(value))
  }
  return result
}

// Einfache Funktion zum Mischen der Antwortmöglichkeiten
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

  // UI-Übersetzungen für die aktuelle Sprache
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
    {
      id: 10,
      question: {
        de: "Kann man einen Teil eines Bitcoins besitzen?",
        en: "Can you own a part of a Bitcoin?",
        es: "¿Puedes poseer una parte de un Bitcoin?",
      },
      options: {
        de: [
          "Nein, nur ganze Bitcoins",
          "Ja, man kann auch kleine Teile besitzen",
          "Nur wenn man erwachsen ist",
          "Nur in Amerika",
        ],
        en: ["No, only whole Bitcoins", "Yes, you can own small parts", "Only if you're an adult", "Only in America"],
        es: [
          "No, solo Bitcoins enteros",
          "Sí, puedes poseer partes pequeñas",
          "Solo si eres adulto",
          "Solo en América",
        ],
      },
      correctAnswer: 1,
      explanation: {
        de: "Ja! Ein Bitcoin kann in winzig kleine Teile geteilt werden. Der kleinste Teil heißt 'Satoshi' - nach dem Erfinder benannt!",
        en: "Yes! A Bitcoin can be divided into tiny parts. The smallest part is called a 'Satoshi' - named after the inventor!",
        es: "¡Sí! Un Bitcoin puede dividirse en partes muy pequeñas. La parte más pequeña se llama 'Satoshi', ¡nombrada así por el inventor!",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-100 border-pink-300",
    },
    {
      id: 11,
      question: {
        de: "Welche Farbe hat das Bitcoin-Symbol?",
        en: "What color is the Bitcoin symbol?",
        es: "¿De qué color es el símbolo de Bitcoin?",
      },
      options: {
        de: ["Rot", "Blau", "Grün", "Orange"],
        en: ["Red", "Blue", "Green", "Orange"],
        es: ["Rojo", "Azul", "Verde", "Naranja"],
      },
      correctAnswer: 3,
      explanation: {
        de: "Das Bitcoin-Symbol ist orange, wie eine glänzende Münze!",
        en: "The Bitcoin symbol is orange, like a shiny coin!",
        es: "¡El símbolo de Bitcoin es naranja, como una moneda brillante!",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 border-orange-300",
    },
    {
      id: 12,
      question: {
        de: "Braucht man für Bitcoin einen Computer?",
        en: "Do you need a computer for Bitcoin?",
        es: "¿Necesitas una computadora para Bitcoin?",
      },
      options: {
        de: [
          "Nein, man braucht eine Schatzkiste",
          "Ja, oder ein Smartphone",
          "Nein, man braucht einen Roboter",
          "Nein, man braucht einen Zauberstab",
        ],
        en: [
          "No, you need a treasure chest",
          "Yes, or a smartphone",
          "No, you need a robot",
          "No, you need a magic wand",
        ],
        es: [
          "No, necesitas un cofre del tesoro",
          "Sí, o un teléfono inteligente",
          "No, necesitas un robot",
          "No, necesitas una varita mágica",
        ],
      },
      correctAnswer: 1,
      explanation: {
        de: "Ja, für Bitcoin braucht man einen Computer oder ein Smartphone, um die digitale Geldbörse zu benutzen.",
        en: "Yes, for Bitcoin you need a computer or smartphone to use the digital wallet.",
        es: "Sí, para Bitcoin necesitas una computadora o un teléfono inteligente para usar la billetera digital.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 13,
      question: {
        de: "Wie sieht ein Bitcoin aus?",
        en: "What does a Bitcoin look like?",
        es: "¿Cómo se ve un Bitcoin?",
      },
      options: {
        de: [
          "Wie eine goldene Münze mit einem B",
          "Wie ein Regenbogen",
          "Wie Zahlen im Computer",
          "Wie ein kleiner Roboter",
        ],
        en: ["Like a golden coin with a B", "Like a rainbow", "Like numbers in the computer", "Like a small robot"],
        es: [
          "Como una moneda dorada con una B",
          "Como un arcoíris",
          "Como números en la computadora",
          "Como un pequeño robot",
        ],
      },
      correctAnswer: 2,
      explanation: {
        de: "Bitcoin besteht eigentlich nur aus Zahlen im Computer. Die goldenen Münzen mit dem B sind nur Bilder, die Bitcoin darstellen sollen.",
        en: "Bitcoin actually consists only of numbers in the computer. The golden coins with the B are just images meant to represent Bitcoin.",
        es: "Bitcoin en realidad consiste solo en números en la computadora. Las monedas doradas con la B son solo imágenes destinadas a representar Bitcoin.",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 14,
      question: {
        de: "Kann man Bitcoin anfassen?",
        en: "Can you touch Bitcoin?",
        es: "¿Puedes tocar Bitcoin?",
      },
      options: {
        de: [
          "Ja, es fühlt sich weich an",
          "Ja, es ist kalt wie Metall",
          "Nein, es ist nur digital",
          "Ja, aber nur mit Handschuhen",
        ],
        en: ["Yes, it feels soft", "Yes, it's cold like metal", "No, it's only digital", "Yes, but only with gloves"],
        es: ["Sí, se siente suave", "Sí, está frío como el metal", "No, es solo digital", "Sí, pero solo con guantes"],
      },
      correctAnswer: 2,
      explanation: {
        de: "Nein, Bitcoin kann man nicht anfassen, weil es nur digital im Computer existiert. Es gibt keine echten Münzen zum Anfassen.",
        en: "No, you can't touch Bitcoin because it only exists digitally in the computer. There are no real coins to touch.",
        es: "No, no puedes tocar Bitcoin porque solo existe digitalmente en la computadora. No hay monedas reales para tocar.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 15,
      question: {
        de: "Wer kann Bitcoin benutzen?",
        en: "Who can use Bitcoin?",
        es: "¿Quién puede usar Bitcoin?",
      },
      options: {
        de: ["Nur Erwachsene", "Nur Computerprofis", "Nur reiche Menschen", "Jeder Mensch"],
        en: ["Only adults", "Only computer professionals", "Only rich people", "Every person"],
        es: ["Solo adultos", "Solo profesionales informáticos", "Solo personas ricas", "Cada persona"],
      },
      correctAnswer: 3,
      explanation: {
        de: "Jeder Mensch auf der Welt kann Bitcoin benutzen, egal wie alt er ist oder wo er wohnt!",
        en: "Anyone in the world can use Bitcoin, no matter how old they are or where they live!",
        es: "¡Cualquier persona en el mundo puede usar Bitcoin, sin importar su edad o dónde viva!",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 16,
      question: {
        de: "Was bedeutet das ₿-Symbol?",
        en: "What does the ₿ symbol mean?",
        es: "¿Qué significa el símbolo ₿?",
      },
      options: {
        de: ["Banane", "Brot", "Bitcoin", "Baum"],
        en: ["Banana", "Bread", "Bitcoin", "Tree"],
        es: ["Plátano", "Pan", "Bitcoin", "Árbol"],
      },
      correctAnswer: 2,
      explanation: {
        de: "Das ₿-Symbol steht für Bitcoin, genau wie das €-Symbol für Euro steht.",
        en: "The ₿ symbol stands for Bitcoin, just like the € symbol stands for Euro.",
        es: "El símbolo ₿ representa Bitcoin, al igual que el símbolo € representa Euro.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: 101,
      question: {
        de: "Was braucht man, um Bitcoin zu benutzen?",
        en: "What do you need to use Bitcoin?",
        es: "¿Qué necesitas para usar Bitcoin?",
      },
      options: {
        de: ["Ein Handy oder Computer", "Einen Lolli", "Einen Geldschein", "Einen Einkaufskorb"],
        en: ["A phone or computer", "A lollipop", "A banknote", "A shopping basket"],
        es: ["Un teléfono o computadora", "Un caramelo", "Un billete", "Una cesta de compras"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Um Bitcoin zu benutzen, braucht man ein Handy oder einen Computer mit Internet, um die digitale Geldbörse zu verwenden.",
        en: "To use Bitcoin, you need a phone or computer with internet to use the digital wallet.",
        es: "Para usar Bitcoin, necesitas un teléfono o una computadora con internet para usar la billetera digital.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 102,
      question: {
        de: "Was ist eine Bitcoin-Adresse?",
        en: "What is a Bitcoin address?",
        es: "¿Qué es una dirección de Bitcoin?",
      },
      options: {
        de: [
          "Eine Straße für Computer",
          "Eine Postadresse",
          "Eine Zahl-Buchstaben-Kombination zum Empfangen",
          "Ein Geheimwort",
        ],
        en: [
          "A street for computers",
          "A postal address",
          "A number-letter combination for receiving",
          "A secret word",
        ],
        es: [
          "Una calle para computadoras",
          "Una dirección postal",
          "Una combinación de números y letras para recibir",
          "Una palabra secreta",
        ],
      },
      correctAnswer: 2,
      explanation: {
        de: "Eine Bitcoin-Adresse ist eine spezielle Kombination aus Zahlen und Buchstaben, die wie eine Kontonummer funktioniert, um Bitcoin zu empfangen.",
        en: "A Bitcoin address is a special combination of numbers and letters that works like an account number to receive Bitcoin.",
        es: "Una dirección de Bitcoin es una combinación especial de números y letras que funciona como un número de cuenta para recibir Bitcoin.",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 103,
      question: {
        de: "Mit welchem Gerät kann man Bitcoin sehen?",
        en: "With which device can you see Bitcoin?",
        es: "¿Con qué dispositivo puedes ver Bitcoin?",
      },
      options: {
        de: ["Nur mit einer Lupe", "Auf dem Bildschirm", "In einer Glaskugel", "In einem Fotoalbum"],
        en: ["Only with a magnifying glass", "On the screen", "In a crystal ball", "In a photo album"],
        es: ["Solo con una lupa", "En la pantalla", "En una bola de cristal", "En un álbum de fotos"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Bitcoin kann man auf dem Bildschirm eines Computers, Tablets oder Smartphones sehen, wenn man eine Bitcoin-Wallet-App benutzt.",
        en: "You can see Bitcoin on the screen of a computer, tablet, or smartphone when using a Bitcoin wallet app.",
        es: "Puedes ver Bitcoin en la pantalla de una computadora, tableta o teléfono inteligente cuando usas una aplicación de billetera Bitcoin.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 104,
      question: {
        de: "Was bedeutet 'digital'?",
        en: "What does 'digital' mean?",
        es: "¿Qué significa 'digital'?",
      },
      options: {
        de: ["Es ist aus Papier", "Es ist auf dem Bildschirm", "Man kann es essen", "Es ist aus Holz"],
        en: ["It's made of paper", "It's on the screen", "You can eat it", "It's made of wood"],
        es: ["Está hecho de papel", "Está en la pantalla", "Puedes comerlo", "Está hecho de madera"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Digital bedeutet, dass etwas auf Computern und Bildschirmen existiert und nicht physisch anfassbar ist.",
        en: "Digital means that something exists on computers and screens and is not physically touchable.",
        es: "Digital significa que algo existe en computadoras y pantallas y no es físicamente tangible.",
      },
      category: "easy",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 105,
      question: {
        de: "Wer kontrolliert Bitcoin?",
        en: "Who controls Bitcoin?",
        es: "¿Quién controla Bitcoin?",
      },
      options: {
        de: ["Eine Schule", "Ein König", "Niemand – es ist für alle da", "Nur Erwachsene"],
        en: ["A school", "A king", "Nobody – it's for everyone", "Only adults"],
        es: ["Una escuela", "Un rey", "Nadie – es para todos", "Solo adultos"],
      },
      correctAnswer: 2,
      explanation: {
        de: "Bitcoin wird von niemandem kontrolliert. Es gehört allen Menschen, die es benutzen, und funktioniert durch Regeln, auf die sich alle geeinigt haben.",
        en: "Bitcoin is not controlled by anyone. It belongs to all the people who use it and works through rules that everyone has agreed on.",
        es: "Bitcoin no está controlado por nadie. Pertenece a todas las personas que lo usan y funciona a través de reglas en las que todos han acordado.",
      },
      category: "easy",
      icon: <HelpCircle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },

    // MEDIUM QUESTIONS (15)
    {
      id: 3,
      question: {
        de: "Wie viele Bitcoins gibt es insgesamt?",
        en: "How many Bitcoins are there in total?",
        es: "¿Cuántos Bitcoins hay en total?",
      },
      options: {
        de: ["Unendlich viele", "21 Millionen", "100 Millionen", "1000"],
        en: ["Infinitely many", "21 million", "100 million", "1000"],
        es: ["Infinitamente muchos", "21 millones", "100 millones", "1000"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Es gibt nur 21 Millionen Bitcoins - nicht mehr und nicht weniger!",
        en: "There are only 21 million Bitcoins - no more and no less!",
        es: "¡Solo hay 21 millones de Bitcoins, ni más ni menos!",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 5,
      question: {
        de: "Wer passt auf, dass niemand bei Bitcoin schummelt?",
        en: "Who makes sure that nobody cheats with Bitcoin?",
        es: "¿Quién se asegura de que nadie haga trampa con Bitcoin?",
      },
      options: {
        de: ["Die Polizei", "Mama und Papa", "Niemand passt auf", "Viele Computer zusammen"],
        en: ["The police", "Mom and Dad", "Nobody watches", "Many computers together"],
        es: ["La policía", "Mamá y papá", "Nadie vigila", "Muchas computadoras juntas"],
      },
      correctAnswer: 3,
      explanation: {
        de: "Viele Computer auf der ganzen Welt passen gemeinsam auf, dass niemand schummeln kann.",
        en: "Many computers around the world work together to make sure that nobody can cheat.",
        es: "Muchas computadoras en todo el mundo trabajan juntas para asegurarse de que nadie pueda hacer trampa.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },
    {
      id: 6,
      question: {
        de: "Wer hat Bitcoin erfunden?",
        en: "Who invented Bitcoin?",
        es: "¿Quién inventó Bitcoin?",
      },
      options: {
        de: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "Ein Roboter"],
        en: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "A robot"],
        es: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "Un robot"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin wurde von einer Person oder Gruppe mit dem Namen Satoshi Nakamoto erfunden. Niemand weiß, wer wirklich dahinter steckt!",
        en: "Bitcoin was invented by a person or group with the name Satoshi Nakamoto. Nobody knows who is really behind it!",
        es: "Bitcoin fue inventado por una persona o grupo con el nombre de Satoshi Nakamoto. ¡Nadie sabe quién está realmente detrás!",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 9,
      question: {
        de: "Was ist das 'Lightning Network'?",
        en: "What is the 'Lightning Network'?",
        es: "¿Qué es la 'Red Lightning'?",
      },
      options: {
        de: ["Ein Gewitter", "Ein schnelles Netzwerk für Bitcoin-Zahlungen", "Ein Computerspiel", "Ein Blitzableiter"],
        en: ["A thunderstorm", "A fast network for Bitcoin payments", "A computer game", "A lightning rod"],
        es: ["Una tormenta", "Una red rápida para pagos Bitcoin", "Un juego de computadora", "Un pararrayos"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Das Lightning Network ist wie eine Überholspur für Bitcoin. Es macht Zahlungen super schnell und günstig!",
        en: "The Lightning Network is like a fast lane for Bitcoin. It makes payments super fast and cheap!",
        es: "La Red Lightning es como un carril rápido para Bitcoin. ¡Hace que los pagos sean súper rápidos y baratos!",
      },
      category: "medium",
      icon: <Zap className="h-6 w-6 text-cyan-500" />,
      color: "bg-cyan-100 border-cyan-300",
    },
    {
      id: 17,
      question: {
        de: "Was ist ein 'Bitcoin-Miner'?",
        en: "What is a 'Bitcoin miner'?",
        es: "¿Qué es un 'minero de Bitcoin'?",
      },
      options: {
        de: [
          "Ein Bergarbeiter, der nach Gold sucht",
          "Ein Computer, der Bitcoin-Rätsel löst",
          "Ein Roboter, der Münzen sammelt",
          "Ein Mensch, der Bitcoin verkauft",
        ],
        en: [
          "A miner who looks for gold",
          "A computer that solves Bitcoin puzzles",
          "A robot that collects coins",
          "A person who sells Bitcoin",
        ],
        es: [
          "Un minero que busca oro",
          "Una computadora que resuelve acertijos de Bitcoin",
          "Un robot que colecciona monedas",
          "Una persona que vende Bitcoin",
        ],
      },
      correctAnswer: 1,
      explanation: {
        de: "Ein Bitcoin-Miner ist ein Computer, der schwierige Rätsel löst, um neue Bitcoins zu erschaffen und Transaktionen zu bestätigen.",
        en: "A Bitcoin miner is a computer that solves difficult puzzles to create new Bitcoins and confirm transactions.",
        es: "Un minero de Bitcoin es una computadora que resuelve acertijos difíciles para crear nuevos Bitcoins y confirmar transacciones.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-100 border-indigo-300",
    },
    {
      id: 201,
      question: {
        de: "Was ist die Blockchain?",
        en: "What is the blockchain?",
        es: "¿Qué es la blockchain?",
      },
      options: {
        de: ["Eine Spielkette", "Eine Art digitales Kassenbuch", "Eine Eisenbahn", "Ein Passwort"],
        en: ["A play chain", "A kind of digital ledger", "A railway", "A password"],
        es: ["Una cadena de juego", "Una especie de libro de contabilidad digital", "Un ferrocarril", "Una contraseña"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Die Blockchain ist wie ein digitales Kassenbuch, in dem alle Bitcoin-Transaktionen gespeichert werden. Jeder kann es einsehen, aber niemand kann es fälschen.",
        en: "The blockchain is like a digital ledger where all Bitcoin transactions are stored. Everyone can see it, but no one can fake it.",
        es: "La blockchain es como un libro de contabilidad digital donde se almacenan todas las transacciones de Bitcoin. Todos pueden verlo, pero nadie puede falsificarlo.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 202,
      question: {
        de: "Was passiert, wenn man seinen Wallet-Zugang verliert?",
        en: "What happens if you lose access to your wallet?",
        es: "¿Qué sucede si pierdes el acceso a tu billetera?",
      },
      options: {
        de: ["Die Bitcoins sind weg", "Man bekommt sie per Post", "Man ruft die Polizei", "Der Computer piept"],
        en: ["The Bitcoins are gone", "You get them by mail", "You call the police", "The computer beeps"],
        es: [
          "Los Bitcoins se pierden",
          "Los recibes por correo",
          "Llamas a la policía",
          "La computadora emite un pitido",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Wenn du den Zugang zu deiner Wallet verlierst und keine Sicherheitskopie (Backup) hast, sind deine Bitcoins für immer verloren. Deshalb ist es wichtig, den Zugang sicher aufzubewahren!",
        en: "If you lose access to your wallet and don't have a backup, your Bitcoins are lost forever. That's why it's important to keep your access safe!",
        es: "Si pierdes el acceso a tu billetera y no tienes una copia de seguridad, tus Bitcoins se pierden para siempre. ¡Por eso es importante mantener tu acceso seguro!",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },
    {
      id: 203,
      question: {
        de: "Warum ist Bitcoin dezentral?",
        en: "Why is Bitcoin decentralized?",
        es: "¿Por qué Bitcoin es descentralizado?",
      },
      options: {
        de: [
          "Es gehört niemandem allein",
          "Weil es rund ist",
          "Weil es aus Zucker ist",
          "Weil es nur nachts funktioniert",
        ],
        en: [
          "It doesn't belong to anyone alone",
          "Because it's round",
          "Because it's made of sugar",
          "Because it only works at night",
        ],
        es: [
          "No pertenece a nadie solo",
          "Porque es redondo",
          "Porque está hecho de azúcar",
          "Porque solo funciona de noche",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin ist dezentral, weil es nicht von einer einzelnen Person, Bank oder Regierung kontrolliert wird. Stattdessen wird es von vielen Computern auf der ganzen Welt gemeinsam betrieben.",
        en: "Bitcoin is decentralized because it is not controlled by a single person, bank, or government. Instead, it is operated jointly by many computers around the world.",
        es: "Bitcoin es descentralizado porque no está controlado por una sola persona, banco o gobierno. En cambio, es operado conjuntamente por muchas computadoras en todo el mundo.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 204,
      question: {
        de: "Was ist ein Seed (Wiederherstellungsschlüssel)?",
        en: "What is a seed (recovery key)?",
        es: "¿Qué es una semilla (clave de recuperación)?",
      },
      options: {
        de: ["Eine Reihe von geheimen Wörtern", "Ein Apfelkern", "Ein Magnet", "Ein Spielzeug"],
        en: ["A series of secret words", "An apple core", "A magnet", "A toy"],
        es: ["Una serie de palabras secretas", "El corazón de una manzana", "Un imán", "Un juguete"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Seed ist eine Reihe von geheimen Wörtern (meist 12 oder 24), die du aufschreiben und sicher aufbewahren solltest. Mit ihnen kannst du deine Wallet wiederherstellen, falls du dein Gerät verlierst.",
        en: "A seed is a series of secret words (usually 12 or 24) that you should write down and keep safe. With them, you can restore your wallet if you lose your device.",
        es: "Una semilla es una serie de palabras secretas (generalmente 12 o 24) que debes anotar y mantener seguras. Con ellas, puedes restaurar tu billetera si pierdes tu dispositivo.",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 205,
      question: {
        de: "Warum ist Bitcoin sicher?",
        en: "Why is Bitcoin secure?",
        es: "¿Por qué Bitcoin es seguro?",
      },
      options: {
        de: [
          "Weil viele Computer es prüfen",
          "Weil es niemand benutzt",
          "Weil es einen Schlüssel hat",
          "Weil es alt ist",
        ],
        en: ["Because many computers check it", "Because nobody uses it", "Because it has a key", "Because it's old"],
        es: [
          "Porque muchas computadoras lo verifican",
          "Porque nadie lo usa",
          "Porque tiene una llave",
          "Porque es viejo",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin ist sicher, weil tausende Computer auf der ganzen Welt jede Transaktion überprüfen und bestätigen. Diese Computer arbeiten zusammen, um Betrug zu verhindern.",
        en: "Bitcoin is secure because thousands of computers around the world check and confirm every transaction. These computers work together to prevent fraud.",
        es: "Bitcoin es seguro porque miles de computadoras en todo el mundo verifican y confirman cada transacción. Estas computadoras trabajan juntas para prevenir el fraude.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 206,
      question: {
        de: "Kann man Bitcoin fälschen?",
        en: "Can you counterfeit Bitcoin?",
        es: "¿Puedes falsificar Bitcoin?",
      },
      options: {
        de: [
          "Ja, mit viel Kleber",
          "Nein, das ist fast unmöglich",
          "Nur bei Vollmond",
          "Ja, wenn man schnell genug ist",
        ],
        en: [
          "Yes, with lots of glue",
          "No, it's almost impossible",
          "Only during a full moon",
          "Yes, if you're fast enough",
        ],
        es: [
          "Sí, con mucho pegamento",
          "No, es casi imposible",
          "Solo durante la luna llena",
          "Sí, si eres lo suficientemente rápido",
        ],
      },
      correctAnswer: 1,
      explanation: {
        de: "Nein, Bitcoin zu fälschen ist praktisch unmöglich, weil die Blockchain und die Kryptographie es sehr sicher machen. Alle Computer im Netzwerk würden eine Fälschung sofort erkennen.",
        en: "No, counterfeiting Bitcoin is practically impossible because the blockchain and cryptography make it very secure. All computers in the network would immediately detect a forgery.",
        es: "No, falsificar Bitcoin es prácticamente imposible porque la blockchain y la criptografía lo hacen muy seguro. Todas las computadoras en la red detectarían inmediatamente una falsificación.",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 207,
      question: {
        de: "Warum schwankt der Bitcoin-Preis?",
        en: "Why does the Bitcoin price fluctuate?",
        es: "¿Por qué fluctúa el precio de Bitcoin?",
      },
      options: {
        de: [
          "Weil Angebot und Nachfrage sich ändern",
          "Weil der Mond wechselt",
          "Weil Kinder damit spielen",
          "Weil das WLAN spinnt",
        ],
        en: [
          "Because supply and demand change",
          "Because the moon changes",
          "Because children play with it",
          "Because the WiFi is acting up",
        ],
        es: [
          "Porque la oferta y la demanda cambian",
          "Porque la luna cambia",
          "Porque los niños juegan con él",
          "Porque el WiFi está fallando",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Der Bitcoin-Preis schwankt, weil sich Angebot und Nachfrage ständig ändern. Wenn mehr Menschen Bitcoin kaufen wollen, steigt der Preis. Wenn mehr verkaufen wollen, sinkt er.",
        en: "The Bitcoin price fluctuates because supply and demand constantly change. When more people want to buy Bitcoin, the price rises. When more want to sell, it falls.",
        es: "El precio de Bitcoin fluctúa porque la oferta y la demanda cambian constantemente. Cuando más personas quieren comprar Bitcoin, el precio sube. Cuando más quieren vender, baja.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-100 border-pink-300",
    },
    {
      id: 208,
      question: {
        de: "Wie bekommt man Bitcoin?",
        en: "How do you get Bitcoin?",
        es: "¿Cómo se obtiene Bitcoin?",
      },
      options: {
        de: ["Man kauft, bekommt oder verdient sie", "Nur durch Zauber", "Aus dem Drucker", "Im Spielzeugladen"],
        en: ["You buy, receive, or earn them", "Only through magic", "From the printer", "In the toy store"],
        es: ["Los compras, recibes o ganas", "Solo a través de magia", "De la impresora", "En la juguetería"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Man kann Bitcoin kaufen (z.B. an einer Börse), als Geschenk bekommen, für Arbeit oder Produkte bezahlt werden oder durch Mining verdienen.",
        en: "You can buy Bitcoin (e.g., on an exchange), receive it as a gift, get paid for work or products, or earn it through mining.",
        es: "Puedes comprar Bitcoin (por ejemplo, en un intercambio), recibirlo como regalo, recibir pago por trabajo o productos, o ganarlo a través de la minería.",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-100 border-indigo-300",
    },
    {
      id: 209,
      question: {
        de: "Was ist ein Satoshi?",
        en: "What is a Satoshi?",
        es: "¿Qué es un Satoshi?",
      },
      options: {
        de: ["Ein ganz kleiner Teil eines Bitcoins", "Eine japanische Süßigkeit", "Ein Zauberwort", "Eine App"],
        en: ["A very small part of a Bitcoin", "A Japanese sweet", "A magic word", "An app"],
        es: ["Una parte muy pequeña de un Bitcoin", "Un dulce japonés", "Una palabra mágica", "Una aplicación"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Satoshi ist der kleinste Teil eines Bitcoins, benannt nach dem Bitcoin-Erfinder. Ein Bitcoin besteht aus 100 Millionen Satoshis, so wie ein Euro aus 100 Cent besteht.",
        en: "A Satoshi is the smallest part of a Bitcoin, named after the Bitcoin inventor. One Bitcoin consists of 100 million Satoshis, just as one Euro consists of 100 cents.",
        es: "Un Satoshi es la parte más pequeña de un Bitcoin, nombrado así por el inventor de Bitcoin. Un Bitcoin consta de 100 millones de Satoshis, así como un Euro consta de 100 céntimos.",
      },
      category: "medium",
      icon: <Brain className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 210,
      question: {
        de: "Warum haben manche Menschen Angst vor Bitcoin?",
        en: "Why are some people afraid of Bitcoin?",
        es: "¿Por qué algunas personas tienen miedo de Bitcoin?",
      },
      options: {
        de: ["Weil sie es nicht verstehen", "Weil es beißt", "Weil es fliegt", "Weil es singt"],
        en: ["Because they don't understand it", "Because it bites", "Because it flies", "Because it sings"],
        es: ["Porque no lo entienden", "Porque muerde", "Porque vuela", "Porque canta"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Manche Menschen haben Angst vor Bitcoin, weil sie es nicht verstehen oder weil es neu und anders ist als das Geld, das sie kennen. Manchmal haben Menschen Angst vor Dingen, die sie nicht kennen.",
        en: "Some people are afraid of Bitcoin because they don't understand it or because it's new and different from the money they know. Sometimes people are afraid of things they don't know.",
        es: "Algunas personas tienen miedo de Bitcoin porque no lo entienden o porque es nuevo y diferente del dinero que conocen. A veces las personas tienen miedo de las cosas que no conocen.",
      },
      category: "medium",
      icon: <HelpCircle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },

    // HARD QUESTIONS (15)
    {
      id: 7,
      question: {
        de: "Was ist ein 'Block' bei Bitcoin?",
        en: "What is a 'block' in Bitcoin?",
        es: "¿Qué es un 'bloque' en Bitcoin?",
      },
      options: {
        de: ["Ein Spielzeugbaustein", "Eine Gruppe von Transaktionen", "Ein Passwort", "Ein Computer"],
        en: ["A toy building block", "A group of transactions", "A password", "A computer"],
        es: ["Un bloque de juguete", "Un grupo de transacciones", "Una contraseña", "Una computadora"],
      },
      correctAnswer: 1,
      explanation: {
        de: "Ein Block ist wie eine Seite in einem Buch, auf der viele Bitcoin-Überweisungen aufgeschrieben werden.",
        en: "A block is like a page in a book where many Bitcoin transactions are recorded.",
        es: "Un bloque es como una página en un libro donde se registran muchas transacciones de Bitcoin.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-100 border-indigo-300",
    },
    {
      id: 8,
      question: {
        de: "Was passiert, wenn alle 21 Millionen Bitcoins gefunden wurden?",
        en: "What happens when all 21 million Bitcoins have been found?",
        es: "¿Qué sucede cuando se han encontrado todos los 21 millones de Bitcoins?",
      },
      options: {
        de: [
          "Bitcoin verschwindet",
          "Es werden keine neuen Bitcoins mehr erschaffen",
          "Alle Computer explodieren",
          "Die Welt geht unter",
        ],
        en: ["Bitcoin disappears", "No new Bitcoins will be created", "All computers explode", "The world ends"],
        es: [
          "Bitcoin desaparece",
          "No se crearán nuevos Bitcoins",
          "Todas las computadoras explotan",
          "El mundo termina",
        ],
      },
      correctAnswer: 1,
      explanation: {
        de: "Wenn alle 21 Millionen Bitcoins gefunden wurden, werden keine neuen mehr erschaffen. Die vorhandenen Bitcoins werden aber weiter benutzt.",
        en: "When all 21 million Bitcoins have been found, no new ones will be created. But the existing Bitcoins will continue to be used.",
        es: "Cuando se hayan encontrado todos los 21 millones de Bitcoins, no se crearán nuevos. Pero los Bitcoins existentes seguirán siendo utilizados.",
      },
      category: "hard",
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 border-orange-300",
    },
    {
      id: 301,
      question: {
        de: "Was ist ein 'Node' im Bitcoin-Netzwerk?",
        en: "What is a 'node' in the Bitcoin network?",
        es: "¿Qué es un 'nodo' en la red Bitcoin?",
      },
      options: {
        de: [
          "Ein Computer, der Bitcoin-Daten speichert und prüft",
          "Eine Ladestation",
          "Ein Taschenrechner",
          "Eine App",
        ],
        en: ["A computer that stores and verifies Bitcoin data", "A charging station", "A calculator", "An app"],
        es: [
          "Una computadora que almacena y verifica datos de Bitcoin",
          "Una estación de carga",
          "Una calculadora",
          "Una aplicación",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Node (Knoten) ist ein Computer, der eine Kopie der gesamten Bitcoin-Blockchain speichert und hilft, Transaktionen zu überprüfen und zu bestätigen.",
        en: "A node is a computer that stores a copy of the entire Bitcoin blockchain and helps verify and confirm transactions.",
        es: "Un nodo es una computadora que almacena una copia de toda la blockchain de Bitcoin y ayuda a verificar y confirmar transacciones.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 302,
      question: {
        de: "Was bedeutet Peer-to-Peer?",
        en: "What does Peer-to-Peer mean?",
        es: "¿Qué significa Peer-to-Peer?",
      },
      options: {
        de: ["Menschen senden direkt untereinander", "Man schaut Fernsehen", "Man spielt zu zweit", "Ein Tierfreund"],
        en: ["People send directly to each other", "You watch TV", "You play with two people", "An animal friend"],
        es: [
          "Las personas envían directamente entre sí",
          "Ves televisión",
          "Juegas con dos personas",
          "Un amigo animal",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Peer-to-Peer bedeutet, dass Menschen direkt miteinander kommunizieren oder Daten austauschen können, ohne dass eine zentrale Stelle (wie eine Bank) dazwischen steht.",
        en: "Peer-to-Peer means that people can communicate or exchange data directly with each other without a central authority (like a bank) in between.",
        es: "Peer-to-Peer significa que las personas pueden comunicarse o intercambiar datos directamente entre sí sin una autoridad central (como un banco) en el medio.",
      },
      category: "hard",
      icon: <HelpCircle className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 303,
      question: {
        de: "Was ist ein On-Chain-Transfer?",
        en: "What is an On-Chain Transfer?",
        es: "¿Qué es una transferencia On-Chain?",
      },
      options: {
        de: ["Eine normale Bitcoin-Zahlung in der Blockchain", "Ein Kettenbrief", "Ein Bitcoin-Spiel", "Eine E-Mail"],
        en: ["A normal Bitcoin payment in the blockchain", "A chain letter", "A Bitcoin game", "An email"],
        es: [
          "Un pago normal de Bitcoin en la blockchain",
          "Una carta en cadena",
          "Un juego de Bitcoin",
          "Un correo electrónico",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein On-Chain-Transfer ist eine normale Bitcoin-Transaktion, die direkt in der Blockchain gespeichert wird. Sie ist sicher, aber kann bei vielen Transaktionen langsamer und teurer sein als Lightning-Zahlungen.",
        en: "An On-Chain Transfer is a normal Bitcoin transaction that is stored directly in the blockchain. It is secure but can be slower and more expensive than Lightning payments when there are many transactions.",
        es: "Una transferencia On-Chain es una transacción normal de Bitcoin que se almacena directamente en la blockchain. Es segura, pero puede ser más lenta y costosa que los pagos Lightning cuando hay muchas transacciones.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },
    {
      id: 304,
      question: {
        de: "Warum ist Bitcoin begrenzt auf 21 Millionen?",
        en: "Why is Bitcoin limited to 21 million?",
        es: "¿Por qué Bitcoin está limitado a 21 millones?",
      },
      options: {
        de: [
          "Damit es selten und wertvoll bleibt",
          "Weil kein Speicher mehr frei war",
          "Weil das Internet sonst überläuft",
          "Weil die Zahlen aufhören",
        ],
        en: [
          "So it remains rare and valuable",
          "Because there was no more storage space",
          "Because otherwise the internet would overflow",
          "Because the numbers stop",
        ],
        es: [
          "Para que siga siendo raro y valioso",
          "Porque no había más espacio de almacenamiento",
          "Porque de lo contrario internet se desbordaría",
          "Porque los números se detienen",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin ist auf 21 Millionen begrenzt, damit es selten und wertvoll bleibt, ähnlich wie Gold. Diese Begrenzung wurde vom Erfinder Satoshi Nakamoto festgelegt, um Inflation zu verhindern.",
        en: "Bitcoin is limited to 21 million to keep it rare and valuable, similar to gold. This limit was set by the inventor Satoshi Nakamoto to prevent inflation.",
        es: "Bitcoin está limitado a 21 millones para mantenerlo raro y valioso, similar al oro. Este límite fue establecido por el inventor Satoshi Nakamoto para prevenir la inflación.",
      },
      category: "hard",
      icon: <HelpCircle className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 305,
      question: {
        de: "Was ist ein Hash?",
        en: "What is a hash?",
        es: "¿Qué es un hash?",
      },
      options: {
        de: [
          "Eine eindeutige Zeichenkette für Daten",
          "Ein Gericht aus Kartoffeln",
          "Ein Werkzeug",
          "Eine Zauberformel",
        ],
        en: ["A unique string of characters for data", "A dish made of potatoes", "A tool", "A magic formula"],
        es: [
          "Una cadena única de caracteres para datos",
          "Un plato hecho de patatas",
          "Una herramienta",
          "Una fórmula mágica",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Hash ist wie ein digitaler Fingerabdruck für Daten. Er verwandelt beliebige Daten in eine eindeutige Zeichenkette fester Länge. Bei Bitcoin werden Hashes verwendet, um Blöcke zu verknüpfen und die Sicherheit zu gewährleisten.",
        en: "A hash is like a digital fingerprint for data. It transforms any data into a unique string of characters of fixed length. In Bitcoin, hashes are used to link blocks and ensure security.",
        es: "Un hash es como una huella digital para datos. Transforma cualquier dato en una cadena única de caracteres de longitud fija. En Bitcoin, los hashes se utilizan para vincular bloques y garantizar la seguridad.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 306,
      question: {
        de: "Wie schützt Bitcoin vor Betrug?",
        en: "How does Bitcoin protect against fraud?",
        es: "¿Cómo protege Bitcoin contra el fraude?",
      },
      options: {
        de: ["Alles wird öffentlich kontrolliert", "Durch Polizei", "Durch eine Fee", "Mit einem Helm"],
        en: ["Everything is publicly controlled", "Through police", "Through a fairy", "With a helmet"],
        es: ["Todo está controlado públicamente", "A través de la policía", "A través de un hada", "Con un casco"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin schützt vor Betrug, indem alle Transaktionen öffentlich in der Blockchain gespeichert werden und von vielen Computern überprüft werden. Niemand kann heimlich Bitcoins erschaffen oder fremde Bitcoins ausgeben.",
        en: "Bitcoin protects against fraud by storing all transactions publicly in the blockchain and having them verified by many computers. No one can secretly create Bitcoins or spend someone else's Bitcoins.",
        es: "Bitcoin protege contra el fraude almacenando todas las transacciones públicamente en la blockchain y haciéndolas verificar por muchas computadoras. Nadie puede crear Bitcoins en secreto o gastar los Bitcoins de otra persona.",
      },
      category: "hard",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 307,
      question: {
        de: "Was ist ein Smart Contract?",
        en: "What is a Smart Contract?",
        es: "¿Qué es un Contrato Inteligente?",
      },
      options: {
        de: ["Ein Vertrag, der sich selbst ausführt", "Ein Zaubertrick", "Ein Schülerausweis", "Ein lustiger Witz"],
        en: ["A contract that executes itself", "A magic trick", "A student ID", "A funny joke"],
        es: [
          "Un contrato que se ejecuta a sí mismo",
          "Un truco de magia",
          "Un carnet de estudiante",
          "Un chiste divertido",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Smart Contract ist wie ein Vertrag, der sich selbst ausführt, wenn bestimmte Bedingungen erfüllt sind. Er funktioniert automatisch und braucht keine Person, die ihn überwacht.",
        en: "A Smart Contract is like a contract that executes itself when certain conditions are met. It works automatically and doesn't need a person to monitor it.",
        es: "Un Contrato Inteligente es como un contrato que se ejecuta a sí mismo cuando se cumplen ciertas condiciones. Funciona automáticamente y no necesita una persona que lo supervise.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 border-green-300",
    },
    {
      id: 308,
      question: {
        de: "Was ist der Unterschied zwischen Bitcoin und einer Bank?",
        en: "What is the difference between Bitcoin and a bank?",
        es: "¿Cuál es la diferencia entre Bitcoin y un banco?",
      },
      options: {
        de: [
          "Bitcoin braucht keine Bank",
          "Bitcoin ist aus Holz",
          "Banken geben dir Süßigkeiten",
          "Bitcoin funktioniert nur am Wochenende",
        ],
        en: [
          "Bitcoin doesn't need a bank",
          "Bitcoin is made of wood",
          "Banks give you candy",
          "Bitcoin only works on weekends",
        ],
        es: [
          "Bitcoin no necesita un banco",
          "Bitcoin está hecho de madera",
          "Los bancos te dan dulces",
          "Bitcoin solo funciona los fines de semana",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Der größte Unterschied ist, dass Bitcoin ohne Banken oder andere Vermittler funktioniert. Bei Bitcoin kontrollierst du dein Geld selbst, während bei einer Bank die Bank dein Geld für dich aufbewahrt und kontrolliert.",
        en: "The biggest difference is that Bitcoin works without banks or other intermediaries. With Bitcoin, you control your money yourself, while with a bank, the bank keeps and controls your money for you.",
        es: "La mayor diferencia es que Bitcoin funciona sin bancos u otros intermediarios. Con Bitcoin, tú mismo controlas tu dinero, mientras que con un banco, el banco guarda y controla tu dinero por ti.",
      },
      category: "hard",
      icon: <HelpCircle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 border-red-300",
    },
    {
      id: 309,
      question: {
        de: "Wie erkennt man, ob eine Bitcoin-Zahlung echt ist?",
        en: "How do you know if a Bitcoin payment is real?",
        es: "¿Cómo sabes si un pago de Bitcoin es real?",
      },
      options: {
        de: ["Sie steht in der Blockchain", "Man ruft beim Bürgermeister an", "Man fragt die Katze", "Es leuchtet rot"],
        en: ["It's in the blockchain", "You call the mayor", "You ask the cat", "It glows red"],
        es: ["Está en la blockchain", "Llamas al alcalde", "Le preguntas al gato", "Brilla en rojo"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Eine echte Bitcoin-Zahlung wird in der Blockchain gespeichert und von vielen Computern bestätigt. Mit einem Block-Explorer kannst du jede Transaktion überprüfen und sehen, ob sie echt ist.",
        en: "A real Bitcoin payment is stored in the blockchain and confirmed by many computers. With a block explorer, you can check any transaction and see if it's real.",
        es: "Un pago real de Bitcoin se almacena en la blockchain y es confirmado por muchas computadoras. Con un explorador de bloques, puedes verificar cualquier transacción y ver si es real.",
      },
      category: "hard",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: 310,
      question: {
        de: "Was ist ein Lightning-Invoice?",
        en: "What is a Lightning Invoice?",
        es: "¿Qué es una Factura Lightning?",
      },
      options: {
        de: ["Eine Art Rechnung für eine Zahlung", "Eine Blume", "Ein Passwort", "Ein Spielzeug"],
        en: ["A kind of bill for a payment", "A flower", "A password", "A toy"],
        es: ["Un tipo de factura para un pago", "Una flor", "Una contraseña", "Un juguete"],
      },
      correctAnswer: 0,
      explanation: {
        de: "Ein Lightning-Invoice ist wie eine Rechnung oder Zahlungsaufforderung im Lightning-Netzwerk. Es enthält alle Informationen, die jemand braucht, um dir eine schnelle Bitcoin-Zahlung zu senden.",
        en: "A Lightning Invoice is like a bill or payment request in the Lightning Network. It contains all the information someone needs to send you a fast Bitcoin payment.",
        es: "Una Factura Lightning es como una factura o solicitud de pago en la Red Lightning. Contiene toda la información que alguien necesita para enviarte un pago rápido de Bitcoin.",
      },
      category: "hard",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
    {
      id: 311,
      question: {
        de: "Warum kann Bitcoin niemand einfach abschalten?",
        en: "Why can't anyone just shut down Bitcoin?",
        es: "¿Por qué nadie puede simplemente apagar Bitcoin?",
      },
      options: {
        de: [
          "Weil es auf vielen Computern gleichzeitig läuft",
          "Weil es unter Wasser ist",
          "Weil es sich versteckt",
          "Weil es schnell rennt",
        ],
        en: [
          "Because it runs on many computers at the same time",
          "Because it's underwater",
          "Because it hides",
          "Because it runs fast",
        ],
        es: [
          "Porque funciona en muchas computadoras al mismo tiempo",
          "Porque está bajo el agua",
          "Porque se esconde",
          "Porque corre rápido",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Bitcoin kann nicht einfach abgeschaltet werden, weil es dezentral auf tausenden Computern auf der ganzen Welt läuft. Selbst wenn einige Computer ausfallen, funktioniert Bitcoin weiter auf den anderen.",
        en: "Bitcoin cannot simply be shut down because it runs decentralized on thousands of computers around the world. Even if some computers fail, Bitcoin continues to work on the others.",
        es: "Bitcoin no puede ser simplemente apagado porque funciona de manera descentralizada en miles de computadoras en todo el mundo. Incluso si algunas computadoras fallan, Bitcoin continúa funcionando en las otras.",
      },
      category: "hard",
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 312,
      question: {
        de: "Was bedeutet 'Open Source'?",
        en: "What does 'Open Source' mean?",
        es: "¿Qué significa 'Código Abierto'?",
      },
      options: {
        de: [
          "Jeder kann den Code sehen und mitmachen",
          "Es ist besonders teuer",
          "Man muss dafür ein Ticket kaufen",
          "Nur Tiere dürfen es benutzen",
        ],
        en: [
          "Anyone can see the code and participate",
          "It's particularly expensive",
          "You have to buy a ticket for it",
          "Only animals are allowed to use it",
        ],
        es: [
          "Cualquiera puede ver el código y participar",
          "Es particularmente caro",
          "Tienes que comprar un boleto para ello",
          "Solo los animales pueden usarlo",
        ],
      },
      correctAnswer: 0,
      explanation: {
        de: "Open Source bedeutet, dass der Quellcode (die Anweisungen, die dem Computer sagen, was er tun soll) öffentlich ist. Jeder kann ihn sehen, prüfen und verbessern.",
        en: "Open Source means that the source code (the instructions that tell the computer what to do) is public. Anyone can see it, check it, and improve it.",
        es: "Código Abierto significa que el código fuente (las instrucciones que le dicen a la computadora qué hacer) es público. Cualquiera puede verlo, revisarlo y mejorarlo.",
      },
      category: "hard",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-300",
    },
  ]

  // Filter questions based on difficulty
  const filteredQuestions = allQuestions.filter((question) => question.category === difficulty)

  useEffect(() => {
    if (filteredQuestions.length < questionCount) {
      setWarningMessage(
        formatMessage(t.warningMessage, {
          count: filteredQuestions.length,
          difficulty: t[difficulty],
        }),
      )
    } else {
      setWarningMessage(null)
    }
  }, [difficulty, questionCount, t, filteredQuestions.length])

  const startQuiz = () => {
    let questionsToUse = [...allQuestions].filter((question) => question.category === difficulty)

    if (questionsToUse.length < questionCount) {
      questionsToUse = [...allQuestions].filter((question) => question.category === difficulty)
      console.warn(`Nicht genügend Fragen für Schwierigkeitsgrad ${difficulty}. Verwende alle verfügbaren Fragen.`)
    } else {
      questionsToUse = questionsToUse.slice(0, questionCount)
    }

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

  // Füge diese Funktion zur Komponente hinzu
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
        // Konfetti bei richtiger Antwort
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        // Zusätzliches Konfetti mit Verzögerung für mehr Effekt
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
            {/* Schwierigkeitsgrad Auswahl */}
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

            {/* Anzahl der Fragen Auswahl */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base sm:text-lg font-medium text-purple-700 mb-2">
                {t.questionCountTitle}
              </label>
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {[5, 10, 15, 20, 25].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-1 sm:py-2 px-1 sm:px-3 rounded-lg text-center font-medium text-xs sm:text-sm transition-colors ${
                      questionCount === count ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Warnmeldung, wenn nicht genügend Fragen vorhanden sind */}
            {warningMessage && (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded-md text-xs sm:text-sm"
                role="alert"
              >
                <p>{warningMessage}</p>
              </div>
            )}

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
          {/* Header mit Fortschritt */}
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
            {/* Frage mit Icon */}
            <div className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className={`${quizQuestions[currentQuestionIndex].color} p-2 sm:p-3 rounded-full flex-shrink-0`}>
                {quizQuestions[currentQuestionIndex].icon}
              </div>
              <p className="text-base sm:text-xl text-gray-800 font-medium">
                {quizQuestions[currentQuestionIndex].question[language]}
              </p>
            </div>

            {/* Antwortoptionen */}
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

            {/* Erklärung und Feedback - keep the same structure but adjust font sizes */}
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

            {/* Aktionsbutton */}
            <div className="flex justify-center">
              {!isAnswered ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkAnswer}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline text-sm sm:text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline text-sm sm:text-lg transition-colors flex items-center gap-2 ${
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

