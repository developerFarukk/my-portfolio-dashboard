

import { DashboardHome } from "@/components/dashboardComponents/dashboardHome";
import { getDashboarsData } from "@/service/DashboardService";



const DashboardHomeServer = async () => {

    const data = await getDashboarsData()

    return (
        <div>
            <DashboardHome data={data} />
        </div>
    );
};

export default DashboardHomeServer;

