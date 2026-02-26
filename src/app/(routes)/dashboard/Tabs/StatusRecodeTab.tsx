"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectActiveStatusRecodeDay, setActiveStatusRecodeDay } from "@/store/slices/uiSlice"
import { getJobsForDay, type JobStatus } from "@/data/status-recode"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react"
import { useMemo } from "react"
import { useGetJobHealth } from "../api/api"
import { Spinner } from "@/components/ui/spinner"

export function StatusRecodeTab() {
  const dispatch = useAppDispatch()
  const activeDay = useAppSelector(selectActiveStatusRecodeDay)

  const dayTabs = useMemo(() => {
    const tabs = []
    const today = new Date()

    // First two tabs are always Today and Yesterday
    tabs.push({ label: "Today", index: 0 })
    tabs.push({ label: "Yesterday", index: 1 })

    // Remaining 5 tabs are previous days with day names
    for (let i = 2; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
      tabs.push({ label: dayName, index: i })
    }

    return tabs
  }, [])

  const { data, isLoading, isError } = useGetJobHealth()

const jobs = useMemo(() => {
  if (!data?.response) return []

  const today = new Date()
  const selectedDate = new Date(today)
  selectedDate.setDate(today.getDate() - activeDay)

  const formattedDate = selectedDate.toISOString().split("T")[0]

  const dayData = data.response[formattedDate]

  if (!dayData) return []

  // Convert object → array
  return Object.entries(dayData).map(([name, status]) => ({
    id: name,
    name,
    status,
    timestamp: formattedDate,
  }))
}, [data, activeDay])
  // Get jobs for the active day
  // const jobs = getJobsForDay(activeDay)

  // Status styling helper
  const getStatusConfig = (status: JobStatus) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          color: "text-success",
          bgColor: "bg-success/10",
          label: "Completed",
        }
      case "in-progress":
        return {
          icon: Clock,
          color: "text-info",
          bgColor: "bg-info/10",
          label: "In Progress",
        }
      case "pending":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          label: "Pending",
        }
      case "failed":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          label: "Failed",
        }
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        {/* <Spinner className="text-primary h-10 w-10" /> */}

        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Inner Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {dayTabs.map((tab) => (
          <Button
            key={tab.index}
            variant={activeDay === tab.index ? "default" : "outline"}
            onClick={() => dispatch(setActiveStatusRecodeDay(tab.index))}
            className="text-sm font-medium whitespace-nowrap"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Job Activity List */}
      <div className="space-y-3">
        {jobs.map((job: any) => {
          const statusConfig = getStatusConfig(job.status)
          const StatusIcon = statusConfig.icon

          return (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              {/* Job Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                  <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{job.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{job.timestamp}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
              >
                {statusConfig.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No jobs found for this day</p>
        </div>
      )}
    </div>
  )
}
