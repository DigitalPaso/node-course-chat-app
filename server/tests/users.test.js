const expect = require('expect');

const {Users} = require ('../utils/users.js');

describe ('Users', () =>
{
    var users;
    var testUsers = [];

    beforeEach(() => {
	users = new Users();
	users.users = [{
	    id: '1',
	    name: 'Assana',
	    room: 'Node class'
	}, {
	    id: '2',
	    name: 'Elmo',
	    room: 'JS class'
	}, {
	    id: '3',
	    name: 'Cookie',
	    room: 'Server class'
	}, {
	    id: '4',
	    name: 'Max',
	    room: 'Server class'
	}
	];
    });

    it('should add a new user', () => {
	var user = users.users[0];
	var u = users.addUser (user.id, user.name, user.room);
	expect(u).toBeTruthy();
	expect(u).toEqual(user);
    });


    it('should return names for server class', () => {
	var userList = users.getUserList('Server class');
	expect(userList).toEqual(['Cookie','Max']);
    });

    it('should find a user', () => {
	var result = users.getUser(users.users[0].id);
	expect(result).toEqual(users.users[0]);
    });

    it('should not find a user', () => {
	var result = users.getUser('3404');
	expect(result).toBeFalsy();
    });

    it('should remove a user', () => {
	var tmp = users.users[1];
	var u = users.removeUser(tmp.id);
	expect(u).toEqual(tmp);
	u = users.getUser(tmp.id);
	expect(u).toBeFalsy();
    });

    it('should not remove a user', () => {
	var u = users.removeUser('34063');
	expect(u).toBeFalsy();
    });
});

