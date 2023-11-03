let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletBtn = document.getElementById("delet-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

 if(leadsFromLocalStorage) { 
    myLeads=leadsFromLocalStorage
   render(myLeads)
 }

 deletBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)

 })
 tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)

    })

})

inputBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value)
       inputEl.value=""
       localStorage.setItem("myLeads", JSON.stringify(myLeads) )
       render(myLeads)
})

function render(Leads) {
    let listItems = ""
    for (let i=0; i<Leads.length;i++) { 
    listItems += ` 
        <li>
            <a target='_blank' href='${Leads[i]}'>
            ${Leads[i]}
            </a>
        </li>
        ` 
    }  
     
    ulEl.innerHTML = listItems

}