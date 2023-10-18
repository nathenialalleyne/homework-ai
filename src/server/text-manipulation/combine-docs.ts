function combineDocs(docs: string[]){
    let res = ""
    for (let i=0;i<docs.length;i++){
        res += docs[i] + " and "
    }
    return res
}

export default combineDocs