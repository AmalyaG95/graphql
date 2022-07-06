const graphql = require('graphql');
const _ = require('lodash');
const User = require('../models/user.ts');
const Friend = require('../models/friend.ts');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,    
} = graphql;

const users = [
    {
        id: "1",
        name: 'u1',
        friendId: "1",
    },
    {
        id: "2",
        name: 'u2',
        friendId: "2",
    },
    {
        id: "3",
        name: 'u3',
        friendId: "3",
    },
    {
        id: "4",
        name: 'u4',
        friendId: "2",
    },
    {
        id: "5",
        name: 'u5',
        friendId: "3",
    },
    {
        id: "6",
        name: 'u6',
        friendId: "3",
    },
];

const friends = [
    {
        id: "1",
        name: 'f1',
    },
    {
        id: "2",
        name: 'f2',
    },
    {
        id: "3",
        name: 'f3',
    },
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        bestFriend: {
            type: FriendType,
            resolve(parent, args) {
                return Friend.findById(parent.bestFriendId);
            }, 
        } 
    })
});

const FriendType = new GraphQLObjectType({
    name: 'Friend',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString}, 
        users: {
          type: new GraphQLList(UserType),
          resolve(parent, args) {
            return User.find({ bestFriendId: parent.id})
        },  
        } 
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        successful: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {               
                return User.findById(args.id);
            },  
        },
        friend: {
            type: FriendType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Friend.findById(args.id);
            },  
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            },  
        },
        friends: {
            type: new GraphQLList(FriendType),
            resolve(parent, args) {
                return Friend.find({});
            },  
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                bestFriendId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    bestFriendId: args.bestFriendId,
                });
                return user.save();
            }
        }, 
        editUser: {
            type: MessageType,
            args: {
                id: {type: GraphQLString},
                name: { type: GraphQLString},
                bestFriendId: { type: GraphQLString},
            },
            async resolve(parent, args) {
                // const friend = Friend.findById(args.bestFriendId);
                return await User.findByIdAndUpdate(args.id, {name: args.name, bestFriendId: args.bestFriendId}).then(function(){
                    return { successful: true, message: 'Update worked' }; // Success
                }).catch(function(error){
                    console.log(error); // Failure
                });;
            }
        },
        deleteUser: {
            type: MessageType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent, args) {
                 User.deleteOne({_id: args.id}).then(function(){
                    return { successful: true, message: 'Delete worked' }; // Success
                }).catch(function(error){
                    console.log(error); // Failure
                });
                 
            }
        },
        addFriend: {
            type: FriendType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let friend = new Friend({
                    name: args.name,
                });
                return friend.save();
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});