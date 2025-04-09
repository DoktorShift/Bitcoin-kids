"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PiggyBankIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { init, Button as BitcoinConnectButton, onConnected, disconnect } from "@getalby/bitcoin-connect-react"

type LightningPiggyConnectProps = {
  language: "de" | "en" | "es"
}

// Update the translations object to remove scanning-related entries
const translations = {
  de: {
    connect: "Sparschwein verbinden",
    connecting: "Verbinde...",
    connected: "Verbunden!",
    balance: "Guthaben",
    sats: "Sats",
    disconnect: "Trennen",
    connectPiggy: "Verbinde dein Sparschwein",
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
    connectWithWallet: "Verbinde mit deiner Wallet",
    connectExplanation: "Klicke auf den Knopf, um dein digitales Sparschwein mit deiner Lightning-Wallet zu verbinden!",
    magicPortalOpening: "Magisches Portal öffnet sich...",
  },
  en: {
    connect: "Connect Piggy",
    connecting: "Connecting...",
    connected: "Connected!",
    balance: "Balance",
    sats: "sats",
    disconnect: "Disconnect",
    connectPiggy: "Connect your Piggy Bank",
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
    connectWithWallet: "Connect with your Wallet",
    connectExplanation: "Click the button to connect your digital piggy bank to your Lightning wallet!",
    magicPortalOpening: "Magic portal opening...",
  },
  es: {
    connect: "Conectar Alcancía",
    connecting: "Conectando...",
    connected: "¡Conectado!",
    balance: "Saldo",
    sats: "sats",
    disconnect: "Desconectar",
    connectPiggy: "Conecta tu Alcancía",
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
    connectWithWallet: "Conecta con tu Billetera",
    connectExplanation: "¡Haz clic en el botón para conectar tu alcancía digital con tu billetera Lightning!",
    magicPortalOpening: "Portal mágico abriéndose...",
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
  const [weblnProvider, setWeblnProvider] = useState<any>(null)

  const t = translations[language]

  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined" && typeof HTMLElement !== "undefined"

  // Initialize Bitcoin Connect when component mounts
  useEffect(() => {
    // Only run in browser environment
    if (!isBrowser) return

    // Initialize Bitcoin Connect with app name and specific connectors
    // Completely discard LN Link by using only the specific connectors we want
    init({
      appName: "Bitcoin Kids Learning",
      // Only include these four specific connectors and exclude everything else
      include: ["alby", "coinos", "nwc", "lnbits"],
      exclude: ["lnlink"], // Explicitly exclude LN Link for extra safety
      showBalance: true, // Request balance from wallet
    })

    // Set up listener for when a wallet connects
    const unsubscribe = onConnected((provider) => {
      console.log("WebLN provider connected:", provider)
      setWeblnProvider(provider)
      setIsConnected(true)
      setIsConnecting(false)

      // Get the initial balance
      fetchBalance(provider)
    })

    return () => {
      // Clean up listener when component unmounts
      unsubscribe()
    }
  }, [])

  // Function to fetch balance from the connected wallet
  const fetchBalance = async (provider: any) => {
    try {
      const { balance } = await provider.getBalance()
      console.log("Wallet balance:", balance)
      setBalance(balance)
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  // Connect to wallet using Bitcoin Connect
  const connectPiggy = () => {
    setIsConnecting(true)
  }

  // Disconnect from wallet
  const disconnectPiggy = () => {
    disconnect()
    setIsConnected(false)
    setWeblnProvider(null)
    setBalance(0)
    setIsExpanded(false)
  }

  // Periodically update balance when connected
  useEffect(() => {
    if (isConnected && weblnProvider) {
      const interval = setInterval(() => {
        fetchBalance(weblnProvider)
      }, 10000) // Check balance every 10 seconds

      return () => clearInterval(interval)
    }
  }, [isConnected, weblnProvider])

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

      {/* Connection Modal - simplified with Bitcoin Connect */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setIsConnecting(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { type: "spring", bounce: 0.4, duration: 0.6 },
              }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-pink-50 to-blue-50 p-5 shadow-lg border-2 border-pink-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating stars background */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute text-yellow-300 text-opacity-60"
                    style={{
                      fontSize: Math.random() * 14 + 8 + "px",
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2 + Math.random() * 3,
                      delay: Math.random() * 2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-4">
                  <motion.div
                    className="inline-block mb-2"
                    animate={{ rotate: [0, -5, 0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                  >
                    <PiggyBankIcon className="h-12 w-12 text-pink-500 mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-pink-600 mb-1">Magic Piggy Portal</h3>
                  <p className="text-sm text-pink-600/80">Tap to bring your piggy bank to life!</p>
                </div>

                {/* Piggy animation - simplified */}
                <div className="bg-white/60 rounded-xl p-4 mb-4 flex justify-center items-center relative overflow-hidden">
                  <motion.div
                    className="relative h-24 w-24"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  >
                    <Image
                      src="https://www.lightningpiggy.com/content/images/2024/01/BY_-_Lightning_Piggy_logo_-_character.svg"
                      alt="Lightning Piggy"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>

                  {/* Coin animation */}
                  <motion.div
                    className="absolute h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-bold text-yellow-800 border border-yellow-500 shadow-md"
                    initial={{ y: 50, x: -20, opacity: 0 }}
                    animate={{
                      y: -50,
                      opacity: [0, 1, 0],
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      repeatDelay: 2,
                    }}
                  >
                    ₿
                  </motion.div>
                </div>

                {/* Connect button area */}
                <div className="bg-blue-100/70 rounded-xl p-4 mb-4 border border-blue-200">
                  <p className="text-center text-blue-700 text-sm mb-3">
                    Touch the magic button to open a portal for your piggy bank!
                  </p>

                  <div className="relative flex justify-center items-center">
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg blur-md"
                      animate={{
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                    />

                    {/* Bitcoin Connect Button */}
                    <BitcoinConnectButton
                      onConnect={(provider) => {
                        console.log("Connected with provider:", provider)
                        setWeblnProvider(provider)
                        setIsConnected(true)
                        setIsConnecting(false)
                        fetchBalance(provider)
                      }}
                      className="relative z-10 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md border border-pink-300 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Cancel button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 text-sm py-2"
                  onClick={() => setIsConnecting(false)}
                >
                  Go back
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
