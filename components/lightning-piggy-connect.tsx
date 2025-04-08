"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PiggyBankIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type LightningPiggyConnectProps = {
  language: "de" | "en" | "es"
}

// Update the translations object to include the kid-friendly explanation
const translations = {
  de: {
    connect: "Sparschwein verbinden",
    connecting: "Verbinde...",
    connected: "Verbunden!",
    balance: "Guthaben",
    sats: "Sats",
    disconnect: "Trennen",
    connectPiggy: "Verbinde dein Sparschwein",
    scanQR: "Scanne den QR-Code mit deiner Lightning Wallet",
    or: "oder",
    pasteNWC: "Füge deinen NWC-String ein",
    cancel: "Abbrechen",
    piggyConnected: "Sparschwein verbunden!",
    yourBalance: "Dein Guthaben",
    showPiggy: "Zeige Sparschwein",
    myPiggyBank: "Mein Sparschwein",
    nextLevel: "Nächstes Level",
    savingsAdventure: "Spar-Abenteuer",
    // New kid-friendly explanation
    bringPiggyTitle: "Bring dein Sparschwein in die digitale Welt!",
    bringPiggyExplanation:
      "Dein echtes Sparschwein kann jetzt auch im Computer leben! Wie durch Zauberei können wir es hierher bringen, damit es deine digitalen Münzen sammeln kann.",
    magicWaysTitle: "Du hast zwei magische Wege, um dein Sparschwein hierher zu bringen:",
    scanMagicPicture: "Zaubere mit dem magischen Bild",
    scanMagicExplanation:
      "Halte dein Handy über dieses besondere Bild. Es ist wie ein Zauberportal, das dein Sparschwein von deinem Zimmer direkt in den Computer bringt!",
    typeSecretCode: "Flüstere den Geheimcode",
    typeSecretExplanation:
      "Wenn du bereits einen Geheimcode hast, kannst du ihn hier eintippen. Das ist wie ein Zauberspruch, der dein Sparschwein ruft, damit es in den Computer hüpfen kann!",
    piggyAppearExplanation:
      "Sobald dein Sparschwein hier ist, kann es anfangen, deine digitalen Münzen zu sammeln. Du kannst zusehen, wie es wächst und tolle Belohnungen bekommt!",
  },
  en: {
    connect: "Connect Piggy",
    connecting: "Connecting...",
    connected: "Connected!",
    balance: "Balance",
    sats: "sats",
    disconnect: "Disconnect",
    connectPiggy: "Connect your Piggy Bank",
    scanQR: "Scan the QR code with your Lightning Wallet",
    or: "or",
    pasteNWC: "paste your NWC string",
    cancel: "Cancel",
    piggyConnected: "Piggy Bank Connected!",
    yourBalance: "Your Balance",
    showPiggy: "Show Piggy Bank",
    myPiggyBank: "My Piggy Bank",
    nextLevel: "Next Level",
    savingsAdventure: "Savings Adventure",
    // New kid-friendly explanation
    bringPiggyTitle: "Bring Your Piggy Bank to the Digital World!",
    bringPiggyExplanation:
      "Your real piggy bank can now live in the computer too! Like magic, we can bring it here to collect your digital coins.",
    magicWaysTitle: "You have two magical ways to bring your piggy bank here:",
    scanMagicPicture: "Cast a Spell with the Magic Picture",
    scanMagicExplanation:
      "Hold your phone over this special picture. It's like a magic portal that brings your piggy bank from your room straight into the computer!",
    typeSecretCode: "Whisper the Secret Code",
    typeSecretExplanation:
      "If you already have a secret code, you can type it in here. It's like a magic spell that calls your piggy bank to jump into the computer!",
    piggyAppearExplanation:
      "Once your piggy bank is here, it can start collecting your digital coins. You can watch it grow and earn awesome rewards!",
  },
  es: {
    connect: "Conectar Alcancía",
    connecting: "Conectando...",
    connected: "¡Conectado!",
    balance: "Saldo",
    sats: "sats",
    disconnect: "Desconectar",
    connectPiggy: "Conecta tu Alcancía",
    scanQR: "Escanea el código QR con tu Billetera Lightning",
    or: "o",
    pasteNWC: "Pega tu cadena NWC",
    cancel: "Cancelar",
    piggyConnected: "¡Alcancía Conectada!",
    yourBalance: "Tu Saldo",
    showPiggy: "Mostrar Alcancía",
    myPiggyBank: "Mi Alcancía",
    nextLevel: "Siguiente Nivel",
    savingsAdventure: "Aventura de Ahorro",
    // New kid-friendly explanation
    bringPiggyTitle: "¡Trae tu Alcancía al Mundo Digital!",
    bringPiggyExplanation:
      "¡Tu alcancía real ahora también puede vivir en la computadora! Como por arte de magia, podemos traerla aquí para recolectar tus monedas digitales.",
    magicWaysTitle: "Tienes dos formas mágicas de traer tu alcancía aquí:",
    scanMagicPicture: "Lanza un Hechizo con la Imagen Mágica",
    scanMagicExplanation:
      "Sostén tu teléfono sobre esta imagen especial. ¡Es como un portal mágico que trae tu alcancía desde tu habitación directamente a la computadora!",
    typeSecretCode: "Susurra el Código Secreto",
    typeSecretExplanation:
      "Si ya tienes un código secreto, puedes escribirlo aquí. ¡Es como un hechizo mágico que llama a tu alcancía para que salte a la computadora!",
    piggyAppearExplanation:
      "Una vez que tu alcancía esté aquí, puede comenzar a recolectar tus monedas digitales. ¡Puedes verla crecer y ganar recompensas increíbles!",
  },
}

