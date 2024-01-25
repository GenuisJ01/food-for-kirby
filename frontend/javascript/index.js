// Main javascript file for all behaviour in index.html
// const response = await fetch("http://localhost:3003/clues/2")
// const information = await response.json();

async function fetchCluetData(topicNum){
    try{
        const resp=await fetch(`http://localhost:3003/clues/${topicNum}`)
        if(resp.ok){
        const data = await resp.json();
        return data
        }
        else{
        throw "Error:http status code:"+resp.status
        }
    }
    catch(e){
        console.log(e)
    }
}

// console.log(fetchCluetData(2))

async function fetchData() {
    try {
        const result = await fetchCluetData(2);
        console.log(result);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const data = fetchData()

console.log(data.answer2a)