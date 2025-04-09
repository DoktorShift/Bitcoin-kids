import { Zap, HelpCircle, Brain } from "lucide-react"
import type { ReactNode } from "react"

export type Language = "de" | "en" | "es"
export type QuestionCategory = "easy" | "medium" | "hard"

export type QuizQuestion = {
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
  category: QuestionCategory
  icon: ReactNode
  color: string
}

// This function creates the icon elements when imported
export const createQuestionIcon = (iconType: string, color: string) => {
  switch (iconType) {
    case "zap":
      return <Zap className={`h-6 w-6 ${color}`} />
    case "help":
      return <HelpCircle className={`h-6 w-6 ${color}`} />
    case "brain":
      return <Brain className={`h-6 w-6 ${color}`} />
    default:
      return <HelpCircle className={`h-6 w-6 ${color}`} />
  }
}

// Question data without React components (for easier serialization if needed)
export const questionData = [
  // EASY QUESTIONS
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
    iconType: "zap",
    iconColor: "text-yellow-500",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 2,
    question: {
      de: "Wo bewahrt man Bitcoin auf?",
      en: "Where do you store Bitcoin?",
      es: "¿Dónde se guardan los Bitcoin?",
    },
    options: {
      de: ["In einer Spardose", "Unter dem Kopfkissen", "In einer digitalen Geldbörse", "Im Kühlschrank"],
      en: ["In a piggy bank", "Under the pillow", "In a digital wallet", "In the refrigerator"],
      es: ["En una alcancía", "Debajo de la almohada", "En una billetera digital", "En el refrigerador"],
    },
    correctAnswer: 2,
    explanation: {
      de: "Bitcoin werden in einer digitalen Geldbörse aufbewahrt, die man auch 'Wallet' nennt.",
      en: "Bitcoin are stored in a digital wallet, which is also called a 'wallet'.",
      es: "Los Bitcoin se almacenan en una billetera digital, que también se llama 'wallet'.",
    },
    category: "easy",
    iconType: "help",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 3,
    question: {
      de: "Wer hat Bitcoin erfunden?",
      en: "Who invented Bitcoin?",
      es: "¿Quién inventó Bitcoin?",
    },
    options: {
      de: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "Mario Bros"],
      en: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "Mario Bros"],
      es: ["Satoshi Nakamoto", "Albert Einstein", "Bill Gates", "Mario Bros"],
    },
    correctAnswer: 0,
    explanation: {
      de: "Bitcoin wurde von einer Person oder Gruppe mit dem Namen Satoshi Nakamoto erfunden. Niemand weiß genau, wer sich hinter diesem Namen verbirgt!",
      en: "Bitcoin was invented by a person or group using the name Satoshi Nakamoto. Nobody knows exactly who is behind this name!",
      es: "Bitcoin fue inventado por una persona o grupo que usa el nombre Satoshi Nakamoto. ¡Nadie sabe exactamente quién está detrás de este nombre!",
    },
    category: "easy",
    iconType: "brain",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 4,
    question: {
      de: "Wie viele Bitcoin wird es maximal geben?",
      en: "What is the maximum number of Bitcoin that will ever exist?",
      es: "¿Cuál es el número máximo de Bitcoin que existirán?",
    },
    options: {
      de: ["21 Millionen", "1 Milliarde", "Unendlich viele", "100 Millionen"],
      en: ["21 million", "1 billion", "Infinite", "100 million"],
      es: ["21 millones", "1 billón", "Infinitos", "100 millones"],
    },
    correctAnswer: 0,
    explanation: {
      de: "Es wird nie mehr als 21 Millionen Bitcoin geben. Das macht Bitcoin selten und wertvoll, wie eine limitierte Sammelkarte!",
      en: "There will never be more than 21 million Bitcoin. This makes Bitcoin rare and valuable, like a limited edition trading card!",
      es: "Nunca habrá más de 21 millones de Bitcoin. ¡Esto hace que Bitcoin sea raro y valioso, como una tarjeta coleccionable de edición limitada!",
    },
    category: "easy",
    iconType: "zap",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 5,
    question: {
      de: "Was ist ein 'Bitcoin-Miner'?",
      en: "What is a 'Bitcoin miner'?",
      es: "¿Qué es un 'minero de Bitcoin'?",
    },
    options: {
      de: [
        "Ein Spielzeug",
        "Ein Computer, der Bitcoin-Transaktionen verarbeitet",
        "Eine Person, die nach Gold sucht",
        "Eine App zum Spielen",
      ],
      en: ["A toy", "A computer that processes Bitcoin transactions", "A person who searches for gold", "A gaming app"],
      es: [
        "Un juguete",
        "Una computadora que procesa transacciones de Bitcoin",
        "Una persona que busca oro",
        "Una aplicación de juegos",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Bitcoin-Miner sind spezielle Computer, die Transaktionen überprüfen und in die Blockchain eintragen. Sie helfen, das Bitcoin-Netzwerk sicher zu halten.",
      en: "Bitcoin miners are special computers that verify transactions and add them to the blockchain. They help keep the Bitcoin network secure.",
      es: "Los mineros de Bitcoin son computadoras especiales que verifican transacciones y las agregan a la blockchain. Sie helfen, das Bitcoin-Netzwerk sicher zu halten.",
    },
    category: "easy",
    iconType: "help",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 6,
    question: {
      de: "Was ist eine 'Blockchain'?",
      en: "What is a 'blockchain'?",
      es: "¿Qué es una 'blockchain'?",
    },
    options: {
      de: [
        "Eine Kette aus Spielzeugblöcken",
        "Ein digitales Buch, das alle Bitcoin-Transaktionen speichert",
        "Ein Spielplatz",
        "Eine Art Süßigkeit",
      ],
      en: [
        "A chain of toy blocks",
        "A digital ledger that records all Bitcoin transactions",
        "A playground",
        "A type of candy",
      ],
      es: [
        "Una cadena de bloques de juguete",
        "Un libro digital que registra todas las transacciones de Bitcoin",
        "Un patio de recreo",
        "Un tipo de dulce",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Die Blockchain ist wie ein digitales Buch, in dem alle Bitcoin-Transaktionen aufgezeichnet werden. Jeder kann es einsehen, aber niemand kann es fälschen.",
      en: "The blockchain is like a digital book that records all Bitcoin transactions. Anyone can see it, but nobody can fake it.",
      es: "La blockchain es como un libro digital que registra todas las transacciones de Bitcoin. Cualquiera puede verlo, pero nadie puede falsificarlo.",
    },
    category: "easy",
    iconType: "brain",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 7,
    question: {
      de: "Kann man mit Bitcoin Dinge kaufen?",
      en: "Can you buy things with Bitcoin?",
      es: "¿Puedes comprar cosas con Bitcoin?",
    },
    options: {
      de: [
        "Nein, es ist nur zum Anschauen",
        "Ja, in vielen Geschäften und Online-Shops",
        "Nur Spielzeug",
        "Nur in Banken",
      ],
      en: ["No, it's just for looking at", "Yes, in many stores and online shops", "Only toys", "Only in banks"],
      es: ["No, es solo para mirar", "Sí, en muchas tiendas y tiendas en línea", "Solo juguetes", "Solo en bancos"],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ja, immer mehr Geschäfte und Online-Shops akzeptieren Bitcoin als Zahlungsmittel. Du kannst damit Spielzeug, Essen und viele andere Dinge kaufen!",
      en: "Yes, more and more stores and online shops accept Bitcoin as payment. You can buy toys, food, and many other things with it!",
      es: "Sí, cada vez más tiendas y tiendas en línea aceptan Bitcoin como pago. ¡Puedes comprar juguetes, comida y muchas otras cosas con él!",
    },
    category: "easy",
    iconType: "zap",
    iconColor: "text-amber-500",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 8,
    question: {
      de: "Was ist ein 'Satoshi'?",
      en: "What is a 'Satoshi'?",
      es: "¿Qué es un 'Satoshi'?",
    },
    options: {
      de: [
        "Ein japanisches Spielzeug",
        "Der kleinste Teil eines Bitcoin",
        "Ein Bitcoin-Spiel",
        "Der Name eines Computers",
      ],
      en: ["A Japanese toy", "The smallest unit of a Bitcoin", "A Bitcoin game", "The name of a computer"],
      es: [
        "Un juguete japonés",
        "La unidad más pequeña de un Bitcoin",
        "Un juego de Bitcoin",
        "El nombre de una computadora",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Satoshi ist der kleinste Teil eines Bitcoin, benannt nach dem Erfinder von Bitcoin. Es ist wie ein Cent beim Euro, nur viel, viel kleiner!",
      en: "A Satoshi is the smallest unit of a Bitcoin, named after Bitcoin's inventor. It's like a penny to a dollar, but much, much smaller!",
      es: "Un Satoshi es la unidad más pequeña de un Bitcoin, nombrada en honor al inventor de Bitcoin. ¡Es como un centavo para un dólar, pero mucho, mucho más pequeño!",
    },
    category: "easy",
    iconType: "help",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 9,
    question: {
      de: "Braucht man eine Bank, um Bitcoin zu benutzen?",
      en: "Do you need a bank to use Bitcoin?",
      es: "¿Necesitas un banco para usar Bitcoin?",
    },
    options: {
      de: ["Ja, immer", "Nein, Bitcoin funktioniert ohne Banken", "Nur am Wochenende", "Nur für große Beträge"],
      en: ["Yes, always", "No, Bitcoin works without banks", "Only on weekends", "Only for large amounts"],
      es: [
        "Sí, siempre",
        "No, Bitcoin funciona sin bancos",
        "Solo los fines de semana",
        "Solo para grandes cantidades",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Nein, das ist das Besondere an Bitcoin! Du brauchst keine Bank, um Bitcoin zu senden oder zu empfangen. Du kontrollierst dein eigenes Geld.",
      en: "No, that's what's special about Bitcoin! You don't need a bank to send or receive Bitcoin. You control your own money.",
      es: "¡No, eso es lo especial de Bitcoin! No necesitas un banco para enviar o recibir Bitcoin. Tú controlas tu propio dinero.",
    },
    category: "easy",
    iconType: "brain",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 10,
    question: {
      de: "Kann man Bitcoin anfassen?",
      en: "Can you touch Bitcoin?",
      es: "¿Puedes tocar Bitcoin?",
    },
    options: {
      de: [
        "Ja, es sind goldene Münzen",
        "Nein, es existiert nur digital im Computer",
        "Nur mit Handschuhen",
        "Ja, aber nur im Sommer",
      ],
      en: [
        "Yes, they are golden coins",
        "No, it only exists digitally in computers",
        "Only with gloves",
        "Yes, but only in summer",
      ],
      es: [
        "Sí, son monedas doradas",
        "No, solo existe digitalmente en computadoras",
        "Solo con guantes",
        "Sí, pero solo en verano",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Bitcoin existiert nur digital in Computern und im Internet. Du kannst es nicht anfassen, aber du kannst es in deiner digitalen Geldbörse aufbewahren und damit bezahlen.",
      en: "Bitcoin only exists digitally in computers and on the internet. You can't touch it, but you can store it in your digital wallet and pay with it.",
      es: "Bitcoin solo existe digitalmente en computadoras y en internet. No puedes tocarlo, pero puedes guardarlo en tu billetera digital y pagar con él.",
    },
    category: "easy",
    iconType: "zap",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 11,
    question: {
      de: "Was passiert, wenn du dein Bitcoin-Passwort vergisst?",
      en: "What happens if you forget your Bitcoin password?",
      es: "¿Qué sucede si olvidas tu contraseña de Bitcoin?",
    },
    options: {
      de: [
        "Bitcoin schickt dir eine E-Mail",
        "Du kannst die Bank anrufen",
        "Du könntest deine Bitcoin für immer verlieren",
        "Nichts, du kannst ein neues erstellen",
      ],
      en: [
        "Bitcoin sends you an email",
        "You can call the bank",
        "You might lose your Bitcoin forever",
        "Nothing, you can create a new one",
      ],
      es: [
        "Bitcoin te envía un correo electrónico",
        "Puedes llamar al banco",
        "Podrías perder tus Bitcoin para siempre",
        "Nada, puedes crear uno nuevo",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Wenn du dein Passwort (oder deinen 'Private Key') vergisst, kann niemand dir helfen, es wiederzubekommen. Deine Bitcoin könnten für immer verloren sein. Deshalb ist es wichtig, dein Passwort sicher aufzubewahren!",
      en: "If you forget your password (or 'private key'), nobody can help you recover it. Your Bitcoin could be lost forever. That's why it's important to keep your password safe!",
      es: "Si olvidas tu contraseña (o 'clave privada'), nadie puede ayudarte a recuperarla. Tus Bitcoin podrían perderse para siempre. ¡Por eso es importante mantener tu contraseña segura!",
    },
    category: "easy",
    iconType: "help",
    iconColor: "text-amber-500",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 12,
    question: {
      de: "Wie schnell kann man Bitcoin an jemanden auf der anderen Seite der Welt senden?",
      en: "How quickly can you send Bitcoin to someone on the other side of the world?",
      es: "¿Con qué rapidez puedes enviar Bitcoin a alguien en el otro lado del mundo?",
    },
    options: {
      de: ["Es dauert Wochen", "In Sekunden oder Minuten", "Es ist unmöglich", "Nur an Feiertagen"],
      en: ["It takes weeks", "In seconds or minutes", "It's impossible", "Only on holidays"],
      es: ["Toma semanas", "En segundos o minutos", "Es imposible", "Solo en días festivos"],
    },
    correctAnswer: 1,
    explanation: {
      de: "Mit Bitcoin kannst du Geld in Sekunden oder Minuten an jeden Ort der Welt senden, egal wie weit weg! Es ist viel schneller als eine Bank.",
      en: "With Bitcoin, you can send money to anywhere in the world in seconds or minutes, no matter how far away! It's much faster than a bank.",
      es: "¡Con Bitcoin, puedes enviar dinero a cualquier lugar del mundo en segundos o minutos, sin importar cuán lejos esté! Es mucho más rápido que un banco.",
    },
    category: "easy",
    iconType: "brain",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 13,
    question: {
      de: "Wer kontrolliert das Bitcoin-Netzwerk?",
      en: "Who controls the Bitcoin network?",
      es: "¿Quién controla la red Bitcoin?",
    },
    options: {
      de: [
        "Eine große Bank",
        "Die Regierung",
        "Niemand - es wird von vielen Computern auf der ganzen Welt betrieben",
        "Superhelden",
      ],
      en: ["A big bank", "The government", "Nobody - it's run by many computers around the world", "Superheroes"],
      es: [
        "Un gran banco",
        "El gobierno",
        "Nadie - es operado por muchas computadoras en todo el mundo",
        "Superhéroes",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Bitcoin wird nicht von einer einzelnen Person oder Organisation kontrolliert. Stattdessen wird es von tausenden Computern auf der ganzen Welt betrieben, die zusammenarbeiten.",
      en: "Bitcoin isn't controlled by any single person or organization. Instead, it's run by thousands of computers around the world working together.",
      es: "Bitcoin no está controlado por ninguna persona u organización individual. En cambio, es operado por miles de computadoras en todo el mundo trabajando juntas.",
    },
    category: "easy",
    iconType: "zap",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 14,
    question: {
      de: "Was ist das 'Lightning Network'?",
      en: "What is the 'Lightning Network'?",
      es: "¿Qué es la 'Red Lightning'?",
    },
    options: {
      de: [
        "Ein Netzwerk von Blitzen am Himmel",
        "Ein schnelles Zahlungssystem für Bitcoin",
        "Ein Computerspiel",
        "Ein Netzwerk von Lampen",
      ],
      en: [
        "A network of lightning bolts in the sky",
        "A fast payment system for Bitcoin",
        "A computer game",
        "A network of lamps",
      ],
      es: [
        "Una red de rayos en el cielo",
        "Un sistema de pago rápido para Bitcoin",
        "Un juego de computadora",
        "Una red de lámparas",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Das Lightning Network ist eine Technologie, die Bitcoin-Zahlungen blitzschnell und mit sehr niedrigen Gebühren ermöglicht. Es ist wie eine Überholspur für Bitcoin!",
      en: "The Lightning Network is a technology that allows Bitcoin payments to be lightning-fast and with very low fees. It's like an express lane for Bitcoin!",
      es: "La Red Lightning es una tecnología que permite que los pagos de Bitcoin sean rápidos como un rayo y con tarifas muy bajas. ¡Es como un carril expreso para Bitcoin!",
    },
    category: "easy",
    iconType: "help",
    iconColor: "text-yellow-500",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 15,
    question: {
      de: "Kann jemand deine Bitcoin stehlen, wenn er dein Passwort nicht kennt?",
      en: "Can someone steal your Bitcoin if they don't know your password?",
      es: "¿Puede alguien robar tus Bitcoin si no conoce tu contraseña?",
    },
    options: {
      de: [
        "Ja, jederzeit",
        "Nein, ohne dein Passwort (Private Key) kann niemand deine Bitcoin nehmen",
        "Nur am Wochenende",
        "Nur wenn du schläfst",
      ],
      en: [
        "Yes, anytime",
        "No, without your password (private key), nobody can take your Bitcoin",
        "Only on weekends",
        "Only when you're sleeping",
      ],
      es: [
        "Sí, en cualquier momento",
        "No, sin tu contraseña (clave privada), nadie puede tomar tus Bitcoin",
        "Solo los fines de semana",
        "Solo cuando estás durmiendo",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Bitcoin sind durch komplizierte Mathematik geschützt. Ohne deinen Private Key (Passwort) kann niemand deine Bitcoin ausgeben oder stehlen. Deshalb ist es so wichtig, deinen Private Key sicher aufzubewahren!",
      en: "Bitcoin are protected by complicated mathematics. Without your private key (password), nobody can spend or steal your Bitcoin. That's why it's so important to keep your private key safe!",
      es: "Los Bitcoin están protegidos por matemáticas complicadas. Sin tu clave privada (contraseña), nadie puede gastar o robar tus Bitcoin. ¡Por eso es tan importante mantener tu clave privada segura!",
    },
    category: "easy",
    iconType: "brain",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },

  // MEDIUM QUESTIONS
  {
    id: 101,
    question: {
      de: "Was ist ein 'Bitcoin-Block'?",
      en: "What is a 'Bitcoin block'?",
      es: "¿Qué es un 'bloque de Bitcoin'?",
    },
    options: {
      de: [
        "Ein Spielzeugblock mit Bitcoin-Logo",
        "Eine Gruppe von Bitcoin-Transaktionen, die zusammen verarbeitet werden",
        "Ein Gebäude, in dem Bitcoin hergestellt werden",
        "Ein Hindernis beim Bitcoin-Mining",
      ],
      en: [
        "A toy block with a Bitcoin logo",
        "A group of Bitcoin transactions processed together",
        "A building where Bitcoin are made",
        "An obstacle in Bitcoin mining",
      ],
      es: [
        "Un bloque de juguete con el logotipo de Bitcoin",
        "Un grupo de transacciones de Bitcoin procesadas juntas",
        "Un edificio donde se fabrican Bitcoin",
        "Un obstáculo en la minería de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Bitcoin-Block ist wie eine Seite in einem Buch, auf der viele Transaktionen zusammen aufgeschrieben werden. Alle 10 Minuten wird ein neuer Block zur Blockchain hinzugefügt.",
      en: "A Bitcoin block is like a page in a book where many transactions are written down together. A new block is added to the blockchain about every 10 minutes.",
      es: "Un bloque de Bitcoin es como una página en un libro donde se escriben muchas transacciones juntas. Se agrega un nuevo bloque a la blockchain aproximadamente cada 10 minutos.",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 102,
    question: {
      de: "Was ist ein 'Bitcoin-Wallet'?",
      en: "What is a 'Bitcoin wallet'?",
      es: "¿Qué es una 'billetera Bitcoin'?",
    },
    options: {
      de: [
        "Eine Geldbörse aus Leder mit Bitcoin-Logo",
        "Eine App oder ein Gerät, das deine Bitcoin-Schlüssel speichert",
        "Ein Ort, an dem physische Bitcoin aufbewahrt werden",
        "Ein Geschäft, das Bitcoin verkauft",
      ],
      en: [
        "A leather wallet with a Bitcoin logo",
        "An app or device that stores your Bitcoin keys",
        "A place where physical Bitcoin are kept",
        "A store that sells Bitcoin",
      ],
      es: [
        "Una billetera de cuero con el logotipo de Bitcoin",
        "Una aplicación o dispositivo que almacena tus claves de Bitcoin",
        "Un lugar donde se guardan Bitcoin físicos",
        "Una tienda que vende Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Bitcoin-Wallet ist wie ein digitaler Schlüsselbund. Es speichert nicht die Bitcoin selbst, sondern die Schlüssel (Private Keys), die dir erlauben, deine Bitcoin zu kontrollieren und auszugeben.",
      en: "A Bitcoin wallet is like a digital keychain. It doesn't store the Bitcoin themselves, but rather the keys (private keys) that allow you to control and spend your Bitcoin.",
      es: "Una billetera Bitcoin es como un llavero digital. No almacena los Bitcoin en sí, sino las claves (claves privadas) que te permiten controlar y gastar tus Bitcoin.",
    },
    category: "medium",
    iconType: "zap",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 103,
    question: {
      de: "Was ist eine 'Bitcoin-Adresse'?",
      en: "What is a 'Bitcoin address'?",
      es: "¿Qué es una 'dirección de Bitcoin'?",
    },
    options: {
      de: [
        "Die Wohnadresse einer Person, die Bitcoin besitzt",
        "Der Ort, an dem Bitcoin-Computer stehen",
        "Eine lange Reihe von Buchstaben und Zahlen, die angibt, wohin Bitcoin gesendet werden sollen",
        "Die Webseite von Bitcoin",
      ],
      en: [
        "The home address of a person who owns Bitcoin",
        "The location where Bitcoin computers are kept",
        "A long string of letters and numbers that indicates where Bitcoin should be sent",
        "The website of Bitcoin",
      ],
      es: [
        "La dirección de casa de una persona que posee Bitcoin",
        "La ubicación donde se guardan las computadoras Bitcoin",
        "Una larga cadena de letras y números que indica adónde se deben enviar los Bitcoin",
        "El sitio web de Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Eine Bitcoin-Adresse ist wie deine E-Mail-Adresse, aber für Geld! Es ist eine lange Reihe von Buchstaben und Zahlen, die du jemandem geben kannst, damit er dir Bitcoin senden kann.",
      en: "A Bitcoin address is like your email address, but for money! It's a long string of letters and numbers that you can give to someone so they can send you Bitcoin.",
      es: "¡Una dirección de Bitcoin es como tu dirección de correo electrónico, pero para dinero! Es una larga cadena de letras y números que puedes dar a alguien para que pueda enviarte Bitcoin.",
    },
    category: "medium",
    iconType: "brain",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 104,
    question: {
      de: "Was ist ein 'Bitcoin-Node'?",
      en: "What is a 'Bitcoin node'?",
      es: "¿Qué es un 'nodo de Bitcoin'?",
    },
    options: {
      de: [
        "Ein Knoten in einem Baum, der wie ein Bitcoin aussieht",
        "Ein Computer, der eine Kopie der Blockchain speichert und Transaktionen überprüft",
        "Ein Ort, an dem Bitcoin hergestellt werden",
        "Ein Spielzeug in Form eines Bitcoin",
      ],
      en: [
        "A knot in a tree that looks like a Bitcoin",
        "A computer that stores a copy of the blockchain and verifies transactions",
        "A place where Bitcoin are made",
        "A toy shaped like a Bitcoin",
      ],
      es: [
        "Un nudo en un árbol que parece un Bitcoin",
        "Una computadora que almacena una copia de la blockchain y verifica transacciones",
        "Un lugar donde se fabrican Bitcoin",
        "Un juguete con forma de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Bitcoin-Node ist ein Computer, der mit dem Bitcoin-Netzwerk verbunden ist. Er speichert eine Kopie der gesamten Blockchain und hilft, Transaktionen zu überprüfen und weiterzuleiten.",
      en: "A Bitcoin node is a computer connected to the Bitcoin network. It stores a copy of the entire blockchain and helps verify and relay transactions.",
      es: "Un nodo de Bitcoin es una computadora conectada a la red Bitcoin. Almacena una copia de toda la blockchain y ayuda a verificar y transmitir transacciones.",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-amber-500",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 105,
    question: {
      de: "Was ist ein 'Hash' bei Bitcoin?",
      en: "What is a 'hash' in Bitcoin?",
      es: "¿Qué es un 'hash' en Bitcoin?",
    },
    options: {
      de: [
        "Ein Frühstücksgericht mit Bitcoin",
        "Eine digitale Fingerabdruck-Funktion, die Daten in einen kurzen Code umwandelt",
        "Ein Spiel, das Bitcoin-Miner spielen",
        "Ein Virus, der Bitcoin angreift",
      ],
      en: [
        "A breakfast dish with Bitcoin",
        "A digital fingerprint function that converts data into a short code",
        "A game that Bitcoin miners play",
        "A virus that attacks Bitcoin",
      ],
      es: [
        "Un plato de desayuno con Bitcoin",
        "Una función de huella digital digital que convierte datos en un código corto",
        "Un juego que juegan los mineros de Bitcoin",
        "Un virus que ataca a Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Hash ist wie ein digitaler Fingerabdruck. Er nimmt beliebige Daten und erzeugt daraus einen kurzen Code. Bei Bitcoin werden Hashes verwendet, um Blöcke zu verknüpfen und das Mining zu ermöglichen.",
      en: "A hash is like a digital fingerprint. It takes any data and creates a short code from it. In Bitcoin, hashes are used to link blocks together and enable mining.",
      es: "Un hash es como una huella digital digital. Toma cualquier dato y crea un código corto a partir de él. En Bitcoin, los hashes se utilizan para vincular bloques y permitir la minería.",
    },
    category: "medium",
    iconType: "zap",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 106,
    question: {
      de: "Was ist der Unterschied zwischen Bitcoin und traditionellem Geld?",
      en: "What's the difference between Bitcoin and traditional money?",
      es: "¿Cuál es la diferencia entre Bitcoin y el dinero tradicional?",
    },
    options: {
      de: [
        "Bitcoin ist nur für Kinder, traditionelles Geld für Erwachsene",
        "Bitcoin ist digital und wird nicht von Regierungen oder Banken kontrolliert",
        "Bitcoin kann nur online ausgegeben werden",
        "Es gibt keinen Unterschied",
      ],
      en: [
        "Bitcoin is only for kids, traditional money for adults",
        "Bitcoin is digital and not controlled by governments or banks",
        "Bitcoin can only be spent online",
        "There is no difference",
      ],
      es: [
        "Bitcoin es solo para niños, dinero tradicional para adultos",
        "Bitcoin es digital y no está controlado por gobiernos o bancos",
        "Bitcoin solo se puede gastar en línea",
        "No hay diferencia",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Der Hauptunterschied ist, dass Bitcoin digital ist und nicht von Regierungen oder Banken kontrolliert wird. Es gibt keine zentrale Autorität, die entscheidet, wie viel Bitcoin erstellt wird oder wer es benutzen darf.",
      en: "The main difference is that Bitcoin is digital and not controlled by governments or banks. There's no central authority deciding how much Bitcoin is created or who can use it.",
      es: "La principal diferencia es que Bitcoin es digital y no está controlado por gobiernos o bancos. No hay una autoridad central que decida cuánto Bitcoin se crea o quién puede usarlo.",
    },
    category: "medium",
    iconType: "brain",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 107,
    question: {
      de: "Was ist ein 'Public Key' bei Bitcoin?",
      en: "What is a 'Public Key' in Bitcoin?",
      es: "¿Qué es una 'Clave Pública' en Bitcoin?",
    },
    options: {
      de: [
        "Ein öffentlicher Schlüssel, den jeder sehen kann und der zum Empfangen von Bitcoin verwendet wird",
        "Ein Schlüssel zu einem öffentlichen Bitcoin-Gebäude",
        "Ein Passwort, das jeder kennt",
        "Ein Schlüssel, der Bitcoin-Geldautomaten öffnet",
      ],
      en: [
        "A public key that anyone can see and is used to receive Bitcoin",
        "A key to a public Bitcoin building",
        "A password that everyone knows",
        "A key that opens Bitcoin ATMs",
      ],
      es: [
        "Una clave pública que cualquiera puede ver y se usa para recibir Bitcoin",
        "Una llave para un edificio público de Bitcoin",
        "Una contraseña que todos conocen",
        "Una llave que abre cajeros automáticos de Bitcoin",
      ],
    },
    correctAnswer: 0,
    explanation: {
      de: "Ein Public Key ist wie deine Postadresse - jeder kann sie sehen und dir etwas (in diesem Fall Bitcoin) schicken. Er ist mit deinem Private Key verbunden, aber du gibst nur den Public Key weiter.",
      en: "A Public Key is like your mailing address - anyone can see it and send you something (in this case Bitcoin). It's connected to your Private Key, but you only share the Public Key.",
      es: "Una Clave Pública es como tu dirección postal - cualquiera puede verla y enviarte algo (en este caso Bitcoin). Está conectada a tu Clave Privada, pero solo compartes la Clave Pública.",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 108,
    question: {
      de: "Was ist eine 'Transaktion' bei Bitcoin?",
      en: "What is a 'transaction' in Bitcoin?",
      es: "¿Qué es una 'transacción' en Bitcoin?",
    },
    options: {
      de: [
        "Ein Gespräch zwischen Bitcoin-Minern",
        "Der Prozess des Bitcoin-Mining",
        "Die Übertragung von Bitcoin von einer Adresse zu einer anderen",
        "Der Kauf eines Bitcoin-Computers",
      ],
      en: [
        "A conversation between Bitcoin miners",
        "The process of Bitcoin mining",
        "The transfer of Bitcoin from one address to another",
        "The purchase of a Bitcoin computer",
      ],
      es: [
        "Una conversación entre mineros de Bitcoin",
        "El proceso de minería de Bitcoin",
        "La transferencia de Bitcoin de una dirección a otra",
        "La compra de una computadora Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Eine Bitcoin-Transaktion ist wie das Senden eines Briefes mit Geld - du schickst Bitcoin von deiner Adresse an die Adresse einer anderen Person. Diese Übertragung wird in der Blockchain aufgezeichnet.",
      en: "A Bitcoin transaction is like sending a letter with money - you send Bitcoin from your address to someone else's address. This transfer is recorded in the blockchain.",
      es: "Una transacción de Bitcoin es como enviar una carta con dinero - envías Bitcoin desde tu dirección a la dirección de otra persona. Esta transferencia se registra en la blockchain.",
    },
    category: "medium",
    iconType: "zap",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 109,
    question: {
      de: "Was ist eine 'Bestätigung' bei Bitcoin?",
      en: "What is a 'confirmation' in Bitcoin?",
      es: "¿Qué es una 'confirmación' en Bitcoin?",
    },
    options: {
      de: [
        "Eine E-Mail, die bestätigt, dass du Bitcoin gekauft hast",
        "Ein Zertifikat für deinen Bitcoin-Besitz",
        "Wenn ein Block mit deiner Transaktion zur Blockchain hinzugefügt wird",
        "Eine Bestätigung von der Bank",
      ],
      en: [
        "An email confirming you bought Bitcoin",
        "A certificate for your Bitcoin ownership",
        "When a block containing your transaction is added to the blockchain",
        "A confirmation from the bank",
      ],
      es: [
        "Un correo electrónico que confirma que compraste Bitcoin",
        "Un certificado de tu propiedad de Bitcoin",
        "Cuando un bloque que contiene tu transacción se agrega a la blockchain",
        "Una confirmación del banco",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Eine Bestätigung bedeutet, dass deine Transaktion in einem Block aufgenommen und zur Blockchain hinzugefügt wurde. Jeder neue Block danach ist eine weitere Bestätigung und macht die Transaktion sicherer.",
      en: "A confirmation means your transaction has been included in a block and added to the blockchain. Each new block after that is another confirmation and makes the transaction more secure.",
      es: "Una confirmación significa que tu transacción ha sido incluida en un bloque y agregada a la blockchain. Cada nuevo bloque después de eso es otra confirmación y hace que la transacción sea más segura.",
    },
    category: "medium",
    iconType: "brain",
    iconColor: "text-amber-500",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 110,
    question: {
      de: "Was ist ein 'Bitcoin-Halving'?",
      en: "What is a 'Bitcoin Halving'?",
      es: "¿Qué es un 'Halving de Bitcoin'?",
    },
    options: {
      de: [
        "Wenn der Bitcoin-Preis halbiert wird",
        "Wenn ein Bitcoin in zwei Teile geteilt wird",
        "Ein Ereignis, bei dem die Belohnung für das Mining halbiert wird",
        "Ein Spiel, bei dem man Bitcoin gewinnen kann",
      ],
      en: [
        "When the Bitcoin price is cut in half",
        "When a Bitcoin is split into two parts",
        "An event where the mining reward is cut in half",
        "A game where you can win Bitcoin",
      ],
      es: [
        "Cuando el precio de Bitcoin se reduce a la mitad",
        "Cuando un Bitcoin se divide en dos partes",
        "Un evento donde la recompensa de minería se reduce a la mitad",
        "Un juego donde puedes ganar Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Das Bitcoin-Halving ist ein Ereignis, das etwa alle vier Jahre stattfindet. Dabei wird die Belohnung, die Miner für das Hinzufügen eines neuen Blocks erhalten, halbiert. Dies reduziert die Rate, mit der neue Bitcoin erzeugt werden.",
      en: "The Bitcoin Halving is an event that happens about every four years. It cuts in half the reward that miners receive for adding a new block. This reduces the rate at which new Bitcoin are created.",
      es: "El Halving de Bitcoin es un evento que ocurre aproximadamente cada cuatro años. Reduce a la mitad la recompensa que reciben los mineros por agregar un nuevo bloque. Esto reduce la tasa a la que se crean nuevos Bitcoin.",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 211,
    question: {
      de: "Was ist ein 'Private Key' bei Bitcoin?",
      en: "What is a 'Private Key' in Bitcoin?",
      es: "¿Qué es una 'Clave Privada' en Bitcoin?",
    },
    options: {
      de: [
        "Ein geheimer Schlüssel zu deinem Bitcoin-Schatz",
        "Ein Passwort für dein E-Mail-Konto",
        "Ein Schlüssel für dein Fahrradschloss",
        "Der Name deines Lieblingstieres",
      ],
      en: [
        "A secret key to your Bitcoin treasure",
        "A password for your email account",
        "A key for your bike lock",
        "The name of your favorite pet",
      ],
      es: [
        "Una llave secreta para tu tesoro Bitcoin",
        "Una contraseña para tu cuenta de correo electrónico",
        "Una llave para tu candado de bicicleta",
        "El nombre de tu mascota favorita",
      ],
    },
    correctAnswer: 0,
    explanation: {
      de: "Ein Private Key ist wie ein geheimer Zauberschlüssel, der dir erlaubt, deine Bitcoin zu bewegen. Wer diesen Schlüssel hat, kann die Bitcoin ausgeben - also halte ihn immer geheim!",
      en: "A Private Key is like a secret magic key that allows you to move your Bitcoin. Whoever has this key can spend the Bitcoin - so always keep it secret!",
      es: "Una Clave Privada es como una llave mágica secreta que te permite mover tus Bitcoin. Quien tenga esta llave puede gastar los Bitcoin, ¡así que mantenla siempre en secreto!",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 212,
    question: {
      de: "Was ist ein 'Block Reward'?",
      en: "What is a 'Block Reward'?",
      es: "¿Qué es una 'Recompensa de Bloque'?",
    },
    options: {
      de: [
        "Ein Spielzeug in einer Überraschungsbox",
        "Neue Bitcoin, die Miner für ihre Arbeit bekommen",
        "Ein Geschenk für deinen Geburtstag",
        "Ein Preis in einem Videospiel",
      ],
      en: [
        "A toy in a surprise box",
        "New Bitcoin that miners get for their work",
        "A gift for your birthday",
        "A prize in a video game",
      ],
      es: [
        "Un juguete en una caja sorpresa",
        "Nuevos Bitcoin que los mineros reciben por su trabajo",
        "Un regalo para tu cumpleaños",
        "Un premio en un videojuego",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Der Block Reward ist wie ein Preis, den Bitcoin-Miner bekommen, wenn sie einen neuen Block finden. Es sind neue Bitcoin, die als Belohnung für ihre Arbeit erschaffen werden.",
      en: "The Block Reward is like a prize that Bitcoin miners get when they find a new block. It's new Bitcoin created as a reward for their work.",
      es: "La Recompensa de Bloque es como un premio que reciben los mineros de Bitcoin cuando encuentran un nuevo bloque. Son nuevos Bitcoin creados como recompensa por su trabajo.",
    },
    category: "medium",
    iconType: "zap",
    iconColor: "text-yellow-500",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 213,
    question: {
      de: "Was ist eine 'Bitcoin-Halbierung' (Halving)?",
      en: "What is a 'Bitcoin Halving'?",
      es: "¿Qué es un 'Halving de Bitcoin'?",
    },
    options: {
      de: [
        "Wenn jemand seine Bitcoin in zwei Teile schneidet",
        "Wenn der Bitcoin-Preis um die Hälfte fällt",
        "Wenn die Belohnung für Miner alle vier Jahre halbiert wird",
        "Ein Spiel, bei dem man Bitcoin teilt",
      ],
      en: [
        "When someone cuts their Bitcoin in half",
        "When the Bitcoin price drops by half",
        "When the reward for miners is cut in half every four years",
        "A game where you split Bitcoin",
      ],
      es: [
        "Cuando alguien corta sus Bitcoin por la mitad",
        "Cuando el precio de Bitcoin cae a la mitad",
        "Cuando la recompensa para los mineros se reduce a la mitad cada cuatro años",
        "Un juego donde divides Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Die Bitcoin-Halbierung ist ein besonderes Ereignis, das etwa alle vier Jahre stattfindet. Dabei wird die Belohnung, die Miner für ihre Arbeit bekommen, halbiert. Das macht Bitcoin mit der Zeit immer seltener.",
      en: "The Bitcoin Halving is a special event that happens about every four years. It cuts the reward that miners get for their work in half. This makes Bitcoin more scarce over time.",
      es: "El Halving de Bitcoin es un evento especial que ocurre aproximadamente cada cuatro años. Reduce a la mitad la recompensa que reciben los mineros por su trabajo. Esto hace que Bitcoin sea más escaso con el tiempo.",
    },
    category: "medium",
    iconType: "brain",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 214,
    question: {
      de: "Was ist ein 'Cold Wallet'?",
      en: "What is a 'Cold Wallet'?",
      es: "¿Qué es una 'Cartera Fría'?",
    },
    options: {
      de: [
        "Eine Geldbörse, die im Kühlschrank aufbewahrt wird",
        "Eine Bitcoin-Geldbörse, die nicht mit dem Internet verbunden ist",
        "Eine Geldbörse, die nur im Winter benutzt wird",
        "Eine App, die deine Bitcoin kühlt",
      ],
      en: [
        "A wallet kept in the refrigerator",
        "A Bitcoin wallet that's not connected to the internet",
        "A wallet only used in winter",
        "An app that cools down your Bitcoin",
      ],
      es: [
        "Una billetera guardada en el refrigerador",
        "Una billetera Bitcoin que no está conectada a internet",
        "Una billetera que solo se usa en invierno",
        "Una aplicación que enfría tus Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Cold Wallet ist eine sichere Art, Bitcoin aufzubewahren, weil es nicht mit dem Internet verbunden ist. Es ist wie ein Tresor, der vor Hackern geschützt ist, weil er offline bleibt.",
      en: "A Cold Wallet is a secure way to store Bitcoin because it's not connected to the internet. It's like a vault that's protected from hackers because it stays offline.",
      es: "Una Cartera Fría es una forma segura de almacenar Bitcoin porque no está conectada a internet. Es como una bóveda que está protegida de los hackers porque permanece fuera de línea.",
    },
    category: "medium",
    iconType: "help",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 215,
    question: {
      de: "Was ist ein 'Bitcoin-Fork'?",
      en: "What is a 'Bitcoin Fork'?",
      es: "¿Qué es un 'Fork de Bitcoin'?",
    },
    options: {
      de: [
        "Eine Gabel zum Essen von Bitcoin-Kuchen",
        "Eine Straßengabelung im Bitcoin-Land",
        "Eine Abspaltung oder Änderung der Bitcoin-Regeln",
        "Ein Werkzeug zum Bitcoin-Mining",
      ],
      en: [
        "A fork for eating Bitcoin cake",
        "A fork in the road in Bitcoin land",
        "A split or change in the Bitcoin rules",
        "A tool for Bitcoin mining",
      ],
      es: [
        "Un tenedor para comer pastel de Bitcoin",
        "Una bifurcación en el camino en la tierra de Bitcoin",
        "Una división o cambio en las reglas de Bitcoin",
        "Una herramienta para la minería de Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Ein Bitcoin-Fork ist wie eine Abzweigung in der Straße. Es passiert, wenn sich die Regeln von Bitcoin ändern und sich das Netzwerk in zwei verschiedene Wege aufteilt.",
      en: "A Bitcoin fork is like a fork in the road. It happens when the rules of Bitcoin change and the network splits into two different paths.",
      es: "Un fork de Bitcoin es como una bifurcación en el camino. Sucede cuando las reglas de Bitcoin cambian y la red se divide en dos caminos diferentes.",
    },
    category: "medium",
    iconType: "zap",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },

  // HARD QUESTIONS
  {
    id: 301,
    question: {
      de: "Was ist ein '51%-Angriff'?",
      en: "What is a '51% attack'?",
      es: "¿Qué es un 'ataque del 51%'?",
    },
    options: {
      de: [
        "Ein Angriff von 51 Hackern",
        "Wenn jemand mehr als die Hälfte der Bitcoin-Mining-Leistung kontrolliert",
        "Ein Angriff auf 51 Bitcoin-Knoten",
        "Ein Angriff, der 51 Stunden dauert",
      ],
      en: [
        "An attack by 51 hackers",
        "When someone controls more than half of the Bitcoin mining power",
        "An attack on 51 Bitcoin nodes",
        "An attack that lasts 51 hours",
      ],
      es: [
        "Un ataque de 51 hackers",
        "Cuando alguien controla más de la mitad del poder de minería de Bitcoin",
        "Un ataque a 51 nodos de Bitcoin",
        "Un ataque que dura 51 horas",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein 51%-Angriff ist, wenn jemand mehr als die Hälfte der Computer kontrolliert, die Bitcoin-Transaktionen überprüfen. Das ist wie wenn in einer Abstimmung eine Person mehr Stimmen hat als alle anderen zusammen! Diese Person könnte dann unehrliche Dinge tun, wie zum Beispiel so tun, als hätte sie ihr Geld nicht ausgegeben, obwohl sie es schon getan hat. Zum Glück ist es sehr, sehr schwer, so viele Computer zu kontrollieren!",
      en: "A 51% attack is when someone controls more than half of the computers that check Bitcoin transactions. It's like if one person in a vote has more votes than everyone else combined! This person could then do dishonest things, like pretend they didn't spend their money when they actually did. Luckily, it's very, very hard to control that many computers!",
      es: "Un ataque del 51% es cuando alguien controla más de la mitad de las computadoras que verifican las transacciones de Bitcoin. ¡Es como si una persona en una votación tuviera más votos que todos los demás juntos! Esta persona podría hacer cosas deshonestas, como fingir que no gastó su dinero cuando en realidad sí lo hizo. Por suerte, ¡es muy, muy difícil controlar tantas computadoras!",
    },
    category: "hard",
    iconType: "help",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 302,
    question: {
      de: "Was bedeutet 'Proof of Work'?",
      en: "What does 'Proof of Work' mean?",
      es: "¿Qué significa 'Prueba de Trabajo'?",
    },
    options: {
      de: [
        "Ein Trick um nicht zu arbeiten.",
        "Ein System, das Bitcoin verwendet, um einen Arbeitsnachweis zu präsentieren.",
        "Ein Zertifikat für Bitcoin-Miner",
        "Ein Spiel, bei dem man Arbeit beweisen muss",
      ],
      en: [
        "A trick to avoid working.",
        "A system that Bitcoin uses to present proof of work.",
        "A certificate for Bitcoin miners",
        "A game where you have to prove work",
      ],
      es: [
        "Un truco para evitar trabajar.",
        "Un sistema que Bitcoin utiliza para presentar prueba de trabajo.",
        "Un certificado para los mineros de Bitcoin",
        "Un juego donde tienes que probar el trabajo",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Proof of Work ist ein System, das Bitcoin verwendet, um neue Blöcke zur Blockchain hinzuzufügen. Miner müssen schwierige Rechenaufgaben lösen, um einen neuen Block zu erstellen.",
      en: "Proof of Work is a system that Bitcoin uses to add new blocks to the blockchain. Miners have to solve difficult computational problems to create a new block.",
      es: "Prueba de Trabajo es un sistema que Bitcoin utiliza para agregar nuevos bloques a la cadena de bloques. Los mineros tienen que resolver problemas computacionales difíciles para crear un nuevo bloque.",
    },
    category: "hard",
    iconType: "brain",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 303,
    question: {
      de: "Was ist ein 'Smart Contract'?",
      en: "What is a 'Smart Contract'?",
      es: "¿Qué es un 'Contrato Inteligente'?",
    },
    options: {
      de: [
        "Ein Vertrag mit einem Roboter",
        "Ein Computerprogramm, das automatisch eine Vereinbarung ausführt",
        "Ein Vertrag, der besonders schlau ist",
        "Ein Vertrag, den nur intelligente Menschen verstehen",
      ],
      en: [
        "A contract with a robot",
        "A computer program that automatically executes an agreement",
        "A contract that is particularly clever",
        "A contract that only intelligent people understand",
      ],
      es: [
        "Un contrato con un robot",
        "Un programa de computadora que ejecuta automáticamente un acuerdo",
        "Un contrato que es particularmente inteligente",
        "Un contrato que solo las personas inteligentes entienden",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Ein Smart Contract ist ein Computerprogramm, das automatisch die Bedingungen einer Vereinbarung ausführt, wenn bestimmte Bedingungen erfüllt sind. Es ist wie ein Vertrag, der sich selbst durchsetzt.",
      en: "A Smart Contract is a computer program that automatically executes the terms of an agreement when certain conditions are met. It's like a contract that enforces itself.",
      es: "Un Contrato Inteligente es un programa de computadora que ejecuta automáticamente los términos de un acuerdo cuando se cumplen ciertas condiciones. Es como un contrato que se hace cumplir a sí mismo.",
    },
    category: "hard",
    iconType: "zap",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 304,
    question: {
      de: "Was ist das 'Double-Spending-Problem'?",
      en: "What is the 'Double-Spending Problem'?",
      es: "¿Qué es el 'Problema del Doble Gasto'?",
    },
    options: {
      de: [
        "Wenn man zu viel Geld ausgibt",
        "Wenn man versucht, dieselben Bitcoin zweimal auszugeben",
        "Wenn man doppelt so viel Bitcoin bekommt",
        "Wenn man zwei Geldbörsen hat",
      ],
      en: [
        "When you spend too much money",
        "When you try to spend the same Bitcoin twice",
        "When you get twice as much Bitcoin",
        "When you have two wallets",
      ],
      es: [
        "Cuando gastas demasiado dinero",
        "Cuando intentas gastar los mismos Bitcoin dos veces",
        "Cuando obtienes el doble de Bitcoin",
        "Cuando tienes dos billeteras",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Das Double-Spending-Problem ist das Risiko, dass jemand versucht, dieselben Bitcoin zweimal auszugeben. Bitcoin löst dieses Problem durch die Blockchain, die alle Transaktionen aufzeichnet.",
      en: "The Double-Spending Problem is the risk that someone will try to spend the same Bitcoin twice. Bitcoin solves this problem with the blockchain, which records all transactions.",
      es: "El Problema del Doble Gasto es el riesgo de que alguien intente gastar los mismos Bitcoin dos veces. Bitcoin resuelve este problema con la cadena de bloques, que registra todas las transacciones.",
    },
    category: "hard",
    iconType: "help",
    iconColor: "text-yellow-500",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 305,
    question: {
      de: "Was ist 'Mining Difficulty'?",
      en: "What is 'Mining Difficulty'?",
      es: "¿Qué es la 'Dificultad de Minería'?",
    },
    options: {
      de: [
        "Wie schwer es ist, Bitcoin zu finden",
        "Wie schwer es ist, einen Bitcoin-Miner zu bauen",
        "Wie schwer es ist, einen neuen Block zu minen",
        "Wie schwer es ist, Bitcoin zu verstehen",
      ],
      en: [
        "How hard it is to find Bitcoin",
        "How hard it is to build a Bitcoin miner",
        "How hard it is to mine a new block",
        "How hard it is to understand Bitcoin",
      ],
      es: [
        "Qué tan difícil es encontrar Bitcoin",
        "Qué tan difícil es construir un minero de Bitcoin",
        "Qué tan difícil es minar un nuevo bloque",
        "Qué tan difícil es entender Bitcoin",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Mining Difficulty ist ein Maß dafür, wie schwer es ist, einen neuen Block im Bitcoin-Netzwerk zu minen. Sie passt sich an, um sicherzustellen, dass neue Blöcke etwa alle 10 Minuten gefunden werden.",
      en: "Mining Difficulty is a measure of how hard it is to mine a new block on the Bitcoin network. It adjusts to ensure that new blocks are found about every 10 minutes.",
      es: "La Dificultad de Minería es una medida de qué tan difícil es minar un nuevo bloque en la red Bitcoin. Se ajusta para garantizar que se encuentren nuevos bloques aproximadamente cada 10 minutos.",
    },
    category: "hard",
    iconType: "brain",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 306,
    question: {
      de: "Was ist eine 'Seed Phrase'?",
      en: "What is a 'Seed Phrase'?",
      es: "¿Qué es una 'Frase Semilla'?",
    },
    options: {
      de: [
        "Ein Spruch, der Bitcoin wachsen lässt",
        "Eine Liste von Wörtern, die deinen Private Key wiederherstellen kann",
        "Ein Passwort für dein E-Mail-Konto",
        "Ein Zauberspruch für Bitcoin-Miner",
      ],
      en: [
        "A phrase that makes Bitcoin grow",
        "A list of words that can recover your private key",
        "A password for your email account",
        "A magic spell for Bitcoin miners",
      ],
      es: [
        "Una frase que hace crecer Bitcoin",
        "Una lista de palabras que puede recuperar tu clave privada",
        "Una contraseña para tu cuenta de correo electrónico",
        "Un hechizo mágico para mineros de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Eine Seed Phrase ist eine Liste von 12 oder 24 Wörtern, die deinen Private Key wiederherstellen kann. Es ist wie ein Backup-Schlüssel für deine Bitcoin-Wallet. Bewahre sie sicher auf!",
      en: "A Seed Phrase is a list of 12 or 24 words that can recover your private key. It's like a backup key for your Bitcoin wallet. Keep it safe!",
      es: "Una Frase Semilla es una lista de 12 o 24 palabras que puede recuperar tu clave privada. Es como una llave de respaldo para tu billetera Bitcoin. ¡Mantenla segura!",
    },
    category: "hard",
    iconType: "help",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 307,
    question: {
      de: "Was ist 'UTXO' bei Bitcoin?",
      en: "What is 'UTXO' in Bitcoin?",
      es: "¿Qué es 'UTXO' en Bitcoin?",
    },
    options: {
      de: [
        "Ein Spielzeug für Bitcoin-Fans",
        "Unausgegebener Transaktionsoutput - die Grundbausteine von Bitcoin-Transaktionen",
        "Eine spezielle Art von Bitcoin-Miner",
        "Ein Virus, der Bitcoin-Wallets angreift",
      ],
      en: [
        "A toy for Bitcoin fans",
        "Unspent Transaction Output - the building blocks of Bitcoin transactions",
        "A special type of Bitcoin miner",
        "A virus that attacks Bitcoin wallets",
      ],
      es: [
        "Un juguete para fans de Bitcoin",
        "Salida de Transacción No Gastada - los componentes básicos de las transacciones de Bitcoin",
        "Un tipo especial de minero de Bitcoin",
        "Un virus que ataca billeteras Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "UTXO steht für 'Unspent Transaction Output' (unausgegebener Transaktionsoutput). Es ist wie die Münzen in deiner Geldbörse - jede hat einen bestimmten Wert und wenn du etwas kaufst, verwendest du eine oder mehrere dieser Münzen.",
      en: "UTXO stands for 'Unspent Transaction Output'. It's like the coins in your wallet - each has a specific value, and when you buy something, you use one or more of these coins.",
      es: "UTXO significa 'Salida de Transacción No Gastada'. Es como las monedas en tu billetera - cada una tiene un valor específico, y cuando compras algo, usas una o más de estas monedas.",
    },
    category: "hard",
    iconType: "zap",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 308,
    question: {
      de: "Was ist 'SegWit'?",
      en: "What is 'SegWit'?",
      es: "¿Qué es 'SegWit'?",
    },
    options: {
      de: [
        "Ein Bitcoin-Spiel",
        "Eine Verbesserung des Bitcoin-Protokolls, die mehr Transaktionen ermöglicht",
        "Eine Art von Bitcoin-Wallet",
        "Ein Bitcoin-Virus",
      ],
      en: [
        "A Bitcoin game",
        "An improvement to the Bitcoin protocol that allows for more transactions",
        "A type of Bitcoin wallet",
        "A Bitcoin virus",
      ],
      es: [
        "Un juego de Bitcoin",
        "Una mejora al protocolo Bitcoin que permite más transacciones",
        "Un tipo de billetera Bitcoin",
        "Un virus de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "SegWit (Segregated Witness) ist eine Verbesserung des Bitcoin-Protokolls, die mehr Transaktionen in einem Block ermöglicht. Es ist wie ein Trick, um mehr Briefe in einen Briefkasten zu stecken.",
      en: "SegWit (Segregated Witness) is an improvement to the Bitcoin protocol that allows for more transactions in a block. It's like a trick to fit more letters in a mailbox.",
      es: "SegWit (Testigo Segregado) es una mejora al protocolo Bitcoin que permite más transacciones en un bloque. Es como un truco para meter más cartas en un buzón.",
    },
    category: "hard",
    iconType: "brain",
    iconColor: "text-amber-500",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 309,
    question: {
      de: "Was ist ein 'Orphan Block'?",
      en: "What is an 'Orphan Block'?",
      es: "¿Qué es un 'Bloque Huérfano'?",
    },
    options: {
      de: [
        "Ein Block ohne Transaktionen",
        "Ein Block, der von keinem Miner gemocht wird",
        "Ein Block, der nicht Teil der Hauptblockchain ist",
        "Ein Block für Waisenkinder",
      ],
      en: [
        "A block without transactions",
        "A block that no miner likes",
        "A block that is not part of the main blockchain",
        "A block for orphaned children",
      ],
      es: [
        "Un bloque sin transacciones",
        "Un bloque que a ningún minero le gusta",
        "Un bloque que no es parte de la blockchain principal",
        "Un bloque para niños huérfanos",
      ],
    },
    correctAnswer: 2,
    explanation: {
      de: "Ein Orphan Block ist ein Block, der nicht Teil der Hauptblockchain ist. Es ist wie ein Puzzleteil, das nicht in das Hauptpuzzle passt, weil jemand anderes schneller war.",
      en: "An Orphan Block is a block that is not part of the main blockchain. It's like a puzzle piece that doesn't fit into the main puzzle because someone else was faster.",
      es: "Un Bloque Huérfano es un bloque que no es parte de la blockchain principal. Es como una pieza de rompecabezas que no encaja en el rompecabezas principal porque alguien más fue más rápido.",
    },
    category: "hard",
    iconType: "help",
    iconColor: "text-red-500",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 310,
    question: {
      de: "Was ist 'Schnorr Signatures' bei Bitcoin?",
      en: "What are 'Schnorr Signatures' in Bitcoin?",
      es: "¿Qué son las 'Firmas Schnorr' en Bitcoin?",
    },
    options: {
      de: [
        "Unterschriften von Satoshi Nakamoto",
        "Eine effizientere Art, Transaktionen zu signieren",
        "Eine Art, Bitcoin zu zeichnen",
        "Unterschriften auf physischen Bitcoin-Münzen",
      ],
      en: [
        "Signatures from Satoshi Nakamoto",
        "A more efficient way to sign transactions",
        "A way to draw Bitcoin",
        "Signatures on physical Bitcoin coins",
      ],
      es: [
        "Firmas de Satoshi Nakamoto",
        "Una forma más eficiente de firmar transacciones",
        "Una forma de dibujar Bitcoin",
        "Firmas en monedas físicas de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Schnorr Signatures sind eine effizientere Art, Bitcoin-Transaktionen zu signieren. Sie ermöglichen es, mehrere Signaturen zu einer zusammenzufassen, was Platz spart und die Privatsphäre verbessert.",
      en: "Schnorr Signatures are a more efficient way to sign Bitcoin transactions. They allow multiple signatures to be combined into one, saving space and improving privacy.",
      es: "Las Firmas Schnorr son una forma más eficiente de firmar transacciones Bitcoin. Permiten combinar múltiples firmas en una, ahorrando espacio y mejorando la privacidad.",
    },
    category: "hard",
    iconType: "zap",
    iconColor: "text-green-500",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 311,
    question: {
      de: "Was ist 'Taproot' bei Bitcoin?",
      en: "What is 'Taproot' in Bitcoin?",
      es: "¿Qué es 'Taproot' en Bitcoin?",
    },
    options: {
      de: [
        "Eine Pflanze, die Bitcoin-Miner mögen",
        "Ein Update, das die Privatsphäre und Effizienz von Bitcoin verbessert",
        "Ein Werkzeug zum Graben nach Bitcoin",
        "Ein Spiel für Bitcoin-Fans",
      ],
      en: [
        "A plant that Bitcoin miners like",
        "An update that improves the privacy and efficiency of Bitcoin",
        "A tool for digging up Bitcoin",
        "A game for Bitcoin fans",
      ],
      es: [
        "Una planta que les gusta a los mineros de Bitcoin",
        "Una actualización que mejora la privacidad y eficiencia de Bitcoin",
        "Una herramienta para desenterrar Bitcoin",
        "Un juego para fans de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Taproot ist ein wichtiges Update für Bitcoin, das 2021 aktiviert wurde. Es verbessert die Privatsphäre und Effizienz von Bitcoin-Transaktionen und ermöglicht komplexere Smart Contracts.",
      en: "Taproot is an important update to Bitcoin that was activated in 2021. It improves the privacy and efficiency of Bitcoin transactions and enables more complex smart contracts.",
      es: "Taproot es una actualización importante para Bitcoin que se activó en 2021. Mejora la privacidad y eficiencia de las transacciones Bitcoin y permite contratos inteligentes más complejos.",
    },
    category: "hard",
    iconType: "brain",
    iconColor: "text-purple-500",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 312,
    question: {
      de: "Was ist 'Layer 2' bei Bitcoin?",
      en: "What is 'Layer 2' in Bitcoin?",
      es: "¿Qué es 'Capa 2' en Bitcoin?",
    },
    options: {
      de: [
        "Die zweite Schicht einer Bitcoin-Münze",
        "Protokolle, die auf Bitcoin aufbauen, um Skalierbarkeit zu verbessern",
        "Der zweite Teil des Bitcoin-Whitepapers",
        "Eine zweite Version von Bitcoin",
      ],
      en: [
        "The second layer of a Bitcoin coin",
        "Protocols built on top of Bitcoin to improve scalability",
        "The second part of the Bitcoin whitepaper",
        "A second version of Bitcoin",
      ],
      es: [
        "La segunda capa de una moneda Bitcoin",
        "Protocolos construidos sobre Bitcoin para mejorar la escalabilidad",
        "La segunda parte del libro blanco de Bitcoin",
        "Una segunda versión de Bitcoin",
      ],
    },
    correctAnswer: 1,
    explanation: {
      de: "Layer 2 bezieht sich auf Protokolle, die auf der Bitcoin-Blockchain aufbauen, um Probleme wie Skalierbarkeit zu lösen. Das Lightning Network ist ein Beispiel für eine Layer-2-Lösung, die schnellere und günstigere Transaktionen ermöglicht.",
      en: "Layer 2 refers to protocols built on top of the Bitcoin blockchain to solve issues like scalability. The Lightning Network is an example of a Layer 2 solution that enables faster and cheaper transactions.",
      es: "Capa 2 se refiere a protocolos construidos sobre la blockchain de Bitcoin para resolver problemas como la escalabilidad. La Red Lightning es un ejemplo de una solución de Capa 2 que permite transacciones más rápidas y económicas.",
    },
    category: "hard",
    iconType: "help",
    iconColor: "text-blue-500",
    color: "bg-blue-100 border-blue-300",
  },
]

export const getQuizQuestions = (): QuizQuestion[] => {
  // Process the question data to add React components
  return questionData.map((question) => {
    // Create the icon based on the iconType and iconColor
    const icon = createQuestionIcon(question.iconType, question.iconColor)

    // Return the question with the icon added
    return {
      ...question,
      icon,
    }
  })
}

export const getRandomQuestions = (difficulty: QuestionCategory, count: number): QuizQuestion[] => {
  // Always shuffle the questions first, regardless of whether we have enough or not
  const filteredQuestions = getQuizQuestions().filter((question) => question.category === difficulty)

  // Shuffle the filtered questions
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random())

  // If we don't have enough questions, return all available (but shuffled)
  if (filteredQuestions.length <= count) {
    return shuffled
  }

  // Return the requested number of shuffled questions
  return shuffled.slice(0, count)
}
