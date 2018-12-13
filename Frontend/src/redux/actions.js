export const logIn=userObj=>({type:"LOGIN",data:userObj});//all users
export const logOut=()=>({type:"LOGOUT"});//all users
export const addVacation=vacObj=>({type:"ADD",data:vacObj}); //admin
export const editVacation=newVacObj=>({type:"EDIT",data:newVacObj}); //admin
export const deleteVacation=id=>({type:"DELETE",data:id});//admin
export const setVacations=vacations=>({type:"SET",data:vacations}); 
export const followVacation=id=>({type:"FOLLOW", data:id});//users
export const unfollowVacation=id=>({type:"UNFOLLOW", data:id});//users