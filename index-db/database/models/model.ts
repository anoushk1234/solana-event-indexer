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

// sequelize.sync({ force: true }).then(() => {
//   return MyEvent.create({
//     label: "test",
//     data: 89,
//   });
// });

export default sequelize;
