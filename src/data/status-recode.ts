// Job status types
export type JobStatus = "completed" | "in-progress" | "pending" | "failed"

// Job interface
export interface Job {
  id: string
  name: string
  status: JobStatus
  timestamp: string
}

// Dummy data for each day (API-ready structure)
export const statusRecodeData: Record<number, Job[]> = {
  0: [
    // Today
    { id: "1", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "2", name: "Lead Score Update", status: "in-progress", timestamp: "11:15 AM" },
    { id: "3", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "4", name: "Inventory Refresh", status: "pending", timestamp: "1:30 PM" },
    { id: "5", name: "Demand Analysis", status: "in-progress", timestamp: "2:45 PM" },
    { id: "6", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "7", name: "Email Campaign Sync", status: "pending", timestamp: "4:00 PM" },
    { id: "8", name: "Database Backup", status: "completed", timestamp: "5:15 PM" },
  ],
  1: [
    // Yesterday
    { id: "9", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "10", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "11", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "12", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "13", name: "Demand Analysis", status: "failed", timestamp: "2:45 PM" },
    { id: "14", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "15", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
  ],
  2: [
    // 2 days ago
    { id: "16", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "17", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "18", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "19", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "20", name: "Demand Analysis", status: "completed", timestamp: "2:45 PM" },
    { id: "21", name: "Report Generation", status: "failed", timestamp: "3:20 PM" },
    { id: "22", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
    { id: "23", name: "Database Backup", status: "completed", timestamp: "5:15 PM" },
  ],
  3: [
    // 3 days ago
    { id: "24", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "25", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "26", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "27", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "28", name: "Demand Analysis", status: "completed", timestamp: "2:45 PM" },
    { id: "29", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "30", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
  ],
  4: [
    // 4 days ago
    { id: "31", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "32", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "33", name: "Price Optimization", status: "failed", timestamp: "12:00 PM" },
    { id: "34", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "35", name: "Demand Analysis", status: "completed", timestamp: "2:45 PM" },
    { id: "36", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "37", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
    { id: "38", name: "Database Backup", status: "completed", timestamp: "5:15 PM" },
  ],
  5: [
    // 5 days ago
    { id: "39", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "40", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "41", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "42", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "43", name: "Demand Analysis", status: "completed", timestamp: "2:45 PM" },
    { id: "44", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "45", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
  ],
  6: [
    // 6 days ago
    { id: "46", name: "VIN Data Sync", status: "completed", timestamp: "10:30 AM" },
    { id: "47", name: "Lead Score Update", status: "completed", timestamp: "11:15 AM" },
    { id: "48", name: "Price Optimization", status: "completed", timestamp: "12:00 PM" },
    { id: "49", name: "Inventory Refresh", status: "completed", timestamp: "1:30 PM" },
    { id: "50", name: "Demand Analysis", status: "completed", timestamp: "2:45 PM" },
    { id: "51", name: "Report Generation", status: "completed", timestamp: "3:20 PM" },
    { id: "52", name: "Email Campaign Sync", status: "completed", timestamp: "4:00 PM" },
    { id: "53", name: "Database Backup", status: "completed", timestamp: "5:15 PM" },
  ],
}

// Function to get jobs for a specific day
export function getJobsForDay(dayIndex: number): Job[] {
  return statusRecodeData[dayIndex] || []
}
