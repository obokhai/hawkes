import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, Link2 } from "lucide-react"

// Map status values to badge styles
const statusColorMap = {
  "in progress": "bg-orange-500 text-white",
  "completed": "bg-green-600 text-white",
  "pending": "bg-red-600 text-white",
}

export default function TaskCard(props) {
  const {
    title,
    description,
    status,
    date,
    commentsCount,
    linksCount,
  } = props

  const badgeClasses = statusColorMap[status] || "bg-gray-200 text-gray-700"

  return (
    <Card className="rounded-xl min-w-60 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <Badge className={`px-2 py-0.5 text-xs rounded ${badgeClasses}`}>
          {status}
        </Badge>

        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="bg-gray-100 text-xs rounded-md px-2 py-1 w-fit text-gray-700 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </div>

        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {commentsCount ===0 ? "No" : commentsCount} Comment
          </div>
          <div className="flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            {linksCount}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
