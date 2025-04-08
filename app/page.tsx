"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, BookOpen, ChevronDown, Bitcoin, Info, MapPin, Globe } from "lucide-react"
import { BitcoinQuiz } from "@/components/bitcoin-quiz"
import { BitcoinFacts } from "@/components/bitcoin-facts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TuttleTwinsDropdown } from "@/components/tuttle-twins-dropdown"
import { LightningPiggyConnect } from "@/components/lightning-piggy-connect"

// Typen für die Übersetzungen
type Language = "de" | "en" | "es"

type Translations = {
  [key in Language]: {
    title: string
    forParents: string
    welcomeTitle: string
    welcomeSubtitle: string
    whatIsBitcoinTitle: string
    whatIsBitcoinContent: string
    learnMore: string
    digitalPiggyBankTitle: string
    digitalPiggyBankContent: string
    infoButton: string
    piggyBankButton: string
    piggyNoa: string
    piggyArie: string
    piggyNoaDesc: string
    piggyArieDesc: string
    piggyBankTitle: string
    knowledgeTab: string
    quizTab: string
    factsTab: string
    bitcoinBasicsTitle: string
    whatIsBitcoinSectionTitle: string
    whatIsBitcoinSectionContent: string
    tipLabel: string
    bitcoinMapTip: string
    howBitcoinWorksTitle: string
    howBitcoinWorksContent: string
    whyBitcoinSpecialTitle: string
    whyBitcoinSpecialContent: string
    howToGetBitcoinTitle: string
    footerText: string
    videoInGerman: string
    videoWithGermanSubtitles: string
    perfectWeekendProject: string
    perfectSchoolProject: string
  }
}

