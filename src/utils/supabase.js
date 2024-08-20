import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
//used to setup supabase with clerk
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      Headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  })
  return supabase
}

export default supabaseClient
