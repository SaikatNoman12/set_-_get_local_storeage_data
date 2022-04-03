const addToDb = id => {
    let db = {};
    
    const getLocalData = localStorage.getItem('product');
    if(getLocalData){
        db = JSON.parse(getLocalData); 
    }
    
    
    if(id in db){
        db[id] = db[id] + 1;
    }
    else{
        db[id] = 1;
    }
    localStorage.setItem('product', JSON.stringify(db));
}


const getToDb = () => {
    let db = {};
    const getLocal = localStorage.getItem('product');
    if(getLocal){
        db = JSON.parse(getLocal);
    }
}

// export {addToDb, getToDb};
export default addToDb