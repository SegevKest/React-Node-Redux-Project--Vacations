
module.exports= function Vacation(description,destination,img,
    startDate,endDate,cost,followed){
        this.destination=destination ? destination : null;
        this.description=description ? description : null;
        this.img=img ? img : null;
        this.startDate=startDate ? startDate : null;
        this.endDate=endDate ? endDate : null;
        this.cost=cost ? cost : null;
        this.followed=followed ? followed : null;
    };
