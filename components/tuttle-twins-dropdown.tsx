"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExternalLink, Video } from "lucide-react"

type TuttleTwinsDropdownProps = {
  className?: string
}

export function TuttleTwinsDropdown({ className }: TuttleTwinsDropdownProps) {
  const channels = [
    {
      name: "English",
      url: "https://www.youtube.com/@TuttleTwins",
      flag: "🇺🇸",
      description: "Original Tuttle Twins channel",
    },
    {
      name: "Español",
      url: "https://www.youtube.com/@TuttleTwins_es",
      flag: "🇪🇸",
      description: "Canal en español",
    },
    {
      name: "Português",
      url: "https://www.youtube.com/@TuttleTwins_BR",
      flag: "🇧🇷",
      description: "Canal em português",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`rounded-full flex items-center gap-1 sm:gap-2 ${className}`}>
          <Video className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">TuttleTwins</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 sm:w-64 p-2">
        <div className="mb-2 px-2 text-xs sm:text-sm font-medium text-gray-500">Tuttle Twins YouTube Channels</div>

        {channels.map((channel, index) => (
          <div key={index} className="mb-1 rounded-md p-1 hover:bg-blue-50">
            <DropdownMenuItem
              onClick={() => window.open(channel.url, "_blank")}
              className="flex items-start gap-2 rounded-md p-2"
            >
              <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-red-100 text-lg sm:text-xl">
                {channel.flag}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-xs sm:text-sm">{channel.name}</span>
                <span className="mt-1 text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                  {channel.description} <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </span>
              </div>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

