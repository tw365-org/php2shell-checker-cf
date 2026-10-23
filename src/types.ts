export type PatchStatus = 'ok' | 'potentially_vulnerable' | 'unknown'

export interface CheckResult {
  url: string
  target_host: string
  patch_status: PatchStatus
  php_version: string | null
  reason: string
  exit_code: number
  headers_summary?: string
  checked_at?: string
  id?: string
}

export interface MonitoredTarget {
  id: string
  url: string
  label: string
  last_status: PatchStatus
  last_version: string | null
  last_checked_at: string | null
  is_active: number
  created_at: string
}

export interface Env {
  DB: D1Database
  APP_NAME?: string
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  JWT_SECRET?: string
}
