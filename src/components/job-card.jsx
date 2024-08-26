/* eslint-disable no-unused-vars */
import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { MapPinIcon, Trash2Icon, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { saveJob } from "@/api/apiJobs"
import useFetch from "@/hooks/use-fetch"
import { useEffect, useState } from "react"
const JobCard = ({
  job,

  isMyJob = false, // it is uwd for recruiter to not show the heart icon
  savedInit = false, //no job is saved
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit) //when ever we click heart icon it iwll check if it was not saved now it will save b/c data from backend sending us saved job so to acheive that we use useeffect
  const {
    fn: fnSavedJob,
    data: SavedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved })
  const { user } = useUser()

  const handleSaveJob = async () => {
    await fnSavedJob({ user_id: user.id, job_id: job.id })
    onJobSaved() //when use jobcard inside save_job space so after saving the job we need to refetch the jobs
  }

  useEffect(() => {
    if (SavedJob !== undefined) setSaved(SavedJob?.length > 0) //after saving the job if it is not undefined so someone already save the job
  }, [SavedJob])

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disable={loadingSavedJob} //when ever we fetch the deails of the saved job then the button will be disable
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default JobCard
