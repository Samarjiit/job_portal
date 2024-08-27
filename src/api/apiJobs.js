import supabaseClient from "@/utils/supabase"

// Fetch Jobs and create api for fetch the data from the supabase
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token)

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url), saved:saved_jobs(id)") //now jobs has a foreign key to companies table to fetch all the details of the company and also saved companies

  if (location) {
    query = query.eq("location", location)
  }

  if (company_id) {
    query = query.eq("company_id", company_id)
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`)
  }
  const { data, error } = await query

  if (error) {
    console.error("Error fetching jobs", error)
    return null
  }
  return data
}
//api for saved-jobs
export async function saveJob(token, { alreadySaved }, saveData) {
  //alreadysaved - some save data is alreay there ||| savedata - data that we supposed to save in saved_table
  //savedata contains :user_id and job_id
  const supabase = await supabaseClient(token)
  if (alreadySaved) {
    //if alrady saved now we need to delete it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id) //we can compare using the equal=eq with job_id of saveddata

    if (deleteError) {
      console.error("error deleting saved jobs:", deleteError)
      return null
    }

    return data
  } else {
    //save the job in saved_data table
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData]) //user id_ and job_id needed to save the job
      .select()

    if (insertError) {
      console.error("error fetching jobs:", insertError)
      return null
    }
    return data
  }
}

//fetching for single company
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications:applications(*)") //spplication for recruiter
    .eq("id", job_id)
    .single()

  if (error) {
    console.error("error fetching company", error)
    return null
  }

  return data
}

//updatehiring status api
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select()

  if (error) {
    console.error("error Updating job", error)
    return null
  }

  return data
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase.from("jobs").insert([jobData]).select()

  if (error) {
    console.error("error creating job", error)
    return null
  }

  return data
}

export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))")

  if (error) {
    console.error("error fetching saved job", error)
    return null
  }

  return data
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url))")
    .eq("recruiter_id", recruiter_id)

  if (error) {
    console.error("error fetching jobs", error)
    return null
  }

  return data
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select()

  if (error) {
    console.error("error deleting jobs", error)
    return null
  }

  return data
}
