function Validation (){
    this.kiemTraRong = function(value, spanId,mess){
        if(value === ""){
            getEle(spanId).style.display ="block";
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display ="none";
        getEle(spanId).innerHTML ="";
        return true;
    };
}