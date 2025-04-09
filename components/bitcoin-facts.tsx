"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Globe, Zap, Lock, Cpu, Rocket, Star, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { Language } from "./bitcoin-quiz"

type FactProps = {
  icon: React.ReactNode
  color: string
  title: string
  description: string
}

const FactCard = ({ icon, color, title, description }: FactProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className={`rounded-xl border-2 bg-white p-3 sm:p-4 shadow-sm transition-all ${color}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${color.replace("border", "bg")}`}
          >
            {icon}
          </div>
          <h4 className="text-base sm:text-lg font-bold">{title}</h4>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <motion.div
          className="mt-2 sm:mt-3 pl-10 sm:pl-12 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.div>
      )}
    </motion.div>
  )
}

// Übersetzungen für die UI-Elemente
const uiTranslations = {
  de: {
    title: "Spannende Bitcoin-Fakten",
    didYouKnow: "Wusstest du schon?",
    didYouKnowText:
      "Mit diesem Wissen über Bitcoin kannst du die digitale Zukunft besser verstehen. Toll, was du schon alles gelernt hast!",
  },
  en: {
    title: "Exciting Bitcoin Facts",
    didYouKnow: "Did you know?",
    didYouKnowText:
      "With this knowledge about Bitcoin, you can better understand the digital future. Great what you've already learned!",
  },
  es: {
    title: "Datos Interesantes sobre Bitcoin",
    didYouKnow: "¿Sabías que?",
    didYouKnowText:
      "Con este conocimiento sobre Bitcoin, puedes entender mejor el futuro digital. ¡Genial lo que ya has aprendido!",
  },
}

type BitcoinFactsProps = {
  language?: Language
}

