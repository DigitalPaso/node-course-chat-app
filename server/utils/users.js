

[{
id: '',
name:	'',
room:	''
}]


class Users {

// constructor
constructor () {
    this.users = [];
}

addUser (id, name, room)
{
    var user = {id, name, room};
    this.users.push(user);
    return user;
}
    
getUser (id)
{
    var user = this.users.find((user) => {
	return (user.id === id);
    });
    return user;
}

removeUser (id) 
{
    var user = this.getUser(id);
    if (user) {
	this.users = this.users.filter ((user) => {
	    return (user.id != id);
	});
    }
    return user;
}

getUserList(room) 
{
    var users = this.users.filter((user) => {
	return (user.room === room);
    });
    var namesArray = users.map((user) => {
	return (user.name);
    });
    return namesArray;
}


}

module.exports = {
    Users
};

