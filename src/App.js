import Feed from "./Components/Feed";
import Sidebar from "./Components/Sidebar";
import Widgets from "./Components/Widgets";
import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        const eventList = [];

        window.addEventListener("click", (event) => {
            let x = event.pageX;  // Horizontal
            let y = event.pageY;  // Vertical
            let time = event.timeStamp
            eventList.push({"x": x, "y": y, "timeStamp": time})
            console.log(x,y, time);
            console.log(eventList);
        });

        document.addEventListener("visibilitychange", ()=>{
            if (document.hidden) {
                fetch(process.env.REACT_APP_POST_API,{
                    method: "post",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ eventList }),
                    keepalive: true
                })

                localStorage.clear();

            }
        })

    }, []);
  return (
    <div className="container">
      <main className="flex min-h-screen max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets />
        {/* Modal */}
      </main>
    </div>
  );
}
