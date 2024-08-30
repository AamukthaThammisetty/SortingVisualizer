let sort = document.getElementById("btn2");
let sizeInput = document.getElementById("size");
let newSizeButton = document.getElementById("btn1");
let barsContainer = document.querySelector(".bars");
let numContainer=document.querySelector(".nums");
const array = [];
let stop=document.querySelector("#btn3")
let bool=true;
sizeInput.value = "10";
newSizeButton.addEventListener("click", () => {
    let size = parseInt(sizeInput.value);
    barsContainer.innerHTML = "";
    numContainer.innerHTML="";
    for (let i = 0; i < size; i++) {
        array[i] = Math.floor(Math.random()*100);
        let bar = document.createElement("div");
        let nums=document.createElement("p");
        nums.innerHTML=array[i];
        nums.style.width=(100-size)*0.5+"px";
        nums.style.margin="1px";
        nums.style.color="black";
        numContainer.appendChild(nums);
        bar.style.height =array[i]+"px";
        bar.style.width = (100-size)*0.5+"px";
        bar.style.margin="1px";
        bar.style.backgroundColor = "black";
        barsContainer.appendChild(bar);
    }
});

sort.addEventListener("click", () => {
  bool=true;
    let sortings = document.getElementById("sorts").value;
    if (sortings === "bubble") {
       bubbleSort();
    }
    else if(sortings==="selection"){
        selection();
    }
    else if(sortings==="insertion"){
        insertion();
    }
});

async function bubbleSort(){
  if(bool==true){
    let size = parseInt(sizeInput.value);
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        let bar1 = barsContainer.children[j];
        let bar2 = barsContainer.children[j + 1];
        let num1=numContainer.children[j];
        let num2=numContainer.children[j+1];
      
        bar1.style.backgroundColor = "red";
        bar2.style.backgroundColor = "red";
        if (!bool){
          await pause()
        };
        await sleep(400); 
        if (parseInt(bar1.style.height) > parseInt(bar2.style.height)) {
          [bar1.style.height, bar2.style.height] = [bar2.style.height, bar1.style.height];
          [num1.innerHTML,num2.innerHTML]=[num2.innerHTML,num1.innerHTML];
        }
        bar1.style.backgroundColor = "black";
        bar2.style.backgroundColor = "black";
        await sleep(200);
      }
    } 
  }
}

async function selection(){
  let size = parseInt(sizeInput.value);
  for(let i=0;i<size-1;i++){
    let small=i;
    for(let j=i+1;j<size;j++){
      if (!bool){
        await pause()
      };
      if(array[j]<array[small]){
        small=j;
      }
    }
     
    if(small!=i){
      
        let bar1 = barsContainer.children[i];
        let bar2 = barsContainer.children[small];
        let num1=numContainer.children[i];
        let num2=numContainer.children[small];
        bar1.style.backgroundColor = "red";
        bar2.style.backgroundColor = "red";
        await sleep(400);
        if (!bool){
          await pause()
        };
        [bar1.style.height, bar2.style.height] = [bar2.style.height, bar1.style.height];

        [array[i],array[small]]=[array[small],array[i]];
        [num1.innerHTML,num2.innerHTML]=[num2.innerHTML,num1.innerHTML]

        bar1.style.backgroundColor = "black";
        bar2.style.backgroundColor = "black";
        await sleep(200);
    }
  }
}

async function insertion(){
  let size = parseInt(sizeInput.value);
  for(let i=0;i<size;i++){
    let key=array[i];
    let j= i-1;
    while(j>=0 && array[j]>key){
      array[j+1]=array[j];
      let bar1 =barsContainer.children[j];
      let bar2 =barsContainer.children[j+1];
      let num1=numContainer.children[j];
      let num2=numContainer.children[j+1];
      if (!bool){
        await pause()
      };
      bar1.style.backgroundColor = "red";
      bar2.style.backgroundColor = "red";
      await sleep(400);
      bar2.style.height =bar1.style.height;
      num2.innerHTML=num1.innerHTML;
      bar1.style.backgroundColor = "black";
      bar2.style.backgroundColor = "black";
      await sleep(200);
      j=j-1;
    }
    if (!bool){
      await pause()
    };
    array[j+1]=key;
    let num2=numContainer.children[j+1];
    let bar2 = barsContainer.children[j + 1];
    bar2.style.backgroundColor = "red";
    await sleep(400);
    bar2.style.height =key+"px";
    num2.innerHTML=key;
    bar2.style.backgroundColor = "black";
    await sleep(200);

  }
}
function pause() {
  return new Promise((resolve) => {
    stop.addEventListener("click", () => {
      resolve();
    });
  });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("load", () => {
  newSizeButton.click(); 
});
stop.addEventListener("click",()=>{
  if(stop.innerHTML==="Pause"){
    bool=false;
    stop.innerHTML="Continue";
  }
  else{
      bool=true;
      let sortings = document.getElementById("sorts").value;
      stop.innerHTML="Pause";
      
   }
  }
)