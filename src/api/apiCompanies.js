import supabaseClient, { supabaseUrl } from "@/utils/supabase"
export async function getCompanies(token) {
  const supabase = await supabaseClient(token)

  const { data, error } = await supabase.from("companies").select("*")

  if (error) {
    console.error("error in fetching the companies", error)
    return null
  }

  return data
}
//api for adding a new company
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token)
  const random = Math.floor(Math.random() * 90000)
  const fileName = `logo-${random}-${companyData.name}`

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo)

  if (storageError) {
    console.error("error in uploading the company logo:", storageError)
    return null
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`
  const { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select()

  if (error) {
    console.error("error in submitting the companies", error)
    return null
  }

  return data
}