// Übersetzungen für alle unterstützten Sprachen
const translations: Translations = {
  de: {
    title: "Bitcoin für Kinder",
    forParents: "Für Eltern",
    welcomeTitle: "Willkommen in der Bitcoin-Welt!",
    welcomeSubtitle: "Entdecke was Bitcoin ist und wie digitales Geld funktioniert!",
    whatIsBitcoinTitle: "Was ist Bitcoin?",
    whatIsBitcoinContent:
      "Bitcoin ist wie magisches Geld im Computer! Es ist nicht aus Papier oder Metall, sondern besteht aus Zahlen und Codes.",
    learnMore: "Spielerisch mehr erfahren",
    digitalPiggyBankTitle: "Digitales Sparschwein",
    digitalPiggyBankContent:
      "Stell dir vor, du hast ein Sparschwein, das im Computer lebt! So ähnlich funktioniert auch Bitcoin - es ist ein digitaler Schatz.",
    infoButton: "Informationen - DIY",
    piggyBankButton: "Sparschwein",
    piggyNoa: "Sparschwein Noa",
    piggyArie: "Sparschwein Arie",
    piggyNoaDesc: "Für Anfänger - einfach zu bedienen",
    piggyArieDesc: "Für Fortgeschrittene - mit mehr Funktionen",
    piggyBankTitle: "Wähle dein Sparschwein:",
    knowledgeTab: "Wissen",
    quizTab: "Quiz",
    factsTab: "Fakten",
    bitcoinBasicsTitle: "Bitcoin-Grundlagen",
    whatIsBitcoinSectionTitle: "Was ist Bitcoin?",
    whatIsBitcoinSectionContent:
      "Bitcoin ist digitales Geld, das nur im Computer existiert. Anders als Euro-Münzen kannst du Bitcoin nicht anfassen, aber du kannst damit trotzdem Dinge kaufen!",
    tipLabel: "Tipp:",
    bitcoinMapTip: "Auf der Bitcoin Map kannst du sehen, wo überall du mit Bitcoin bezahlen kannst.",
    howBitcoinWorksTitle: "Wie funktioniert Bitcoin?",
    howBitcoinWorksContent:
      'Bitcoin funktioniert mit einer Technologie namens "Blockchain". Das ist wie ein großes Buch, in dem alle Bitcoin-Überweisungen aufgeschrieben werden. Viele Computer auf der ganzen Welt passen auf, dass niemand in diesem Buch schummelt.',
    whyBitcoinSpecialTitle: "Warum ist Bitcoin besonders?",
    whyBitcoinSpecialContent:
      "Bitcoin gehört keiner Bank oder Regierung. Es gehört allen Menschen, die es benutzen. Du kannst Bitcoin an jeden Menschen auf der Welt schicken, egal wo er wohnt!",
    howToGetBitcoinTitle: "Wie bekommt man Bitcoin?",
    howToGetBitcoinContent:
      'Du kannst Bitcoin kaufen, als Geschenk bekommen oder für Arbeit bezahlt werden. Manche Menschen lassen auch spezielle Computer arbeiten, um neue Bitcoins zu "schürfen" - das nennt man "Mining".',
    footerText: "Bitcoin-Lernbereich für Kinder zwischen 7 und 12 Jahren",
    videoInGerman: "Bitcoin-Einführung auf Deutsch",
    videoWithGermanSubtitles: "Bitcoin-Grundlagen mit deutschen Untertiteln",
    perfectWeekendProject: "Perfektes Wochenendprojekt für Eltern",
    perfectSchoolProject: "Perfekt für Schulprojekte",
  },
  en: {
    title: "Bitcoin for Kids",
    forParents: "For Parents",
    welcomeTitle: "Welcome to the Bitcoin World!",
    welcomeSubtitle: "Discover what Bitcoin is and how digital money works!",
    whatIsBitcoinTitle: "What is Bitcoin?",
    whatIsBitcoinContent:
      "Bitcoin is like magic money in the computer! It's not made of paper or metal, but consists of numbers and codes.",
    learnMore: "Learn more playfully",
    digitalPiggyBankTitle: "Digital Piggy Bank",
    digitalPiggyBankContent:
      "Imagine having a piggy bank that lives in the computer! That's similar to how Bitcoin works - it's a digital treasure.",
    infoButton: "Information - DIY",
    piggyBankButton: "Piggy Bank",
    piggyNoa: "Piggy Bank Noa",
    piggyNoaDesc: "For beginners - easy to use",
    piggyArie: "Piggy Bank Arie",
    piggyArieDesc: "For advanced users - with more features",
    piggyBankTitle: "Choose your piggy bank:",
    knowledgeTab: "Knowledge",
    quizTab: "Quiz",
    factsTab: "Facts",
    bitcoinBasicsTitle: "Bitcoin Basics",
    whatIsBitcoinSectionTitle: "What is Bitcoin?",
    whatIsBitcoinSectionContent:
      "Bitcoin is digital money that only exists in computers. Unlike Euro coins, you can't touch Bitcoin, but you can still use it to buy things!",
    tipLabel: "Tip:",
    bitcoinMapTip: "On the Bitcoin Map you can see where you can pay with Bitcoin.",
    howBitcoinWorksTitle: "How does Bitcoin work?",
    howBitcoinWorksContent:
      'Bitcoin works with a technology called "blockchain". It\'s like a big book where all Bitcoin transactions are recorded. Many computers around the world make sure that nobody can cheat in this book.',
    whyBitcoinSpecialTitle: "Why is Bitcoin special?",
    whyBitcoinSpecialContent:
      "Bitcoin doesn't belong to any bank or government. It belongs to all the people who use it. You can send Bitcoin to anyone in the world, no matter where they live!",
    howToGetBitcoinTitle: "How do you get Bitcoin?",
    howToGetBitcoinContent:
      'You can buy Bitcoin, receive it as a gift, or get paid for work. Some people also have special computers work to "mine" new Bitcoins - that\'s called "mining".',
    footerText: "Bitcoin learning area for children between 7 and 12 years",
    videoInGerman: "Bitcoin Introduction in German",
    videoWithGermanSubtitles: "Bitcoin Basics with German Subtitles",
    perfectWeekendProject: "Perfect Mom and Dad weekend project",
    perfectSchoolProject: "Perfect for school project",
  },
  es: {
    title: "Bitcoin para Niños",
    forParents: "Para Padres",
    welcomeTitle: "¡Bienvenido al Mundo Bitcoin!",
    welcomeSubtitle: "¡Descubre qué es Bitcoin y cómo funciona el dinero digital!",
    whatIsBitcoinTitle: "¿Qué es Bitcoin?",
    whatIsBitcoinContent:
      "¡Bitcoin es como dinero mágico en la computadora! No está hecho de papel o metal, sino que consiste en números y códigos.",
    learnMore: "Aprender jugando",
    digitalPiggyBankTitle: "Alcancía Digital",
    digitalPiggyBankContent:
      "¡Imagina tener una alcancía que vive en la computadora! Así es como funciona Bitcoin - es un tesoro digital.",
    infoButton: "Información - DIY",
    piggyBankButton: "Alcancía",
    piggyNoa: "Alcancía Noa",
    piggyNoaDesc: "Para principiantes - fácil de usar",
    piggyArie: "Alcancía Arie",
    piggyArieDesc: "Para usuarios avanzados - con más funciones",
    piggyBankTitle: "Elige tu alcancía:",
    knowledgeTab: "Conocimiento",
    quizTab: "Cuestionario",
    factsTab: "Datos",
    bitcoinBasicsTitle: "Fundamentos de Bitcoin",
    whatIsBitcoinSectionTitle: "¿Qué es Bitcoin?",
    whatIsBitcoinSectionContent:
      "Bitcoin es dinero digital que solo existe en computadoras. A diferencia de las monedas de Euro, no puedes tocar Bitcoin, ¡pero aún puedes usarlo para comprar cosas!",
    tipLabel: "Consejo:",
    bitcoinMapTip: "En el Mapa de Bitcoin puedes ver dónde puedes pagar con Bitcoin.",
    howBitcoinWorksTitle: "¿Cómo funciona Bitcoin?",
    howBitcoinWorksContent:
      'Bitcoin funciona con una tecnología llamada "blockchain". Es como un gran libro donde se registran todas las transacciones de Bitcoin. Muchas computadoras en todo el mundo se aseguran de que nadie pueda hacer trampa en este libro.',
    whyBitcoinSpecialTitle: "¿Por qué es especial Bitcoin?",
    whyBitcoinSpecialContent:
      "Bitcoin no pertenece a ningún banco o gobierno. Pertenece a todas las personas que lo usan. ¡Puedes enviar Bitcoin a cualquier persona en el mundo, sin importar dónde viva!",
    howToGetBitcoinTitle: "¿Cómo se obtiene Bitcoin?",
    howToGetBitcoinContent:
      'Puedes comprar Bitcoin, recibirlo como regalo o recibir pago por trabajo. Algunas personas también tienen computadoras especiales que trabajan para "minar" nuevos Bitcoins - eso se llama "minería".',
    footerText: "Área de aprendizaje de Bitcoin para niños entre 7 y 12 años",
    videoInGerman: "Introducción a Bitcoin en alemán",
    videoWithGermanSubtitles: "Conceptos básicos de Bitcoin con subtítulos en alemán",
    perfectWeekendProject: "Proyecto perfecto para padres",
    perfectSchoolProject: "Perfecto para proyecto escolar",
  },
}

