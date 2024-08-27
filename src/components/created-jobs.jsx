import { getMyJobs } from "@/api/apiJobs"
import useFetch from "@/hooks/use-fetch"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import { useUser } from "@clerk/clerk-react"
import JobCard from "./job-card"
const CreatedJobs = () => {
  const { user } = useUser()
  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, { recruiter_id: user.id })

  useEffect(() => {
    fnCreatedJobs()
  }, [])

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }
  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {createdJobs?.length ? (
        createdJobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fnCreatedJobs} //to fetchall the jobs again after the job is deleted
              isMyJob
            />
          )
        })
      ) : (
        <div>No Job Found</div>
      )}
    </div>
  )
}

export default CreatedJobs