// Add this after the translations object
const piggyLevels = {
  de: [
    {
      threshold: 0,
      name: "Sparschwein geschlüpft!",
      icon: "🐣",
      message: "Dein Sparschwein ist geboren! Es ist klein, rosa und bereit zum Sparen!",
    },
    {
      threshold: 100,
      name: "Erster Klang!",
      icon: "🪙",
      message: "Du hast deine ersten Satoshis gespart - juhu! Hörst du sie klingen? Kling kling!",
    },
    {
      threshold: 500,
      name: "Kleiner Sparer",
      icon: "🐷",
      message: "Der Bauch deines Sparschweins beginnt zu klimpern! Weiter so!",
    },
    {
      threshold: 1000,
      name: "Ferkel-Power!",
      icon: "🎯",
      message: "Du hast dein erstes großes Ziel erreicht - Highfive! ✋",
    },
    {
      threshold: 5000,
      name: "Blitzschnelle Schnauze",
      icon: "⚡",
      message: "Wow! Dein Sparschwein ist voller Energie! ⚡ Mehr Sats, mehr Spaß!",
    },
    {
      threshold: 10000,
      name: "Raketen-Schweinchen",
      icon: "🚀",
      message: "Dein Sparschwein hebt ab! Du sparst wie ein Stern! 🌟",
    },
    {
      threshold: 25000,
      name: "Schatzsucher",
      icon: "💼",
      message: "Du hast einen geheimen Satoshi-Schatz gefunden! Suche weiter! 🔍",
    },
    {
      threshold: 50000,
      name: "Halbzeit-Held",
      icon: "💡",
      message: "Du bist auf halbem Weg zum SATS-MEISTER! 🦸 Dein Sparschwein ist stolz!",
    },
    {
      threshold: 100000,
      name: "Sparschwein mit Hut",
      icon: "🎩",
      message: "Dein Sparschwein bekommt einen schicken Hut, weil es so verantwortungsvoll ist! 🎩",
    },
    {
      threshold: 250000,
      name: "Satoshi-Zauberer",
      icon: "🧠",
      message: "Du bist jetzt ein Spar-Zauberer! Überall Funken! ✨",
    },
    {
      threshold: 500000,
      name: "Goldenes Schweinchen",
      icon: "🏆",
      message: "Dein Sparschwein glänzt golden! Du bist so nah am ultimativen Ziel! 💛",
    },
    {
      threshold: 750000,
      name: "Diamant-Schnauze",
      icon: "💎",
      message: "Dein Sparschwein glänzt wie ein Diamant! Kannst du die Million riechen? 🐽💎",
    },
    {
      threshold: 1000000,
      name: "Sparschwein-Millionär!",
      icon: "👑",
      message:
        "Du hast es geschafft! 🎉 Dein Sparschwein tanzt, Feuerwerk steigt auf - du bist ein Satoshi-Superstar! 🌈🎆",
    },
  ],
  en: [
    {
      threshold: 0,
      name: "Piggy Hatched!",
      icon: "🐣",
      message: "Your piggy is born! It's small, pink, and ready to save!",
    },
    {
      threshold: 100,
      name: "Tiny Tink!",
      icon: "🪙",
      message: "You saved your first satoshis — yay! Can you hear them drop? Tink tink!",
    },
    {
      threshold: 500,
      name: "Little Saver",
      icon: "🐷",
      message: "Your piggy's tummy is starting to jingle! Keep going!",
    },
    { threshold: 1000, name: "Piglet Power!", icon: "🎯", message: "You reached your first big goal — high five! ✋" },
    {
      threshold: 5000,
      name: "Zappy Snout",
      icon: "⚡",
      message: "Whoa! Your piggy is zapping with energy! ⚡ More sats, more fun!",
    },
    {
      threshold: 10000,
      name: "Rocket Piggy",
      icon: "🚀",
      message: "Piggy launches into the sky! You're saving like a star! 🌟",
    },
    {
      threshold: 25000,
      name: "Treasure Tracker",
      icon: "💼",
      message: "You've found a secret satoshi stash! Keep tracking more! 🔍",
    },
    {
      threshold: 50000,
      name: "Half-Way Hero",
      icon: "💡",
      message: "You're halfway to being a SATS MASTER! 🦸 Piggy is proud!",
    },
    {
      threshold: 100000,
      name: "Hodl Hat Piggy",
      icon: "🎩",
      message: "Piggy gets a fancy hat for being so responsible! 🎩",
    },
    {
      threshold: 250000,
      name: "Satoshi Wizard",
      icon: "🧠",
      message: "You're a savings wizard now! Sparkles everywhere! ✨",
    },
    {
      threshold: 500000,
      name: "Golden Piggy",
      icon: "🏆",
      message: "Piggy is glowing gold! You're so close to the ultimate goal! 💛",
    },
    {
      threshold: 750000,
      name: "Diamond Snout",
      icon: "💎",
      message: "Piggy shines like a diamond! Can you smell the million? 🐽💎",
    },
    {
      threshold: 1000000,
      name: "Piggy Millionaire!",
      icon: "👑",
      message: "You did it! 🎉 Your piggy dances, fireworks go off — you're a satoshi superstar! 🌈🎆",
    },
  ],
  es: [
    {
      threshold: 0,
      name: "¡Alcancía Nacida!",
      icon: "🐣",
      message: "¡Tu alcancía ha nacido! Es pequeña, rosada y lista para ahorrar!",
    },
    {
      threshold: 100,
      name: "¡Primer Tintineo!",
      icon: "🪙",
      message: "¡Ahorraste tus primeros satoshis — hurra! ¿Puedes oírlos caer? ¡Tin tin!",
    },
    {
      threshold: 500,
      name: "Pequeño Ahorrador",
      icon: "🐷",
      message: "¡La pancita de tu alcancía está empezando a sonar! ¡Sigue así!",
    },
    {
      threshold: 1000,
      name: "¡Poder de Cerdito!",
      icon: "🎯",
      message: "¡Alcanzaste tu primera gran meta — choca esos cinco! ✋",
    },
    {
      threshold: 5000,
      name: "Hocico Eléctrico",
      icon: "⚡",
      message: "¡Guau! ¡Tu alcancía está llena de energía! ⚡ ¡Más sats, más diversión!",
    },
    {
      threshold: 10000,
      name: "Alcancía Cohete",
      icon: "🚀",
      message: "¡La alcancía despega hacia el cielo! ¡Estás ahorrando como una estrella! 🌟",
    },
    {
      threshold: 25000,
      name: "Rastreador de Tesoros",
      icon: "💼",
      message: "¡Has encontrado un alijo secreto de satoshis! ¡Sigue rastreando más! 🔍",
    },
    {
      threshold: 50000,
      name: "Héroe a Mitad de Camino",
      icon: "💡",
      message: "¡Estás a mitad de camino de ser un MAESTRO DE SATS! 🦸 ¡Tu alcancía está orgullosa!",
    },
    {
      threshold: 100000,
      name: "Alcancía con Sombrero",
      icon: "🎩",
      message: "¡Tu alcancía recibe un sombrero elegante por ser tan responsable! 🎩",
    },
    {
      threshold: 250000,
      name: "Mago Satoshi",
      icon: "🧠",
      message: "¡Ahora eres un mago del ahorro! ¡Chispas por todas partes! ✨",
    },
    {
      threshold: 500000,
      name: "Alcancía Dorada",
      icon: "🏆",
      message: "¡Tu alcancía brilla como el oro! ¡Estás muy cerca de la meta final! 💛",
    },
    {
      threshold: 750000,
      name: "Hocico de Diamante",
      icon: "💎",
      message: "¡Tu alcancía brilla como un diamante! ¿Puedes oler el millón? 🐽💎",
    },
    {
      threshold: 1000000,
      name: "¡Alcancía Millonaria!",
      icon: "👑",
      message: "¡Lo lograste! 🎉 Tu alcancía baila, hay fuegos artificiales — ¡eres una superestrella de satoshi! 🌈🎆",
    },
  ],
}