export default function BitcoinKidsLearning() {
  // Zustand für die aktuelle Sprache
  const [language, setLanguage] = useState<Language>("de")

  // Aktuelle Übersetzungen basierend auf der ausgewählten Sprache
  const t = translations[language]

  const handlePiggySelect = (piggy: string) => {
    // Placeholder function - would navigate to specific URLs in production
    console.log(`Selected ${piggy} piggy bank`)
    alert(`Du hast das ${piggy} Sparschwein ausgewählt! (Platzhalter: Würde zu einer internen URL navigieren)`)
  }

  const handleDIYInfo = () => {
    // Placeholder function - would navigate to DIY information page
    console.log("DIY Information requested")
    alert("Hier würden Informationen zum Selbermachen angezeigt werden.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="container mx-auto py-4 px-4 sm:py-6 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
              <Bitcoin className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">{t.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Sprachumschalter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full flex items-center gap-1 sm:gap-2 h-8 sm:h-10"
                >
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                  {language.toUpperCase()}
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("de")} className={language === "de" ? "bg-blue-50" : ""}>
                  Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-blue-50" : ""}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-blue-50" : ""}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tuttle Twins Button */}
            <TuttleTwinsDropdown className="h-8 sm:h-10" />

            {/* Für Eltern Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full flex items-center gap-1 sm:gap-2 h-8 sm:h-10"
                >
                  <span className="text-xs sm:text-sm">{t.forParents}</span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 sm:w-80 p-2">
                <div className="mb-2 px-2 text-sm font-medium text-gray-500">
                  {language === "de"
                    ? "Lernvideos für Eltern:"
                    : language === "en"
                      ? "Educational videos for parents:"
                      : "Videos educativos para padres:"}
                </div>

                <div className="mb-1 rounded-md p-1 hover:bg-blue-50">
                  <DropdownMenuItem
                    onClick={() => window.open("https://www.youtube.com/watch?v=QIZe-20JBtQ&t=1547s", "_blank")}
                    className="flex flex-col items-start rounded-md p-2"
                  >
                    <div className="flex w-full items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-500"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Bitcoins Potential</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Auf Deutsch</p>
                  </DropdownMenuItem>
                </div>

                <div className="mb-1 rounded-md p-1 hover:bg-blue-50">
                  <DropdownMenuItem
                    onClick={() => window.open("https://youtu.be/YtFOxNbmD38?si=6zKK-sbRGuHfA3ya", "_blank")}
                    className="flex flex-col items-start rounded-md p-2"
                  >
                    <div className="flex w-full items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm">What's the Problem?</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Englisch mit deutschen Untertiteln</p>
                  </DropdownMenuItem>
                </div>

                {/* New video 1 */}
                <div className="mb-1 rounded-md p-1 hover:bg-blue-50">
                  <DropdownMenuItem
                    onClick={() => window.open("https://www.youtube.com/watch?v=Kn0aiUuvZ9g", "_blank")}
                    className="flex flex-col items-start rounded-md p-2"
                  >
                    <div className="flex w-full items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-orange-500"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Mysterium Satoshi Nakamoto</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Auf Deutsch</p>
                  </DropdownMenuItem>
                </div>

                {/* New video 2 */}
                <div className="rounded-md p-1 hover:bg-blue-50">
                  <DropdownMenuItem
                    onClick={() => window.open("https://youtu.be/RFSBWrAllzw?si=4uhDTJjMGMllSkC5", "_blank")}
                    className="flex flex-col items-start rounded-md p-2"
                  >
                    <div className="flex w-full items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Human B Reise in den Kaninchenbau</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Auf Deutsch</p>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4 sm:py-8 px-4 sm:px-0">
        <section className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-primary">{t.welcomeTitle}</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">{t.welcomeSubtitle}</p>
        </section>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <Card className="overflow-hidden border-2 border-amber-200 bg-white shadow-md flex flex-col h-full">
            <CardHeader className="bg-amber-100 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                {t.whatIsBitcoinTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 flex-grow">
              <div className="mb-4 flex justify-center">
                <div className="relative h-36 sm:h-48 w-48 sm:w-64 overflow-hidden rounded-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grafik-oTTyMqk2HVtYCb676D2m57qeskTM4D.png"
                    alt="Bitcoin Explorama"
                    fill
                    className="object-cover drop-shadow-md"
                    unoptimized
                  />
                </div>
              </div>
              <p className="text-center text-base sm:text-lg">{t.whatIsBitcoinContent}</p>
            </CardContent>
            <CardFooter className="flex justify-center bg-amber-50 p-4 mt-auto">
              <Button
                className="rounded-full bg-amber-500 text-white hover:bg-amber-600 text-sm sm:text-base"
                onClick={() => window.open("https://bitcoin-explorama.com/?lang=de", "_blank")}
              >
                {t.learnMore}
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-2 border-blue-200 bg-white shadow-md flex flex-col h-full">
            <CardHeader className="bg-blue-100 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                {t.digitalPiggyBankTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 flex-grow">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-blue-200 flex items-center">
                  <span className="mr-1">🏆</span>
                  <span className="truncate">{t.perfectWeekendProject}</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-200 flex items-center">
                  <span className="mr-1">🎓</span>
                  <span className="truncate">{t.perfectSchoolProject}</span>
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                <div className="relative h-36 sm:h-48 w-36 sm:w-48">
                  <Image
                    src="https://www.lightningpiggy.com/content/images/2024/01/BY_-_Lightning_Piggy_logo_-_character.svg"
                    alt="Lightning Piggy - Digitales Sparschwein"
                    fill
                    className="object-contain drop-shadow-md"
                    unoptimized
                  />
                </div>
              </div>
              <p className="text-center text-base sm:text-lg">{t.digitalPiggyBankContent}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-blue-50 p-4 mt-auto">
              <Button
                className="rounded-full bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={handleDIYInfo}
              >
                <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                {t.infoButton}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <section className="mt-8 sm:mt-12">
          <Tabs defaultValue="quiz" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-purple-100">
              <TabsTrigger
                value="wissen"
                className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs sm:text-sm py-1 sm:py-2"
              >
                <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {t.knowledgeTab}
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs sm:text-sm py-1 sm:py-2"
              >
                <Lightbulb className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {t.quizTab}
              </TabsTrigger>
              <TabsTrigger
                value="fakten"
                className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs sm:text-sm py-1 sm:py-2"
              >
                <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {t.factsTab}
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="wissen"
              className="mt-4 sm:mt-6 rounded-xl border-2 border-purple-200 bg-white p-4 sm:p-6"
            >
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-purple-700">{t.bitcoinBasicsTitle}</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-700">{t.whatIsBitcoinSectionTitle}</h4>
                  <p>{t.whatIsBitcoinSectionContent}</p>

                  <div className="mt-3 rounded-lg border-2 border-blue-300 bg-blue-100 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-bold text-blue-800">{t.tipLabel}</span>{" "}
                        <span className="text-blue-700">
                          {t.bitcoinMapTip}{" "}
                          <a
                            href="https://btcmap.org/map#7/50.72602/9.00879"
                            target="_blank"
                            className="font-medium text-blue-800 underline hover:text-blue-900"
                            rel="noreferrer"
                          >
                            Bitcoin Map
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-green-700">{t.howBitcoinWorksTitle}</h4>
                  <p>{t.howBitcoinWorksContent}</p>
                </div>

                <div className="rounded-lg bg-amber-50 p-4">
                  <h4 className="mb-2 font-semibold text-amber-700">{t.whyBitcoinSpecialTitle}</h4>
                  <p>{t.whyBitcoinSpecialContent}</p>
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-700">{t.howToGetBitcoinTitle}</h4>
                  <p>{t.howToGetBitcoinContent}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="quiz"
              className="mt-4 sm:mt-6 rounded-xl border-2 border-purple-200 bg-white p-4 sm:p-6"
            >
              <BitcoinQuiz language={language} />
            </TabsContent>
            <TabsContent
              value="fakten"
              className="mt-4 sm:mt-6 rounded-xl border-2 border-purple-200 bg-white p-4 sm:p-6"
            >
              <BitcoinFacts language={language} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="bg-primary py-6 text-primary-foreground">
        <div className="container mx-auto text-center">
          <p>{t.footerText}</p>
        </div>
      </footer>

      {/* Add the Lightning Piggy Connect component */}
      <LightningPiggyConnect language={language} />
    </div>
  )
}

