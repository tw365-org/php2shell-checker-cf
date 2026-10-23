-- PHP2Shell Checker D1 Database Schema

-- Scans table: records of URL check requests
CREATE TABLE IF NOT EXISTS scans (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    target_host TEXT NOT NULL,
    patch_status TEXT NOT NULL, -- 'ok', 'potentially_vulnerable', 'unknown'
    php_version TEXT,
    reason TEXT NOT NULL,
    exit_code INTEGER NOT NULL,
    headers_summary TEXT,
    ip_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_status ON scans(patch_status);
CREATE INDEX IF NOT EXISTS idx_scans_host ON scans(target_host);

-- Monitored targets table: domains to periodically scan via Cron
CREATE TABLE IF NOT EXISTS monitored_targets (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    last_status TEXT DEFAULT 'unknown',
    last_version TEXT,
    last_checked_at DATETIME,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    username TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- System Settings & Webhook configuration
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value) VALUES 
('webhook_url', ''),
('webhook_enabled', '0'),
('custom_rules_json', '[]');