export function BitcoinFacts({ language = "de" }: BitcoinFactsProps) {
  // UI-Übersetzungen für die aktuelle Sprache
  const t = uiTranslations[language]

  const facts = {
    de: [
      {
        icon: <Calendar className="h-6 w-6 text-amber-600" />,
        color: "border-amber-200",
        title: "Bitcoin ist noch ein Kind!",
        description:
          "Bitcoin wurde 2009 erfunden - das ist jünger als manche eurer Geschwister! Ein Mensch mit dem Namen Satoshi Nakamoto hat Bitcoin erfunden, aber niemand weiß, wer diese Person wirklich ist. Es ist wie ein Superheld mit geheimer Identität!",
      },
      {
        icon: <Zap className="h-6 w-6 text-yellow-600" />,
        color: "border-yellow-200",
        title: "Schneller als ein Blitz!",
        description:
          "Mit dem Lightning Network kann man Bitcoin so schnell wie ein Blitz verschicken! Man kann damit sogar Süßigkeiten kaufen oder für Spiele bezahlen, und das Geld ist sofort da - schneller als du 'Bitcoin' sagen kannst!",
      },
      {
        icon: <Star className="h-6 w-6 text-purple-600" />,
        color: "border-purple-200",
        title: "Begrenzt wie Sammelkarten!",
        description:
          "Es gibt nur 21 Millionen Bitcoin - nicht mehr und nicht weniger! Das ist wie bei seltenen Sammelkarten: Je weniger es gibt, desto wertvoller sind sie. Manche Menschen besitzen nur einen kleinen Teil eines Bitcoins, so wie ein Puzzleteil.",
      },
      {
        icon: <Globe className="h-6 w-6 text-blue-600" />,
        color: "border-blue-200",
        title: "Auf der ganzen Welt zu Hause!",
        description:
          "Bitcoin wird in fast jedem Land der Welt benutzt! Stell dir vor: Ein Kind in Japan kann mit demselben digitalen Geld bezahlen wie du hier. Bitcoin spricht alle Sprachen und reist um die ganze Welt, ohne einen Pass zu brauchen!",
      },
      {
        icon: <Lock className="h-6 w-6 text-green-600" />,
        color: "border-green-200",
        title: "Sicherer als eine Schatztruhe!",
        description:
          "Bitcoin wird durch Mathematik und Codes geschützt, die so kompliziert sind, dass nicht einmal die schlauesten Erwachsenen sie knacken können! Es ist wie ein Tresor mit einem Passwort, das aus Millionen von Zahlen besteht.",
      },
      {
        icon: <Cpu className="h-6 w-6 text-red-600" />,
        color: "border-red-200",
        title: "Computer als Goldgräber!",
        description:
          "Neue Bitcoin werden von Computern 'geschürft', wie Goldgräber nach Gold suchen. Diese Computer lösen Rätsel, die gar nicht so schwer sind - aber es ist wie ein Glücksspiel, wer zuerst die richtige Lösung findet! Das Besondere: Egal wie viele Computer mitmachen, die Rätsel werden automatisch angepasst, damit immer ungefähr alle 10 Minuten neue Bitcoin gefunden werden. Wie ein Spiel, bei dem die Regeln sich ändern, damit es nicht zu leicht oder zu schwer wird!",
      },
      {
        icon: <Rocket className="h-6 w-6 text-indigo-600" />,
        color: "border-indigo-200",
        title: "Bitcoin war im Weltraum!",
        description:
          "Wusstest du, dass Bitcoin schon im Weltraum war? Ein Satellit sendet die Bitcoin-Blockchain rund um die Erde. Das bedeutet, dass Bitcoin sogar funktionieren würde, wenn das Internet auf der Erde ausfällt. Wie cool ist das denn?",
      },
      {
        icon: <Lightbulb className="h-6 w-6 text-orange-600" />,
        color: "border-orange-200",
        title: "Dein eigenes Geld!",
        description:
          "Mit Bitcoin kannst du dein eigenes Geld kontrollieren, ohne dass Erwachsene dir sagen müssen, was du damit machen darfst! Es ist wie dein eigenes digitales Sparschwein, zu dem nur du den Schlüssel hast. Du kannst es überall hin mitnehmen, sogar in deiner Hosentasche auf einem kleinen Gerät!",
      },
    ],
    en: [
      {
        icon: <Calendar className="h-6 w-6 text-amber-600" />,
        color: "border-amber-200",
        title: "Bitcoin is still a child!",
        description:
          "Bitcoin was invented in 2009 - that's younger than some of your siblings! A person named Satoshi Nakamoto invented Bitcoin, but nobody knows who this person really is. It's like a superhero with a secret identity!",
      },
      {
        icon: <Zap className="h-6 w-6 text-yellow-600" />,
        color: "border-yellow-200",
        title: "Faster than the Police!",
        description:
          "With the Lightning Network, you can send Bitcoin as fast as lightning! You can even buy candy or pay for games with it, and the money is there instantly - faster than you can say 'Bitcoin'!",
      },
      {
        icon: <Star className="h-6 w-6 text-purple-600" />,
        color: "border-purple-200",
        title: "Limited like trading cards!",
        description:
          "There are only 21 million Bitcoin - no more and no less! It's like rare trading cards: The fewer there are, the more valuable they are. Some people own only a small part of a Bitcoin, like a puzzle piece.",
      },
      {
        icon: <Globe className="h-6 w-6 text-blue-600" />,
        color: "border-blue-200",
        title: "At home all over the world!",
        description:
          "Bitcoin is used in almost every country in the world! Imagine: A child in Japan can pay with the same digital money as you do here. Bitcoin speaks all languages and travels around the world without needing a passport!",
      },
      {
        icon: <Lock className="h-6 w-6 text-green-600" />,
        color: "border-green-200",
        title: "Safer than a treasure chest!",
        description:
          "Bitcoin is protected by mathematics and codes that are so complicated that not even the smartest adults can crack them! It's like a safe with a password made up of millions of numbers.",
      },
      {
        icon: <Cpu className="h-6 w-6 text-red-600" />,
        color: "border-red-200",
        title: "Computers as gold diggers!",
        description:
          "New Bitcoin are 'mined' by computers, like gold diggers looking for gold. These computers solve puzzles that aren't super hard - but it's like a lottery to see who finds the right answer first! The special thing: No matter how many computers join in, the puzzles are automatically adjusted so that new Bitcoin are found about every 10 minutes. It's like a game where the rules change to make sure it doesn't get too easy or too hard!",
      },
      {
        icon: <Rocket className="h-6 w-6 text-indigo-600" />,
        color: "border-indigo-200",
        title: "Bitcoin was in space!",
        description:
          "Did you know that Bitcoin has already been in space? A satellite transmits the Bitcoin blockchain around the Earth. This means that Bitcoin would even work if the internet on Earth went down. How cool is that?",
      },
      {
        icon: <Lightbulb className="h-6 w-6 text-orange-600" />,
        color: "border-orange-200",
        title: "Your own money!",
        description:
          "With Bitcoin, you can control your own money without adults having to tell you what you can do with it! It's like your own digital piggy bank that only you have the key to. You can take it anywhere, even in your pocket on a small device!",
      },
    ],
    es: [
      {
        icon: <Calendar className="h-6 w-6 text-amber-600" />,
        color: "border-amber-200",
        title: "¡Bitcoin todavía es un niño!",
        description:
          "Bitcoin fue inventado en 2009 - ¡eso es más joven que algunos de tus hermanos! Una persona llamada Satoshi Nakamoto inventó Bitcoin, pero nadie sabe quién es realmente esta persona. ¡Es como un superhéroe con identidad secreta!",
      },
      {
        icon: <Zap className="h-6 w-6 text-yellow-600" />,
        color: "border-yellow-200",
        title: "¡Más rápido que un rayo!",
        description:
          "¡Con la Red Lightning, puedes enviar Bitcoin tan rápido como un rayo! Incluso puedes comprar dulces o pagar juegos con él, y el dinero está allí al instante - ¡más rápido de lo que puedes decir 'Bitcoin'!",
      },
      {
        icon: <Star className="h-6 w-6 text-purple-600" />,
        color: "border-purple-200",
        title: "¡Limitado como tarjetas coleccionables!",
        description:
          "¡Solo hay 21 millones de Bitcoin, ni más ni menos! Es como las tarjetas coleccionables raras: cuantas menos hay, más valiosas son. Algunas personas poseen solo una pequeña parte de un Bitcoin, como una pieza de rompecabezas.",
      },
      {
        icon: <Globe className="h-6 w-6 text-blue-600" />,
        color: "border-blue-200",
        title: "¡En casa en todo el mundo!",
        description:
          "¡Bitcoin se usa en casi todos los países del mundo! Imagina: un niño en Japón puede pagar con el mismo dinero digital que tú aquí. ¡Bitcoin habla todos los idiomas y viaja por todo el mundo sin necesitar pasaporte!",
      },
      {
        icon: <Lock className="h-6 w-6 text-green-600" />,
        color: "border-green-200",
        title: "¡Más seguro que un cofre del tesoro!",
        description:
          "¡Bitcoin está protegido por matemáticas y códigos tan complicados que ni siquiera los adultos más inteligentes pueden descifrarlos! Es como una caja fuerte con una contraseña compuesta por millones de números.",
      },
      {
        icon: <Cpu className="h-6 w-6 text-red-600" />,
        color: "border-red-200",
        title: "¡Computadoras como buscadores de oro!",
        description:
          "Los nuevos Bitcoin son 'minados' por computadoras, como buscadores de oro buscando oro. Estas computadoras resuelven acertijos que no son super difíciles - ¡pero es como una lotería para ver quién encuentra la respuesta correcta primero! Lo especial: No importa cuántas computadoras se unan, los acertijos se ajustan automáticamente para que se encuentren nuevos Bitcoin aproximadamente cada 10 minutos. ¡Es como un juego donde las reglas cambian para asegurarse de que no se vuelva demasiado fácil o difícil!",
      },
      {
        icon: <Rocket className="h-6 w-6 text-indigo-600" />,
        color: "border-indigo-200",
        title: "¡Bitcoin estuvo en el espacio!",
        description:
          "¿Sabías que Bitcoin ya ha estado en el espacio? Un satélite transmite la blockchain de Bitcoin alrededor de la Tierra. Esto significa que Bitcoin funcionaría incluso si internet en la Tierra fallara. ¿Qué tan genial es eso?",
      },
      {
        icon: <Lightbulb className="h-6 w-6 text-orange-600" />,
        color: "border-orange-200",
        title: "¡Tu propio dinero!",
        description:
          "¡Con Bitcoin, puedes controlar tu propio dinero sin que los adultos tengan que decirte qué puedes hacer con él! Es como tu propia alcancía digital a la que solo tú tienes la llave. Puedes llevarlo a cualquier parte, ¡incluso en tu bolsillo en un dispositivo pequeño!",
      },
    ],
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6 flex items-center justify-center">
        <div className="relative">
          <h3 className="text-center text-xl sm:text-2xl font-bold text-purple-700">{t.title}</h3>
          <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-purple-400 via-amber-400 to-blue-400"></div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {facts[language].map((fact, index) => (
          <FactCard key={index} icon={fact.icon} color={fact.color} title={fact.title} description={fact.description} />
        ))}
      </div>

      <div className="mt-6 sm:mt-8 flex justify-center">
        <div className="relative h-28 sm:h-32 w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-r from-purple-100 via-amber-100 to-blue-100 p-3 sm:p-4">
          <div className="absolute -right-6 -top-6 h-16 sm:h-24 w-16 sm:w-24 rounded-full bg-yellow-200 opacity-50"></div>
          <div className="absolute -left-6 -top-10 h-14 sm:h-20 w-14 sm:w-20 rounded-full bg-purple-200 opacity-50"></div>
          <div className="absolute -bottom-8 left-1/2 h-12 sm:h-16 w-12 sm:w-16 -translate-x-1/2 rounded-full bg-blue-200 opacity-50"></div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <p className="text-base sm:text-lg font-bold">{t.didYouKnow}</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base">{t.didYouKnowText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
