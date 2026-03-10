# Supabase Database Setup for Uniryde

This document provides instructions on how to set up the required database tables in Supabase for the Uniryde application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon/public key from the project settings

## Setting Up Database Tables

### 1. Rides Table

The `rides` table stores information about all rides in the system.

```sql
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time TEXT NOT NULL,
  from TEXT NOT NULL,
  to TEXT NOT NULL,
  price INTEGER NOT NULL,
  date TEXT NOT NULL,
  waiting_time TEXT NOT NULL,
  riders JSONB NOT NULL DEFAULT '[]',
  created_by TEXT NOT NULL,
  max_riders INTEGER NOT NULL DEFAULT 4,
  meeting_point TEXT NOT NULL,
  available_seats INTEGER NOT NULL
);

-- Enable Row Level Security
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read rides
CREATE POLICY "Allow anyone to read rides" ON rides
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to create rides
CREATE POLICY "Allow authenticated users to create rides" ON rides
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow ride creators to update their rides
CREATE POLICY "Allow ride creators to update their rides" ON rides
  FOR UPDATE USING (auth.uid()::text = created_by);

