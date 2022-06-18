import db, { MyEvent as MyEventModel } from "../models/model";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";

const MyEvent = new GraphQLObjectType({
  name: "MyEvent",
  description: "this represents an event",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(myevent) {
          return myevent.id;
        },
      },
      label: {
        type: GraphQLString,
        resolve(myevent) {
          return myevent.label;
        },
      },
      data: {
        type: GraphQLInt,
        resolve(myevent) {
          return myevent.data;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "this is a root query",
  fields: () => {
    return {
      MyEvent: {
        type: new GraphQLList(MyEvent),
        args: {
          id: {
            type: GraphQLID,
          },
          label: {
            type: GraphQLString,
          },
          data: {
            type: GraphQLInt,
          },
        },
        //validations can go here
        resolve(root, args) {
          return db.models.MyEvent.findAll({ where: args });
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to create things",
  fields: () => {
    return {
      addMyEvent: {
        type: MyEvent,
        args: {
          label: {
            type: new GraphQLNonNull(GraphQLString),
          },
          data: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(_, args) {
          return MyEventModel.create({
            label: args.label,
            data: args.data,
          });
        },
      },
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
