// connect.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://stmwbgyttcjcjsgfgvre.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bXdiZ3l0dGNqY2pzZ2ZndnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTEyMDQsImV4cCI6MjA3ODUyNzIwNH0.ixVTa67sY3nlTRrz3_HPqTa5ANmCfu4ZP0nFc9mYFps"
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Connected to Database");
  // L'adresse IP de votre serveur  ipconfig getifaddr en0 172.20.10.14

export default supabase;