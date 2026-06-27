import { useState } from "react";

// during antra online assesment session in real interview 

export default function PriorityJobs({intialJobs}){

    const [jobs, setJobs] = useState(intialJobs || []);

    function handleJobPriority(indexUpdate, newPriority){

        const updateJobs = jobs.map((job, index) => {

            if(index === indexUpdate){

            return {...job, priority: newPriority };

            }
            return job;

        });
        setJobs(updateJobs);

    }


    return(
        <div>
            <ul>
                {jobs.map((job, index) => {
                    return (
                    <li key={job.job_id}>

                        <input type="number"
                        value={job.Priority}
                        onChange={(e) => handleJobPriority(index, Number(e.target.value))}>
                        </input>

                    </li>
                    );

                })}
            </ul>
        </div>
    )

}