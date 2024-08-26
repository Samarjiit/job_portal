import { getJobs } from "@/api/apiJobs"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import JobCard from "@/components/job-card"
import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { getCompanies } from "@/api/apiCompanies"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select"
import { State } from "country-state-city"
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser()
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery })

  //to fetch companies
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies)

  useEffect(() => {
    if (isLoaded) fnCompanies()
  }, [isLoaded])
  useEffect(() => {
    if (isLoaded) fnJobs()
  }, [isLoaded, location, company_id, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    const query = formData.get("search-query")
    if (query) setSearchQuery(query)
  }

  const clearFilters = () => {
    setCompany_id("")
    setLocation("")
    setSearchQuery("")
  }
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }

  console.log(jobs)
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* add filters another loader is for loading the jobs  */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search job by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      {console.log(jobs)}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              )
            })
          ) : (
            <div>No Job Found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing

//handlesearch function
// Purpose: This function is responsible for handling the form submission event.
// Parameters: It takes a single parameter e, which is the event object generated when the form is submitted.
// Functionality:
// Prevent Default Behavior: e.preventDefault() prevents the default form submission, which would normally cause the page to reload or navigate away.
// Create FormData: let formData = new FormData(e.target) creates a FormData object from the form that was submitted (e.target refers to the form element).
// Retrieve Query: const query = formData.get("search-query") retrieves the value of the form input field with the name search-query.
// Update State: if (query) setSearchQuery(query) checks if the query is not empty or null. If it contains a value, it updates the state using setSearchQuery(query). This state likely controls what the user sees or what is searched for.