// Add this helper function to get the current level based on balance
function getCurrentLevel(balance: number, language: "de" | "en" | "es") {
  const levels = piggyLevels[language]
  // Find the highest level that the balance exceeds
  for (let i = levels.length - 1; i >= 0; i--) {
    if (balance >= levels[i].threshold) {
      return levels[i]
    }
  }
  return levels[0] // Default to first level
}

// Add this helper function to get the next level
function getNextLevel(balance: number, language: "de" | "en" | "es") {
  const levels = piggyLevels[language]
  for (let i = 0; i < levels.length; i++) {
    if (balance < levels[i].threshold) {
      return levels[i]
    }
  }
  return levels[levels.length - 1] // Return the highest level if all are achieved
}

export function LightningPiggyConnect({ language }: LightningPiggyConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState(0)
  const [showWidget, setShowWidget] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [nwcString, setNwcString] = useState("")

  const t = translations[language]

  // Simulate connection to Lightning Piggy
  const connectPiggy = () => {
    setIsConnecting(true)

    // Simulate API connection delay
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      // Start with a random balance between 100-5000 sats
      setBalance(Math.floor(Math.random() * 4900) + 100)
    }, 1500)
  }

  // Simulate disconnection
  const disconnectPiggy = () => {
    setIsConnected(false)
    setBalance(0)
    setIsExpanded(false)
  }

  // Simulate balance updates
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        // Randomly add 10-100 sats occasionally
        if (Math.random() > 0.7) {
          setBalance((prev) => prev + Math.floor(Math.random() * 90) + 10)
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isConnected])

  // Add this useEffect after the existing useEffect for balance updates
  useEffect(() => {
    // Function to handle the custom event
    const handleShowPiggy = () => {
      setShowWidget(true)
    }

    // Add event listener
    window.addEventListener("showPiggyBank", handleShowPiggy)

    // Clean up
    return () => {
      window.removeEventListener("showPiggyBank", handleShowPiggy)
    }
  }, [])

  // Animation for the coin dropping
  const coinVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      {/* Floating Piggy Widget */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setShowWidget(false)}
                className="absolute -right-2 -top-2 rounded-full bg-gray-100 p-1 shadow-md hover:bg-gray-200"
                aria-label="Close piggy bank"
              >
                <X className="h-3 w-3 text-gray-500" />
              </button>

              {/* Main widget */}
              <motion.div
                className={`flex items-center gap-2 rounded-full bg-white p-2 pr-3 sm:pr-4 shadow-lg transition-all ${
                  isConnected ? "bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => (isConnected ? setIsExpanded(!isExpanded) : connectPiggy())}
              >
                <div
                  className={`relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${
                    isConnected ? "bg-pink-100" : "bg-blue-100"
                  }`}
                >
                  <PiggyBankIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${isConnected ? "text-pink-500" : "text-blue-500"}`}
                  />

                  {/* Connection status indicator */}
                  {isConnecting && (
                    <div className="absolute -right-1 -top-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-400 animate-pulse"></div>
                  )}
                  {isConnected && (
                    <div className="absolute -right-1 -top-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-400"></div>
                  )}
                </div>

                {isConnecting ? (
                  <span className="text-xs sm:text-sm font-medium">{t.connecting}</span>
                ) : isConnected ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-medium">{balance}</span>
                    <span className="text-xs text-gray-500">{t.sats}</span>
                  </div>
                ) : (
                  <span className="text-xs sm:text-sm font-medium">{t.connect}</span>
                )}
              </motion.div>

              {/* Expanded balance display */}
              <AnimatePresence>
                {isExpanded && isConnected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.5,
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute bottom-full mb-2 right-0 w-64 sm:w-72 rounded-xl bg-white p-3 sm:p-4 shadow-lg border-2 border-pink-200"
                  >
                    {/* Get current and next level */}
                    {(() => {
                      const currentLevel = getCurrentLevel(balance, language)
                      const nextLevel = getNextLevel(balance, language)
                      const isMaxLevel = currentLevel === nextLevel
                      const progressToNextLevel = isMaxLevel
                        ? 100
                        : ((balance - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100

                      return (
                        <>
                          <div className="mb-2 sm:mb-3 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <span className="text-xl sm:text-2xl">{currentLevel.icon}</span>
                              <h4 className="font-bold text-pink-600 text-base sm:text-lg">{currentLevel.name}</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.yourBalance}</p>
                          </div>

                          <div className="relative mb-3 sm:mb-4 flex items-center justify-center bg-pink-50 p-3 sm:p-4 rounded-lg">
                            {/* Piggy with gentle animation */}
                            <motion.div
                              className="relative h-20 w-20 sm:h-24 sm:w-24"
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 2,
                                ease: "easeInOut",
                              }}
                            >
                              <Image
                                src="https://www.lightningpiggy.com/content/images/2024/01/BY_-_Lightning_Piggy_logo_-_character.svg"
                                alt="Lightning Piggy"
                                fill
                                className="object-contain"
                                unoptimized
                              />

                              {/* Level icon overlay */}
                              {balance >= 10000 && (
                                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                                  <div className="text-lg sm:text-xl">{currentLevel.icon}</div>
                                </div>
                              )}
                            </motion.div>

                            {/* Balance display */}
                            <div className="absolute -right-2 top-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-yellow-100 border-2 border-yellow-300 shadow-md">
                              <div className="text-center">
                                <div className="text-base sm:text-lg font-bold text-yellow-800">{balance}</div>
                                <div className="text-[8px] sm:text-[10px] text-yellow-600">{t.sats}</div>
                              </div>
                            </div>

                            {/* Occasional coin animation */}
                            <AnimatePresence>
                              {balance > 0 && Math.random() > 0.8 && (
                                <motion.div
                                  key={Date.now()}
                                  initial={{ y: -20, opacity: 0 }}
                                  animate={{ y: 20, opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 1 }}
                                  className="absolute -top-4 left-1/2 h-5 w-5 sm:h-6 sm:w-6 -translate-x-1/2"
                                >
                                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-bold text-yellow-800 border border-yellow-500">
                                    ₿
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Motivational message */}
                          <div className="mb-3 sm:mb-4 text-center bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-100">
                            <p className="text-xs sm:text-sm text-blue-700">{currentLevel.message}</p>
                          </div>

                          {/* Progress to next level */}
                          {!isMaxLevel && (
                            <div className="mb-3 sm:mb-4">
                              <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                                <span className="font-medium text-purple-600">{currentLevel.threshold} sats</span>
                                <span className="font-medium text-purple-600">{nextLevel.threshold} sats</span>
                              </div>
                              <div className="h-2 sm:h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${progressToNextLevel}%` }}
                                  transition={{ type: "spring", bounce: 0.3 }}
                                />
                              </div>
                              <div className="mt-1 text-center text-[10px] sm:text-xs text-purple-600">
                                {language === "de"
                                  ? `Nächstes Level: ${nextLevel.name}`
                                  : language === "en"
                                    ? `Next level: ${nextLevel.name}`
                                    : `Siguiente nivel: ${nextLevel.name}`}
                              </div>
                            </div>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 text-xs sm:text-sm py-1 sm:py-2"
                            onClick={disconnectPiggy}
                          >
                            {t.disconnect}
                          </Button>
                        </>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Piggy Button - Always visible at the bottom of the screen */}
      <AnimatePresence>
        {!showWidget && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-0 right-0 mx-auto flex justify-center items-center z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWidget(true)}
              className="flex items-center gap-1 sm:gap-2 rounded-full bg-pink-500 px-3 sm:px-4 py-1.5 sm:py-2 text-white shadow-lg border-2 border-pink-300"
            >
              <PiggyBankIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-xs sm:text-sm">{t.myPiggyBank}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Modal - would appear when connecting */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsConnecting(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-4 sm:p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 sm:mb-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-pink-600">{t.bringPiggyTitle}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.bringPiggyExplanation}</p>
              </div>

              <div className="mb-4 sm:mb-5">
                <h4 className="font-bold text-sm sm:text-base text-purple-600 mb-2">{t.magicWaysTitle}</h4>

                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 border-2 border-blue-100">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                      <span className="text-lg">✨</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-700 text-sm">{t.scanMagicPicture}</h5>
                      <p className="text-xs sm:text-sm text-blue-600">{t.scanMagicExplanation}</p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-3">
                    <div className="h-36 w-36 sm:h-40 sm:w-40 rounded-lg bg-white p-2 relative border-2 border-blue-200">
                      {/* This would be a real QR code in production */}
                      <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`}></div>
                        ))}
                      </div>

                      {/* Add a small piggy icon in the center of the QR code */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-1 rounded-md">
                          <div className="text-pink-500 text-xl">🐷</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border-2 border-purple-100">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                      <span className="text-lg">🔑</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-purple-700 text-sm">{t.typeSecretCode}</h5>
                      <p className="text-xs sm:text-sm text-purple-600">{t.typeSecretExplanation}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder={t.pasteNWC}
                      className="w-full rounded-lg border-2 border-purple-200 p-2 text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                      value={nwcString}
                      onChange={(e) => setNwcString(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <p className="text-center text-xs sm:text-sm text-gray-600 mb-4 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                {t.piggyAppearExplanation}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm py-1 sm:py-2 border-gray-300"
                  onClick={() => setIsConnecting(false)}
                >
                  {t.cancel}
                </Button>
                <Button
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-xs sm:text-sm py-1 sm:py-2"
                  onClick={() => {
                    setIsConnecting(false)
                    setIsConnected(true)
                    setBalance(Math.floor(Math.random() * 4900) + 100)
                  }}
                >
                  {t.connect}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

