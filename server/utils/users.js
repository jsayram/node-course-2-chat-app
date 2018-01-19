[{

    id: '/#12jfsdhaifnaosdf',
    name: 'Jose',
    room: 'Pizza Fans'

}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id) --> returns object above 
//getUserList(room)

class Users {

    constructor() {
        //this is the users file
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room }
        this.users.push(user);
        return user;
    }

    removeUser(id) {
       var user = this.getUser(id);
       if(user){
       	this.users = this.users.filter((user)=>user.id !== id)
       }
       return user;
    }

    getUser(id) {   				//This keeps user in the array
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }

}


module.exports = { Users };