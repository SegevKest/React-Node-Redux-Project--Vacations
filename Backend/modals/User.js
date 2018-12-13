
module.exports= function User(firstName,lastName,username,password,isAdmin){
        this.firstName=firstName ? firstName : null;
        this.lastName=lastName ? lastName : null;
        this.username=username ? username : null;
        this.password=password ? password : null;
        this.isAdmin=isAdmin ? isAdmin : false;
    };
