//const BASE_URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json`
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")

for (let select of dropdowns){
    for(currcode in countryList){
       
        let newoption=document.createElement("option")
        newoption.innerText = currcode
        newoption.value=currcode
        if(select.name=="from" && currcode == "USD"){
            newoption.selected=true
        }else if (select.name=="to" && currcode == "INR"){
            newoption.selected=true
        
        }
   select.append(newoption) 
   select.addEventListener("change",(eve)=>{
    updateflag(eve.target)
   })
 }
}
const updateflag =(element)=>{
    let currcode = element.value
    let countrycode = countryList[currcode]
    console.log(countrycode)
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
   let img = element.parentElement.querySelector("img")
   img.src= newSrc
}

btn.addEventListener("click",(eve)=>{
    eve.preventDefault()
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if(amtval==="" || amtval<1){
        amtval=1    
    amount.value=1}
    console.log(amtval)
   
    let from = document.querySelector(".fromc #from").value.toLowerCase()
    let to = document.querySelector("#to").value.toLowerCase()
   // console.log(from)
   const BASE_URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${from}.json`

   fetch(BASE_URL).then((response)=>{
    return response.json()
}).then(data=>{
   /// return console.log((data[from][to])*amtval)
   let exchange_rate = document.querySelector(".output")
   let c_rate = document.querySelector(".conversion_rate")
   exchange_rate.innerText = (data[from][to])*amtval
   c_rate.innerText = `1${from} =${to} ${data[from][to]}`

})
   
   
})
