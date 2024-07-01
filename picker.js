function selectTab(evt, tabName) {
    if (evt.currentTarget.className.includes("active")) return;
    let tabbtns, tabcontents;

    tabbtns = document.querySelectorAll(".tab-btn");
    tabbtns.forEach(element => {
        element.className = element.className.replace(" active", "");
    });
    tabcontents = document.querySelectorAll(".tab-content")
    tabcontents.forEach(element => {
        element.style.display = "none";
    });

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function pick() {
    var inparr = [];
    let sum = 0;
    let is_remove_picked = document.getElementById("remove-picked").checked;

    let inplines = document.getElementById("ta-input").value.split("\n");
    if(inplines[inplines.length-1]=="") inplines.pop();
    if(inplines.length==1) {
        if(is_remove_picked) document.getElementById("ta-input").value = "";
        document.getElementById("res-div").innerText = inplines[0].split(" ")[0]+"\n"+document.getElementById("res-div").innerText;
        return;
    }
    inplines.forEach(line=>{
        let l = line.split(' ');
        if(l.length == 1) l.push(1);
        if(l.length > 2) {
            document.getElementById("res-div").innerText = "Error: "+line;
            return;
        }
        inparr.push([l[0],sum, sum+l[1]]);
        sum += l[1];
    })
    
    let picked = Math.floor(Math.random() * sum);
    while(sum>0 && picked==sum) picked = Math.floor(Math.random() * sum);
    for(let i=0; i<inparr.length; i++){
        if(inparr[i][1]<=picked && inparr[i][2]>picked){
            if(is_remove_picked) {
                inplines.splice(i, 1);
                document.getElementById("ta-input").value = inplines.join("\n");
            }
            document.getElementById("res-div").innerText = inparr[i][0]+"\n"+document.getElementById("res-div").innerText;
            return;
        }
    }
}

function reset() {
    document.getElementById("res-div").innerText = "";
}

function resizeTextarea(evt) {
    console.log(evt.target);
    evt.target.style.height = 'auto';
    evt.target.style.height = evt.target.scrollHeight+'px';
}