import { useEffect, useState } from "react";
import { Activity } from "@/lib/definitions";

function ActivityComponent({ isExpanded }: { isExpanded: boolean }) {
    const [activities, setActivities] = useState<Activity[]>([]);

    function buildFavoritedActivity(activity: Activity) {
        return (
            <>
            Favorited <span className="font-bold">{activity.title}</span>
            </>
        );
    }

    function buildWatchLaterActivity(activity: Activity) {
        return (
            <>
                Added <span className="font-bold">{activity.title}</span> to Watch Later
            </>
        );
    }
    
    useEffect(() => {
        if (!isExpanded) return; // don’t fetch unless sidebar is expanded

        async function fetchActivities() {
            try {
                const res = await fetch("/api/activities");
                if (!res.ok) {
                if (res.status === 401) {
                    console.error("Unauthorized: not logged in");
                } else {
                    console.error("Failed to fetch activities");
                }
                return;
                }

                const data = await res.json();
                // Ensure timestamps are Date objects if needed
                const formatted = data.activities.map((a: any) => ({
                ...a,
                timestamp: new Date(a.timestamp),
                }));

                setActivities(formatted);
            } catch (err) {
                console.error("Error fetching activities:", err);
            }
        }

        fetchActivities();
    }, [isExpanded]);

    return (isExpanded &&
        <div className="flex flex-col text-center justify-center text-[#00003c] bg-[#54f4d0] rounded-2xl p-2 gap-2">
            <span className="font-bold">Latest Activity</span>
            <div className="flex flex-col gap-2">
                {activities.map((activity) => (
                    <div key={activity.id} className="text-start">
                        <p>
                            {new Date(activity.timestamp).toLocaleDateString("en-US")},{" "}
                            {new Date(activity.timestamp).toLocaleTimeString("en-US")}
                        </p>
                        <p>
                            {activity.activity === "FAVORITED" ? buildFavoritedActivity(activity) : buildWatchLaterActivity(activity)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivityComponent;