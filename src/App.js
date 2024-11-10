import Feed from "./Components/Feed";
import Sidebar from "./Components/Sidebar";
import Widgets from "./Components/Widgets";
import {useEffect} from "react";
import PdfViewer from "./PdfViewer";

export default function App() {
    useEffect(() => {

        let helpButton = document.getElementById("get-help")
        let helpTimer;

        helpButton.display = "none"

        setTimeout(async () => {
            helpButton.display = "block"
            helpTimer = setInterval(handleHelpTimer, 1000);
        }, 240000);

        let helpButtonWait = 60
        let startTime = new Date().getTime();
        let remainingTime;

        // const helpTimer = setInterval(handleHelpTimer, 1000);

        // Code inspired from -;
        // https://www.tutorialspoint.com/how-to-convert-javascript-seconds-to-minutes-and-seconds
        async function handleHelpTimer() {
            helpButtonWait = helpButtonWait - 1;
            let helpButton = document.getElementById("get-help")
            let minutes = Math.floor(helpButtonWait / 60);
            let extraSeconds = helpButtonWait % 60;
            if (minutes < 10) {
                minutes = "0" + minutes
            }

            if (extraSeconds < 10) {
                extraSeconds = "0" + extraSeconds
            }
            helpButton.disabled = true;
            helpButton.innerHTML = minutes + ":" + extraSeconds
            helpButton.style.backgroundColor = "#808080"
            helpButton.style.color = "white"

            if (helpButtonWait === 0) {
                helpButton.innerHTML = "00:00"
                clearInterval(helpTimer);
                await savingData();
                return;
            }

            // console.log(helpButtonWait)
        }

        // function handleHelpTimer(){
        //     helpButtonWait = helpButtonWait-1;
        //     // console.log("Help Timer Called")
        //     if(helpButtonWait > 9){
        //         let helpButton = document.getElementById("get-help")
        //         helpButton.innerHTML = "Get help in 00:"+ helpButtonWait;
        //         helpButton.disabled = true;
        //         helpButton.style.backgroundColor = "#808080"
        //         helpButton.style.color = "white"
        //     } else if(helpButtonWait !== 0){
        //         let helpButton = document.getElementById("get-help")
        //         helpButton.innerHTML = "Get help in 00:0"+ helpButtonWait;
        //         helpButton.disabled = true;
        //         helpButton.style.backgroundColor = "#808080"
        //         helpButton.style.color = "white"
        //     }else {
        //         let helpButton = document.getElementById("get-help")
        //         helpButton.innerHTML = "Help";
        //         helpButton.disabled = false;
        //         clearInterval(helpTimer);
        //         helpButton.style.backgroundColor = "#8B44A2"
        //         helpButton.style.color = "white"
        //         helpButton.style.cursor = "pointer"
        //     }
        //     // console.log(helpButtonWait)
        //
        // }

        // document.getElementById('get-help').addEventListener('click', ()=>{
        //     let pauseTime = new Date().getTime();
        //     console.log(pauseTime - startTime);
        //     clearTimeout(automaticSave);
        //     let timeDone = pauseTime - startTime
        //     console.log(timeDone)
        //     remainingTime = 300000 - timeDone;
        //     document.getElementById('help-document').style.display = 'flex';
        // })

        // document.getElementById('close-button-toolbar').addEventListener('click', ()=>{
        //     document.getElementById('help-document').style.display = 'none';
        //     document.getElementById('get-help').style.display = 'none';
        //     console.log(remainingTime)
        //     setTimeout(async () => {
        //         await savingData();
        //     }, remainingTime);
        //
        //
        // })

        // let automaticSave = setTimeout(async () => {
        //     await savingData();
        // }, 300000);

        let date = new Date();
        date = date.toLocaleString("en-CA", {
            timeZone: "America/Vancouver",
            timeZoneName: "long",
        });
        const eventList = [{"appName": "Twitter", "date": date}];


        window.addEventListener("click", (event) => {
            pushToEventList(event)
        });

        window.addEventListener("dblclick", (event) => {
            pushToEventList(event)
        });

        window.addEventListener('contextmenu', (event) => {
            pushToEventList(event)
        });

        window.addEventListener("mousedown", (event) => {
            pushToEventList(event)
        });

        window.addEventListener("mouseup", (event) => {
            pushToEventList(event)
        });


        window.addEventListener("keydown", (event) => {
            pushToEventList(event)
        });

        window.addEventListener("keyup", (event) => {
            pushToEventList(event)
        });

        let MouseMoveData;

        window.addEventListener("mousemove", (event) => {
            getMouseMoveData(event)
        });

        setInterval(pushMouseMoveData, 500);

        function pushToEventList(event){
            let x = event.pageX;  // Horizontal
            let y = event.pageY;  // Vertical
            let time = event.timeStamp
            eventList.push({"type": event.type, "PageX": x, "PageY": y, "timeStamp": time,
                "Id": event.target.id,
                "class": event.target.className,
                "tagName": event.target.tagName,
                "BoundingX": event.target.getBoundingClientRect().x,
                "BoundingY": event.target.getBoundingClientRect().y,
                "clientX": event.clientX,
                "clientY": event.clientY,
                "clientLeft": event.target.clientLeft,
                "clientTop": event.target.clientTop,
                "clientWidth": event.target.clientWidth,
                "clientHeight": event.target.clientHeight,
                "EleScrollHeight": event.target.scrollHeight,
                "EleScrollWidth": event.target.scrollWidth,
                "EleScrollTop": event.target.scrollTop,
                "EleScrollLeft": event.target.scrollLeft,
                "QueryStr": generateQueryStr(event.target),
                "XPath": getElementXPath(event.target),
                "XPath2": getXPath(event.target),
                "classPath": getElementTreeClassPath(event.target),
                "button": event.button,
                "ctrlKey": event.ctrlKey,
                "shiftKey": event.shiftKey,
                "altKey": event.altKey,
                "metaKey": event.metaKey,
                "key": event.key? event.key: null,
                "code": event.code? event.code: null,})
            console.log(x,y, time);
            console.log(event.target);
            console.log(eventList);
        }

        function getMouseMoveData(event){
            let x = event.pageX;  // Horizontal
            let y = event.pageY;  // Vertical
            let time = event.timeStamp
            MouseMoveData = {"type": event.type, "PageX": x, "PageY": y, "timeStamp": time,
                "Id": event.target.id,
                "class": event.target.className,
                "tagName": event.target.tagName,
                "BoundingX": event.target.getBoundingClientRect().x,
                "BoundingY": event.target.getBoundingClientRect().y,
                "clientX": event.clientX,
                "clientY": event.clientY,
                "clientLeft": event.target.clientLeft,
                "clientTop": event.target.clientTop,
                "clientWidth": event.target.clientWidth,
                "clientHeight": event.target.clientHeight,
                "EleScrollHeight": event.target.scrollHeight,
                "EleScrollWidth": event.target.scrollWidth,
                "EleScrollTop": event.target.scrollTop,
                "EleScrollLeft": event.target.scrollLeft,
                "QueryStr": generateQueryStr(event.target),
                "XPath": getElementXPath(event.target),
                "XPath2": getXPath(event.target),
                "classPath": getElementTreeClassPath(event.target),
                "button": event.button,
                "ctrlKey": event.ctrlKey,
                "shiftKey": event.shiftKey,
                "altKey": event.altKey,
                "metaKey": event.metaKey,
                "key": event.key? event.key: null,
                "code": event.code? event.code: null,}
        }

        function pushMouseMoveData(){
            eventList.push(MouseMoveData);
            // console.log(eventList);
        }

        async function uploadToS3(){

            const url = process.env.REACT_APP_MY_CONSTANT
            const response = await fetch(url)
            const resp =  await response.json()

            try {
                const result = await fetch(resp.message, {
                    method: "put",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(eventList)
                })
                return result
            } catch (error) {
                throw new Error(`Upload failed: ${error.message}`);
            }

        }

        const JSONToFile = () => {
            const blob = new Blob([JSON.stringify(eventList)], {
                type: 'application/json',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            let date = new Date();
            a.download = `Twitter`+ date+`.json`;
            a.click();
        };

        async function savingData() {
            document.getElementById('loadingOverlay').style.display = 'flex';

            try {
                // const uploadResult = await uploadToS3();
                // console.log("successful")
                JSONToFile()
                alert('Upload successful!');
            } catch (error) {
                console.error('Error uploading data:', error);
                alert('Failed to upload data.');
            } finally {
                document.getElementById('loadingOverlay').style.display = 'none';
                document.getElementById('nextOverlay').style.display = 'flex';
                localStorage.clear();
            }

        }

        document.getElementById('save-data').addEventListener('click', async ()=>{
            await savingData();
        })

        document.addEventListener("visibilitychange", async ()=>{
            if (document.hidden) {
                localStorage.clear();
            }
        });

        function getXPath(node){
            if(node.hasAttribute("id")){
                return '//' + node.tagName + '[@id="' + node.id + '"]';
            }

            if(node.hasAttribute("class")){
                return '//' + node.tagName + '[@class="' + node.getAttribute("class") + '"]';
            }

            var old = '/' + node.tagName;
            var new_path = getXPath(node.parentNode) + old;

            return new_path;
        }

// This code is inspired from https://codepen.io/jraoult/pen/nRexpM?editors=1111
        function getElementXPath(element)
        {
            if (element && element.id)
                return '//*[@id="' + element.id + '"]';
            else
                return getElementTreeXPath(element);
        };

        function getElementTreeXPath(element)
        {
            var paths = [];

            // Use nodeName (instead of localName) so namespace prefix is included (if any).
            for (; element && element.nodeType == 1; element = element.parentNode)
            {
                var index = 0;
                for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
                {
                    // Ignore document type declaration.
                    if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                        continue;

                    if (sibling.nodeName == element.nodeName)
                        ++index;
                }

                var tagName = element.nodeName.toLowerCase();
                var pathIndex = (index ? "[" + (index+1) + "]" : "");
                paths.splice(0, 0, tagName + pathIndex);
            }

            return paths.length ? "/" + paths.join("/") : null;
        }

        function getElementTreeClassPath(element)
        {
            var paths = [];

            // Use nodeName (instead of localName) so namespace prefix is included (if any).
            for (; element && element.nodeType == 1; element = element.parentNode)
            {
                var index = 0;
                for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
                {
                    // Ignore document type declaration.
                    if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                        continue;

                    if (sibling.className == element.className)
                        ++index;
                }

                var tagName = element.className;
                var pathIndex = (index ? "[" + (index+1) + "]" : "");
                paths.splice(0, 0, tagName + pathIndex);
            }

            return paths.length ? "/" + paths.join("/") : null;
        }

// This code is inspired from https://github.com/muitanprasert/HelpCall-extension

        const includedAttr = ['role', 'aria-label', 'name', 'type']
        const interactive_nodes = {
            'a':{ name:'', attr:'href'}, // could be button or link, too confusing
            'audio':{ name:'audio player', attr:'controls'},
            'video':{ name:'video player', attr:'controls'},
            'button':{ name:'button' },
            'details':{ name:'' },
            'embed':{ name:'embedded content' },
            'iframe':{ name:'embedded content' },
            'img':{ name:'image', attr: 'usemap'},
            'input':{ name:'$[type] field' }, // type != hidden
            'select':{ name: 'drop-down list'},
            'textarea':{ name: 'textbox' }
        }
        function generateQueryStr(node){
            let parent = findInteractiveRole(node).elm;
            if(parent && parent.tagName != "BODY")
                node = parent;
            let queryStr = " || ";
            let attrs = includedAttr;

            // start with textContent if the node has it
            if(node.textContent != '' && node.textContent.length < 50){
                queryStr = " || " + node.textContent;
            }

            // exception cases
            else if(window.location.href.includes("whenisgood") && node.tagName=='IMG' && node.hasAttribute('onclick')){
                if(node.getAttribute("onclick").includes("startDate"))
                    queryStr = " || " + "$DATE:startDate";
                else if(node.getAttribute("onclick").includes("endDate"))
                    queryStr = " || " + "$DATE:endDate";
            }
            else if(window.location.href.includes("mail.google"))

                if(window.location.href.includes("expedia")){
                    attrs.pop("aria-label");
                    attrs.push("data-stid");
                }
                else if(window.location.href.includes("whenisgood")){
                    attrs.push("class");
                }

            // append the selector
            while(node.parentElement != null){
                let tempStr = node.nodeName.toLowerCase();
                attrs.forEach(attr =>{
                    if(node.hasAttribute(attr) && typeof node.getAttribute(attr) == "string")
                        tempStr += '['+attr+'="'+node.getAttribute(attr)+'"]';
                });

                queryStr = tempStr + ' ' + queryStr;
                node = node.parentElement;
            }
            //console.log(queryStr);
            return queryStr;
        }

        function findInteractiveRole(el, initEl){
            if(el == null || el.parentNode == null) // stop before document
                return { elm: document.body, role:''};  // return body to just use the click's location directly

            // check by role (explicit)
            includedAttr.forEach(attr => {
                if(el.hasAttribute(attr)){
                    return { elm: el, role: el.getAttribute(attr) };
                }
            })

            // check by nodeName (implicit)
            let nodeName = el.nodeName.toLowerCase();
            if(nodeName in interactive_nodes){
                if ('attr' in interactive_nodes[nodeName]){
                    if(!el.hasAttribute(interactive_nodes[nodeName]['attr']))
                        return { elm: initEl, role:''};
                }
                if(nodeName == 'input'){
                    if(!el.hasAttribute('type') || el['type']=="text")
                        return { elm: el, role:'textbox'};
                    if(el['type'] == 'hidden')
                        return { elm: initEl, role:''};
                    return { elm: el, role: el['type'] + ' input field' };
                }
                return { elm: el, role: interactive_nodes[nodeName]['name'] };
            }

            // check parent recursively
            return findInteractiveRole(el.parentNode, initEl);
        }


    }, []);
  return (
      <>
          <div id="header">
              <div>
                  <h3 id="task-heading">Task Objective</h3>
                  <p>Create and post a Twitter poll to gather opinions on whether individuals like pineapple on pizza</p>
              </div>
              <div id="save-button">
                  <button name="help" id="get-help" aria-label="button" role="button"></button>
                  <button name="save" id="save-data" aria-label="button" role="button">Next</button>
              </div>
          </div>
    <div className="container">

        {/*<div id="help-document">*/}
        {/*    <div id="doc-toolbar">*/}
        {/*        <div id="help-document-toolbar">*/}
        {/*            <div id="close-button-toolbar">*/}
        {/*                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16">*/}
        {/*                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>*/}
        {/*                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>*/}
        {/*                </svg>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div id="doc-source">*/}
        {/*            <PdfViewer></PdfViewer>*/}
        {/*            /!*<embed src="TwitterTaskSteps.pdf#toolbar=0" height="500" width="80%"/>*!/*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

        <div id="loadingOverlay">Saving, please wait...</div>
        <div id="nextOverlay">Please click the Stop Sharing button below...</div>
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
          </>
  );
}
