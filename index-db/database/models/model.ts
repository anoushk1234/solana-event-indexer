import { BIGINT, Sequelize, STRING } from "sequelize";
const sequelize = new Sequelize(`postgres://localhost:5432/solanaindexer`);

export const MyEvent = sequelize.define("MyEvent", {
  // attributes
  label: {
    type: STRING,
    allowNull: false,
  },
  data: {
    type: BIGINT,
    allowNull: false,
  },
});

//Run this once to create the table or create the table manually otherwise youll get a relation error
// sequelize.sync({ force: true }).then(() => {
//   return MyEvent.create({
//     label: "test",
//     data: 89,
//   });
// });

export default sequelize;
