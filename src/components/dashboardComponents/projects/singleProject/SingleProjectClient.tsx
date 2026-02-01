"use client"

import { TProjects } from "@/types/projectType";

interface TSingleProjectProps {
    project: TProjects
}

const SingleProjectClient = ({project}: TSingleProjectProps) => {

    console.log("new data",project);
    

    return (
        <div>
            <div> The Component is Start SingleProjectClient </div>
        </div>
    );
};

export default SingleProjectClient;
